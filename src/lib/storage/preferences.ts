import AsyncStorage from '@react-native-async-storage/async-storage';

const FONT_MODE_KEY = 'UseRegFonts';
const COLOR_MODE_KEY = 'ColorModeOverride';

export type ColorModeOverride = 'dark' | 'light' | 'system';

export async function getFontMode(): Promise<boolean> {
  const stored = await AsyncStorage.getItem(FONT_MODE_KEY);
  return stored ? JSON.parse(stored) : false;
}

export async function setFontMode(useRegFonts: boolean): Promise<void> {
  await AsyncStorage.setItem(FONT_MODE_KEY, JSON.stringify(useRegFonts));
}

export async function getColorModeOverride(): Promise<ColorModeOverride> {
  const stored = await AsyncStorage.getItem(COLOR_MODE_KEY);
  return stored === 'dark' || stored === 'light' ? stored : 'system';
}

export async function setColorModeOverride(mode: ColorModeOverride): Promise<void> {
  await AsyncStorage.setItem(COLOR_MODE_KEY, mode);
}
