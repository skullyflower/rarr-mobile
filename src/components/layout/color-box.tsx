import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

import { gray, pink } from "@/theme/colors";

export default function ColorBox({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <View style={[styles.cbox, { backgroundColor: theme.dark ? pink[900] : gray[100] }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cbox: {
    padding: 16,
    borderRadius: 6,
  },
});
