jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: 'file:///mock-docs/',
  getInfoAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
  readDirectoryAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import * as FileSystem from 'expo-file-system/legacy';
import * as SecureStore from 'expo-secure-store';

import {
  deleteLog,
  getHasLock,
  getIsLocked,
  getLogList,
  lockLog,
  readLog,
  resetCredential,
  resetLogs,
  unlockLog,
  writeLog,
} from '../journal-store';

const fs = FileSystem as jest.Mocked<typeof FileSystem>;
const secureStore = SecureStore as jest.Mocked<typeof SecureStore>;

beforeEach(() => {
  jest.clearAllMocks();
  fs.getInfoAsync.mockResolvedValue({ exists: true } as never);
  fs.makeDirectoryAsync.mockResolvedValue(undefined as never);
  fs.writeAsStringAsync.mockResolvedValue(undefined as never);
  fs.deleteAsync.mockResolvedValue(undefined as never);
  fs.readDirectoryAsync.mockResolvedValue([]);
});

describe('writeLog', () => {
  it("appends with a divider when today's entry already exists", async () => {
    fs.getInfoAsync.mockResolvedValue({ exists: true } as never);
    fs.readAsStringAsync.mockResolvedValue('existing content\n\n');

    const ok = await writeLog('new section');

    expect(ok).toBe(true);
    const [path, contents] = fs.writeAsStringAsync.mock.calls[0];
    expect(path).toMatch(/RARRLog\/\d{4}-\d{1,2}-\d{1,2}\.txt$/);
    expect(contents).toBe(
      'existing content\n\n\n__________________________________\nnew section\n\n'
    );
  });

  it('prefixes with the date on the first write of the day', async () => {
    fs.getInfoAsync.mockResolvedValue({ exists: false } as never);

    await writeLog('first section');

    const [, contents] = fs.writeAsStringAsync.mock.calls[0];
    expect(contents).toContain('\n__________________________________\nfirst section\n\n');
    expect(contents).not.toContain(
      '\n__________________________________\n\n__________________________________\n'
    );
  });

  it('overwrites plainly (no date, no divider) when editing a named entry', async () => {
    fs.getInfoAsync.mockResolvedValue({ exists: true } as never);

    await writeLog('edited content', '2026-1-1');

    const [path, contents] = fs.writeAsStringAsync.mock.calls[0];
    expect(path).toContain('2026-1-1.txt');
    expect(contents).toBe('edited content\n\n');
  });

  it('returns false for empty text without touching the filesystem', async () => {
    const ok = await writeLog('');
    expect(ok).toBe(false);
    expect(fs.writeAsStringAsync).not.toHaveBeenCalled();
  });
});

describe('getLogList', () => {
  it('filters to date-named files and sorts newest first', async () => {
    fs.readDirectoryAsync.mockResolvedValue([
      '2025-3-1.txt',
      '2026-1-15.txt',
      '.lock.txt',
      'notes.md',
      '2025-12-25.txt',
    ]);

    const list = await getLogList();

    expect(list).toEqual(['2026-1-15', '2025-12-25', '2025-3-1']);
  });
});

describe('readLog / deleteLog', () => {
  it('returns empty string for a missing file', async () => {
    fs.getInfoAsync.mockResolvedValue({ exists: false } as never);
    expect(await readLog('2020-1-1')).toBe('');
  });

  it('deletes an existing file and returns true', async () => {
    fs.getInfoAsync.mockResolvedValue({ exists: true } as never);
    expect(await deleteLog('2020-1-1')).toBe(true);
    expect(fs.deleteAsync).toHaveBeenCalled();
  });

  it('returns false deleting a file that does not exist', async () => {
    fs.getInfoAsync.mockResolvedValue({ exists: false } as never);
    expect(await deleteLog('2020-1-1')).toBe(false);
    expect(fs.deleteAsync).not.toHaveBeenCalled();
  });
});

describe('lock / unlock / reset', () => {
  it('has no lock and is unlocked before any credential is set', async () => {
    secureStore.getItemAsync.mockResolvedValue(null);
    expect(await getHasLock()).toBe(false);
    expect(await getIsLocked()).toBe(false);
  });

  it('fails open (unlocked) instead of hanging when the keychain read rejects', async () => {
    secureStore.getItemAsync.mockRejectedValue(new Error('keychain unavailable'));
    expect(await getHasLock()).toBe(false);
    expect(await getIsLocked()).toBe(false);
  });

  it('sets up a credential on first unlock call and unlocks', async () => {
    secureStore.getItemAsync.mockResolvedValue(null);
    const stillLocked = await unlockLog('alice', 'secret');
    expect(stillLocked).toBe(false);
    expect(secureStore.setItemAsync).toHaveBeenCalledWith(
      'rarr_credential',
      JSON.stringify({ user: 'alice', password: 'secret' })
    );
  });

  it('unlocks on a matching credential and stays locked on a mismatch', async () => {
    secureStore.getItemAsync.mockResolvedValue(
      JSON.stringify({ user: 'alice', password: 'secret' })
    );
    expect(await unlockLog('alice', 'wrong')).toBe(true);
    expect(await unlockLog('alice', 'secret')).toBe(false);
  });

  it('lockLog re-locks only when a credential exists', async () => {
    secureStore.getItemAsync.mockResolvedValue(null);
    expect(await lockLog()).toBe(false);

    secureStore.getItemAsync.mockResolvedValue(
      JSON.stringify({ user: 'alice', password: 'secret' })
    );
    expect(await lockLog()).toBe(true);
  });

  it('resetLogs deletes all journal files and the credential, then unlocks', async () => {
    fs.readDirectoryAsync.mockResolvedValue(['2026-1-1.txt', '2026-1-2.txt']);
    fs.getInfoAsync.mockResolvedValue({ exists: true } as never);

    const stillLocked = await resetLogs();

    expect(stillLocked).toBe(false);
    expect(fs.deleteAsync).toHaveBeenCalledTimes(2);
    expect(secureStore.deleteItemAsync).toHaveBeenCalledWith('rarr_credential');
  });

  it('resetCredential clears the stored credential', async () => {
    await resetCredential();
    expect(secureStore.deleteItemAsync).toHaveBeenCalledWith('rarr_credential');
  });
});
