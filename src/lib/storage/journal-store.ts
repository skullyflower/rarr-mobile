import * as FileSystem from 'expo-file-system/legacy';
import * as SecureStore from 'expo-secure-store';

// documentDirectory is only null on web, which this journal feature doesn't target.
const LOG_DIR = `${FileSystem.documentDirectory}RARRLog/`;
const LOG_FILE_PATTERN = /^\d{4}-\d{1,2}-\d{1,2}\.txt$/;
const CREDENTIAL_KEY = 'rarr_credential';
const DIVIDER = '\n__________________________________\n';

// Mirrors rarr-app main process's module-scope `locked` variable: resets to
// true on cold start, held in memory for the life of the running app.
let locked = true;

async function ensureLogDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(LOG_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(LOG_DIR, { intermediates: true });
  }
}

function todayFileName(): string {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function filePath(fileName: string): string {
  return `${LOG_DIR}${fileName}.txt`;
}

// --- Journal entries ---

export async function getLogList(): Promise<string[]> {
  await ensureLogDir();
  const files = await FileSystem.readDirectoryAsync(LOG_DIR);
  return files
    .filter((file) => LOG_FILE_PATTERN.test(file))
    .map((file) => file.replace('.txt', ''))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}

export async function readLog(fileName: string): Promise<string> {
  const path = filePath(fileName);
  const info = await FileSystem.getInfoAsync(path);
  if (!info.exists) return '';
  return FileSystem.readAsStringAsync(path);
}

export async function writeLog(text: string, fileName?: string): Promise<boolean> {
  if (!text) return false;
  await ensureLogDir();
  const date = new Date();
  const targetFile = fileName ?? todayFileName();
  const path = filePath(targetFile);
  const stringToWrite = `${text}\n\n`;

  try {
    const info = await FileSystem.getInfoAsync(path);
    if (info.exists && fileName === undefined) {
      // today's entry already has content this session: append a new section
      const existing = await FileSystem.readAsStringAsync(path);
      await FileSystem.writeAsStringAsync(path, `${existing}${DIVIDER}${stringToWrite}`);
    } else if (fileName === undefined) {
      // first write of the day
      await FileSystem.writeAsStringAsync(
        path,
        `${date.toLocaleDateString()}${DIVIDER}${stringToWrite}`
      );
    } else {
      // editing/overwriting a named entry
      await FileSystem.writeAsStringAsync(path, stringToWrite);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteLog(toDelete: string): Promise<boolean> {
  const path = filePath(toDelete);
  const info = await FileSystem.getInfoAsync(path);
  if (!info.exists) return false;
  try {
    await FileSystem.deleteAsync(path);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Also clears the credential (unlike rarr-app's reset, which only cleared
// journal files) so a forgotten password doesn't leave the app permanently
// locked out of setting up a new one.
export async function resetLogs(): Promise<boolean> {
  try {
    const files = await getLogList();
    await Promise.all(files.map((file) => deleteLog(file)));
    await resetCredential();
    locked = false;
    return false; // === unlocked
  } catch (error) {
    console.error(error);
    return true; // still locked
  }
}

// --- Lock / credential gate ---

export async function getHasLock(): Promise<boolean> {
  try {
    const stored = await SecureStore.getItemAsync(CREDENTIAL_KEY);
    return stored !== null;
  } catch (error) {
    // Fail open: a broken keychain read shouldn't strand the app on the lock
    // screen forever — the credential gate is a casual-access gate, not a
    // hard security boundary (see resetLogs()'s comment above).
    console.error(error);
    return false;
  }
}

export async function getIsLocked(): Promise<boolean> {
  return (await getHasLock()) && locked;
}

export async function lockLog(): Promise<boolean> {
  locked = await getHasLock();
  return locked;
}

export async function unlockLog(user: string, password: string): Promise<boolean> {
  const stored = await SecureStore.getItemAsync(CREDENTIAL_KEY);
  const attempt = JSON.stringify({ user, password });

  if (stored === null) {
    // first run: set up the lock
    await SecureStore.setItemAsync(CREDENTIAL_KEY, attempt);
    locked = false;
  } else if (stored === attempt) {
    locked = false;
  } else {
    locked = true;
  }
  return locked;
}

export async function resetCredential(): Promise<void> {
  await SecureStore.deleteItemAsync(CREDENTIAL_KEY);
}
