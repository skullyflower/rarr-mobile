import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

import { buildTypescale } from './fonts';
import { gray, pink, purple, red } from './colors';

// Approximate port of rarr-app's Chakra theme.mts onto React Native Paper's
// MD3 color roles. Paper doesn't support Chakra-style arbitrary per-component
// base-style injection, so this is a best-effort mapping, not pixel parity.
export function buildDarkTheme(useRegFonts: boolean): MD3Theme {
  return {
    ...MD3DarkTheme,
    dark: true,
    roundness: 2,
    fonts: buildTypescale(useRegFonts),
    colors: {
      ...MD3DarkTheme.colors,
      primary: purple[300], // Heading color (dark)
      onPrimary: red[900], // Button "solid" variant text (dark)
      secondary: pink[500], // Input/Textarea focus border accent
      onSecondary: pink[50],
      background: gray[900], // body bg (dark)
      onBackground: gray[50], // inputColorDark
      surface: gray[800],
      onSurface: gray[50],
      surfaceVariant: pink[800], // inputBGDark (focused input background)
      onSurfaceVariant: gray[50],
      outline: purple[500], // borderColorDark
      outlineVariant: purple[700],
      error: red[500],
      onError: red[50],
      errorContainer: red[800],
      onErrorContainer: red[100],
    },
  };
}

export function buildLightTheme(useRegFonts: boolean): MD3Theme {
  return {
    ...MD3LightTheme,
    dark: false,
    roundness: 2,
    fonts: buildTypescale(useRegFonts),
    colors: {
      ...MD3LightTheme.colors,
      primary: purple[700], // Heading color (light)
      onPrimary: red[100], // Button "solid" variant text (light)
      secondary: pink[500],
      onSecondary: pink[900],
      background: gray[400], // body bg (light)
      onBackground: purple[900], // inputColorLight
      surface: gray[50],
      onSurface: purple[900],
      surfaceVariant: gray[50], // inputBGLight (focused input background)
      onSurfaceVariant: purple[900],
      outline: purple[700], // borderColorLight
      outlineVariant: purple[400],
      error: red[500],
      onError: red[50],
      errorContainer: red[100],
      onErrorContainer: red[900],
    },
  };
}
