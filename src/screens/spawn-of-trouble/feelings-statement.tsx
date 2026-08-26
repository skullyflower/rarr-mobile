import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Menu, Text, TextInput } from "react-native-paper";

import strings from "@/data/aca-tenth.json";

interface FeelingsStatementProps {
  setFeelingSentence: (value: string) => void;
}

export default function FeelingsStatement({ setFeelingSentence }: FeelingsStatementProps) {
  const [when, setWhen] = useState("");
  const [feeling, setFeeling] = useState("");
  const [because, setBecause] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const feelings = [...strings.feelings].sort();

  useEffect(() => {
    if (feeling && when && because) {
      setFeelingSentence(`I feel ${feeling} when ${when} because ${because}.`);
    }
  }, [feeling, when, because, setFeelingSentence]);

  return (
    <View style={styles.stack}>
      <Text>Practice a feeling statement.</Text>
      <View style={styles.row}>
        <Text>I feel</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}>
              {feeling || "Select a feeling"}
            </Button>
          }>
          <ScrollView style={styles.menuScroll}>
            {feelings.map((value, index) => (
              <Menu.Item
                key={index}
                title={value}
                onPress={() => {
                  setFeeling(value);
                  setMenuVisible(false);
                }}
              />
            ))}
          </ScrollView>
        </Menu>
        <Text>when</Text>
        <TextInput
          style={styles.input}
          value={when}
          mode="outlined"
          onChangeText={setWhen}
        />
        <Text>because</Text>
        <TextInput
          style={styles.input}
          value={because}
          mode="outlined"
          onChangeText={setBecause}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flexGrow: 1,
    minWidth: 100,
  },
  menuScroll: {
    maxHeight: 400,
  },
});
