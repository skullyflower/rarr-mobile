import { configureFonts } from 'react-native-paper';

type Typescale = ReturnType<typeof configureFonts>;

export const FONT_ASSETS = {
  Creepster: require('../../assets/fonts/Creepster-Regular.ttf'),
  Underdog: require('../../assets/fonts/Underdog-Regular.ttf'),
} as const;

const HEADING_VARIANTS = new Set<string>([
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
]);

const BODY_SIZE_BUMP: Record<string, number> = {
  bodyLarge: 20,
  bodyMedium: 18,
  bodySmall: 16,
  labelLarge: 18,
  labelMedium: 16,
  labelSmall: 14,
};

// "spooky" mode matches rarr-app's defaultTheme: Creepster headings, Underdog body.
// "clean" mode matches rarr-app's cleanTheme: no custom fonts, system defaults only
// (Chakra used 'Arial Rounded MT Bold'/'Arial', which aren't bundled here; the
// platform system font is the closest available substitute).
export function buildTypescale(useRegFonts: boolean): Typescale {
  const base = useRegFonts
    ? configureFonts()
    : configureFonts({ config: { fontFamily: 'Underdog' } });

  const entries = Object.entries(base).map(([key, value]) => {
    if (key === 'default') return [key, value];
    const isHeading = !useRegFonts && HEADING_VARIANTS.has(key);
    const bump = BODY_SIZE_BUMP[key];
    return [
      key,
      {
        ...value,
        ...(isHeading ? { fontFamily: 'Creepster' } : {}),
        ...(bump && 'fontSize' in value ? { fontSize: bump } : {}),
      },
    ];
  });

  return Object.fromEntries(entries) as Typescale;
}
