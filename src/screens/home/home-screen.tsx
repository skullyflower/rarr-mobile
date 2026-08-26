import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

import ColorBox from "@/components/layout/color-box";
import { purple } from "@/theme/colors";
import strings from "@/data/home.json";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ColorBox>
        <View style={styles.stack}>
          <View style={styles.header}>
            <Image
              source={require("../../../assets/images/logo/RarrLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Divider />
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.primary }]}>
            {strings.title}
          </Text>

          <Image
            source={require("../../../assets/images/logo/RARR_Splash.png")}
            style={[styles.splash, { maxHeight: screen.width }]}
            resizeMode="contain"
          />

          <View style={styles.quoteBox}>
            {strings.boxText.map((line, i) => (
              <Text
                key={`line-${i}`}
                style={styles.quoteText}>
                {line}
              </Text>
            ))}
          </View>

          <Text style={styles.bold}>{strings.footHeader}</Text>
          <Text>{strings.footerText}</Text>
          <Text
            style={[styles.link, { color: theme.colors.secondary }]}
            onPress={() => router.push("/about")}>
            About RARR
          </Text>
        </View>
      </ColorBox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  stack: {
    gap: 16,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 80,
  },
  title: {
    textAlign: "center",
  },
  splash: {
    width: "100%",
  },
  quoteBox: {
    backgroundColor: purple[300],
    borderRadius: 8,
    padding: 16,
    width: "100%",
  },
  quoteText: {
    color: purple[900],
    fontWeight: "bold",
    fontSize: 17,
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
});
