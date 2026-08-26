import type { ReactNode } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function CollapsingText({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <View
        style={[
          show ? styles.contentOpen : styles.contentClosed,
          {
            marginBottom: 8,
            transitionProperty: "*",
            transitionDuration: ".3s",
            transitionTimingFunction: "ease-in",
          },
        ]}>
        {children}
      </View>
      <View style={styles.toggleRow}>
        <Button
          compact
          mode="text"
          onPress={() => setShow(!show)}>
          {show ? "Show Less" : "More Info"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentOpen: {
    height: 150,
  },
  contentClosed: {
    height: 0,
    overflow: "scroll",
  },
  toggleRow: {
    alignItems: "flex-end",
  },
});
