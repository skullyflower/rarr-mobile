import { useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import AccordionSection from "@/components/layout/accordion-section";
import CollapsingText from "@/components/layout/collapsing-text";
import PageCard from "@/components/layout/page-card";
import Privacy from "@/components/privacy";
import CharacterAssetsSection from "@/components/shared-forms/character-assets-section";
import CharacterDefectsSection from "@/components/shared-forms/character-defects-section";
import QuestionsSection from "@/components/shared-forms/questions-section";
import WhatYouWrote from "@/components/what-you-wrote/what-you-wrote";
import { createWhatYouWroteSections } from "@/components/what-you-wrote/typedSectionFactories";
import { tenthStepFieldsToTypedSections } from "@/components/what-you-wrote/tenthStepTypedSections";
import strings from "@/data/alanon-tenth.json";
import BeFreeButton from "@/components/buttons/be-free-button";

export default function AlanonTenthStepScreen() {
  const theme = useTheme();
  const [letGo, setLetGo] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Record<string, string | undefined>>(
    {},
  );
  const [characterAssets, setCharacterAssets] = useState<string[]>([]);
  const [characterDefects, setCharacterDefects] = useState<string[]>([]);

  const incomplete =
    !Object.values(selectedQuestions).filter((v) => v !== undefined).length &&
    !characterAssets.length &&
    !characterDefects.length;

  const reset = (): void => {
    setLetGo(false);
    setSelectedQuestions({});
    setCharacterAssets([]);
    setCharacterDefects([]);
  };

  if (letGo) {
    return (
      <WhatYouWrote
        reset={reset}
        sections={createWhatYouWroteSections(
          tenthStepFieldsToTypedSections("alanon-spot", {
            selectedQuestions,
            characterAssets,
            characterDefects,
          }),
        )}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header={strings.pageText.title}>
        <View style={styles.stack}>
          <Text style={styles.centerBold}>{strings.pageText.subTitle}</Text>
          <CollapsingText>
            <View style={styles.stack}>
              {strings.pageText.collapsedText.map((line, index) => (
                <Text key={index}>{line}</Text>
              ))}
              <Text>
                For more information visit:{" "}
                <Text
                  style={{ color: theme.colors.secondary, textDecorationLine: "underline" }}
                  onPress={() => Linking.openURL("https://al-anon.org")}>
                  al-anon.org
                </Text>
              </Text>
            </View>
          </CollapsingText>
          <View style={styles.stack}>
            <AccordionSection title="Exercise 1: Questions">
              <QuestionsSection
                selectedQuestions={selectedQuestions}
                setSelectedQuestions={setSelectedQuestions}
              />
            </AccordionSection>
            <AccordionSection title="Exercise 2: Character Defects">
              <CharacterDefectsSection
                characterDefects={characterDefects}
                setCharacterDefects={setCharacterDefects}
              />
            </AccordionSection>
            <AccordionSection title="Exercise 3: Character Assets">
              <CharacterAssetsSection
                characterAssets={characterAssets}
                setCharacterAssets={setCharacterAssets}
              />
            </AccordionSection>
          </View>
          <View style={styles.buttonRow}>
            <BeFreeButton
              disabled={incomplete}
              setLetGo={() => setLetGo(true)}
            />
          </View>
        </View>
      </PageCard>
      <Privacy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
  },
  stack: {
    gap: 12,
  },
  centerBold: {
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
