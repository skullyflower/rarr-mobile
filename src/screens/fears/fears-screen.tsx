import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import AccordionSection from "@/components/layout/accordion-section";
import CollapsingText from "@/components/layout/collapsing-text";
import PageCard from "@/components/layout/page-card";
import Privacy from "@/components/privacy";
import type { DoubleListItem } from "@/components/form/double-lister-input";
import DoubleListerInput from "@/components/form/double-lister-input";
import ListerInput from "@/components/form/lister-input";
import WhatYouWrote from "@/components/what-you-wrote/what-you-wrote";
import { createWhatYouWroteSections } from "@/components/what-you-wrote/typedSectionFactories";
import { fearsFieldsToTypedSections } from "./fearsTypedSections";
import fearText from "@/data/fears.json";
import BeFreeButton from "@/components/buttons/be-free-button";

export default function FearsScreen() {
  const [letGo, setLetGo] = useState(false);
  const [fearsList, setFearsList] = useState<DoubleListItem[]>([]);
  const [grateful, setGrateful] = useState<string[]>([]);

  const reset = (): void => {
    setLetGo(false);
    setFearsList([]);
    setGrateful([]);
  };

  if (letGo) {
    return (
      <WhatYouWrote
        reset={reset}
        sections={createWhatYouWroteSections(fearsFieldsToTypedSections({ fearsList, grateful }))}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header={fearText.title}>
        <View style={styles.stack}>
          <View style={styles.stack}>
            <Text variant="titleMedium">{fearText.subHeading}</Text>
            <CollapsingText>
              <View style={styles.stack}>
                {fearText.collapsedText.map((line, i) => (
                  <Text key={`line-${i}`}>{line}</Text>
                ))}
              </View>
            </CollapsingText>
          </View>
          <AccordionSection title={fearText.accordionHeading}>
            <View style={styles.stack}>
              <DoubleListerInput
                list={fearsList}
                labels={[fearText.labelsText[0], fearText.labelsText[1]]}
                setList={setFearsList}
              />
              <ListerInput
                list={grateful}
                placeholder={fearText.placeholder}
                setList={setGrateful}
              />
            </View>
          </AccordionSection>
          <View style={styles.buttonRow}>
            <BeFreeButton
              disabled={fearsList.length === 0}
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
