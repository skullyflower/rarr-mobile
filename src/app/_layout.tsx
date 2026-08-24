import "react-native-gesture-handler";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Appbar, PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Drawer } from "expo-router/drawer";

import DrawerContent from "@/components/drawer-content";
import useToggleLock from "@/hooks/use-toggle-lock";
import UnlockScreen from "@/screens/unlock/unlock-screen";
import { FONT_ASSETS } from "@/theme/fonts";
import { buildDarkTheme, buildLightTheme } from "@/theme/paper-theme";
import {
  getColorModeOverride,
  getFontMode,
  setColorModeOverride as persistColorModeOverride,
  setFontMode as persistFontMode,
  type ColorModeOverride,
} from "@/lib/storage/preferences";

SplashScreen.preventAutoHideAsync();

const DRAWER_TITLES: Record<string, string> = {
  index: "RARR",
  trouble: "Trouble",
  "drawn-to-trouble": "Drawn to Trouble",
  "spawn-of-trouble": "Spawn of Trouble",
  resentments: "Resentments",
  serenity: "Control Issues",
  fears: "Fear and Gratitude",
  steps: "The Steps",
  literature: "Stories",
  log: "My Log",
  about: "About",
  unlock: "Unlock",
};

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [fontsLoaded] = useFonts(FONT_ASSETS);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const [useRegFonts, setUseRegFonts] = useState(false);
  const [colorModeOverride, setColorModeOverrideState] = useState<ColorModeOverride>("system");
  const { isLocked, toggleLock } = useToggleLock();

  useEffect(() => {
    Promise.all([getFontMode(), getColorModeOverride()]).then(([fontMode, colorMode]) => {
      setUseRegFonts(fontMode);
      setColorModeOverrideState(colorMode);
      setPrefsLoaded(true);
    });
  }, []);

  const ready = fontsLoaded && prefsLoaded;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  const isDark =
    colorModeOverride === "system" ? systemScheme === "dark" : colorModeOverride === "dark";

  const paperTheme = useMemo(
    () => (isDark ? buildDarkTheme(useRegFonts) : buildLightTheme(useRegFonts)),
    [isDark, useRegFonts],
  );

  const navTheme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
        primary: paperTheme.colors.primary,
        background: paperTheme.colors.background,
        card: paperTheme.colors.surface,
        text: paperTheme.colors.onBackground,
        border: paperTheme.colors.outline,
      },
    }),
    [isDark, paperTheme],
  );

  const toggleFontMode = useCallback(() => {
    setUseRegFonts((prev) => {
      const next = !prev;
      persistFontMode(next);
      return next;
    });
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorModeOverrideState((prev) => {
      const prevIsDark = prev === "system" ? systemScheme === "dark" : prev === "dark";
      const next: ColorModeOverride = prevIsDark ? "light" : "dark";
      persistColorModeOverride(next);
      return next;
    });
  }, [systemScheme]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={navTheme}>
          <Drawer
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={({ route, navigation }) => ({
              header: () => (
                <Appbar.Header>
                  <Appbar.Action
                    icon="menu"
                    onPress={() => navigation.toggleDrawer()}
                  />
                  <Appbar.Content
                    title={
                      isLocked && route.name !== "unlock"
                        ? "Unlock"
                        : (DRAWER_TITLES[route.name] ?? "RARR")
                    }
                  />
                  <Appbar.Action
                    icon={useRegFonts ? "skull" : "format-letter-case"}
                    onPress={toggleFontMode}
                  />
                  <Appbar.Action
                    icon={isDark ? "weather-sunny" : "weather-night"}
                    onPress={toggleColorMode}
                  />
                  <Appbar.Action
                    icon={isLocked ? "lock" : "lock-open-variant"}
                    onPress={toggleLock}
                  />
                </Appbar.Header>
              ),
            })}
            screenLayout={({ route, children }) =>
              isLocked && route.name !== "unlock" ? <UnlockScreen /> : children
            }>
            <Drawer.Screen
              name="index"
              options={{ drawerLabel: "Home" }}
            />
            <Drawer.Screen name="trouble" />
            <Drawer.Screen name="drawn-to-trouble" />
            <Drawer.Screen name="spawn-of-trouble" />
            <Drawer.Screen name="resentments" />
            <Drawer.Screen name="serenity" />
            <Drawer.Screen name="fears" />
            <Drawer.Screen name="steps" />
            <Drawer.Screen name="literature" />
            <Drawer.Screen name="log" />
            <Drawer.Screen name="about" />
            <Drawer.Screen name="unlock" />
          </Drawer>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
