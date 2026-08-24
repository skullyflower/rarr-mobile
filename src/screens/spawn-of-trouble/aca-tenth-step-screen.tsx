import { useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import AccordionSection from "@/components/layout/accordion-section";
import CollapsingText from "@/components/layout/collapsing-text";
import PageCard from "@/components/layout/page-card";
import Privacy from "@/components/privacy";
import WhatYouWrote from "@/components/what-you-wrote/what-you-wrote";
import { createWhatYouWroteSections } from "@/components/what-you-wrote/typedSectionFactories";
import AssetsSection from "./assets-section";
import ChoiceSection from "./choice-section";
import FeelingsStatement from "./feelings-statement";
import LaundryListSection from "./laundry-list-section";
import ToolsUsedToday from "./tools-today";
import TraitsSection from "./traits-section";
import { acaTenthFieldsToTypedSections } from "./acaTenthTypedSections";
import strings from "@/data/aca-tenth.json";
import BeFreeButton from "@/components/buttons/be-free-button";

export default function AcaTenthStepScreen() {
  const theme = useTheme();
  const [letGo, setLetGo] = useState(false);
  const [praise, setPraise] = useState<string[]>([]);
  const [freedomText, setFreedomText] = useState("");
  const [feelingsSentence, setFeelingSentence] = useState("");
  const [listOfTools, setListOfTools] = useState<string[]>([]);
  const [traitQs] = useState<string[]>([]);
  const [llTraits, setLLTraits] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<Record<string, string | undefined>>({});

  const incomplete =
    !praise.length &&
    !freedomText &&
    !feelingsSentence &&
    !listOfTools.length &&
    !Object.values(selectedTraits).filter((v) => v !== undefined).length &&
    !traitQs.length &&
    !llTraits.length;

  const reset = (): void => {
    setLetGo(false);
    setPraise([]);
    setFreedomText("");
    setFeelingSentence("");
    setListOfTools([]);
    setSelectedTraits({});
    setLLTraits([]);
  };

  if (letGo) {
    return (
      <WhatYouWrote
        reset={reset}
        sections={createWhatYouWroteSections(
          acaTenthFieldsToTypedSections({
            praise,
            freedomText,
            feelingsSentence,
            listOfTools,
            traitQs,
            selectedTraits,
            llTraits,
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
                  onPress={() =>
                    Linking.openURL("https://adultchildren.org/comline/tips-for-step-10/")
                  }>
                  Adult Children.org
                </Text>
              </Text>
            </View>
          </CollapsingText>
          <View style={styles.stack}>
            <AccordionSection title="Exercise 1: Questions">
              <TraitsSection
                selectedTraits={selectedTraits}
                setSelectedTraits={setSelectedTraits}
              />
            </AccordionSection>
            <AccordionSection title="Exercise 2: The Laundry Lists Traits">
              <LaundryListSection
                llTraits={llTraits}
                setLLTraits={setLLTraits}
              />
            </AccordionSection>
            <AccordionSection title="Exercise 3: Choice Continuum">
              <ChoiceSection
                freedomText={freedomText}
                setFreedomText={setFreedomText}
              />
            </AccordionSection>
            <AccordionSection title="Exercise 4: Tools">
              <ToolsUsedToday
                listOfTools={listOfTools}
                setListOfTools={setListOfTools}
              />
            </AccordionSection>
            <AccordionSection title="Exercise 5: Feelings">
              <FeelingsStatement setFeelingSentence={setFeelingSentence} />
            </AccordionSection>
            <AccordionSection title="Exercise 6: Affirmation">
              <AssetsSection
                praise={praise}
                setSetPraise={setPraise}
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
