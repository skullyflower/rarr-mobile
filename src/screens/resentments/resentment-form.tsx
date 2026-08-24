import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import AccordionSection from "@/components/layout/accordion-section";
import CollapsingText from "@/components/layout/collapsing-text";
import PageCard from "@/components/layout/page-card";
import Privacy from "@/components/privacy";
import CheckboxGroupBox from "@/components/form/checkbox-group-box";
import NeverLetGo from "@/components/form/never-let-go";
import StyledTextInput from "@/components/form/styled-text-input";
import WhatYouWrote from "@/components/what-you-wrote/what-you-wrote";
import { createWhatYouWroteSections } from "@/components/what-you-wrote/typedSectionFactories";
import useProgramDropDown from "@/hooks/use-program-dropdown";
import { resentmentFieldsToTypedSections } from "./resentmentTypedSections";
import { affects, myParts, successes, strings } from "@/data/resentments.json";
import BeFreeButton from "@/components/buttons/be-free-button";

type ProgKey = keyof typeof affects;
const programOptions = Object.keys(affects);

export default function ResentmentForm() {
  const [Iresent, setIresent] = useState("");
  const [because, setBecause] = useState("");
  const [affectsMy, setAffectsMy] = useState<string[]>([]);
  const [myPart, setMyPart] = useState<string[]>([]);
  const [didWell, setDidWell] = useState<string[]>([]);
  const [learned, setLearned] = useState("");
  const [letGo, setLetGo] = useState(false);
  const [neverVisible, setNeverVisible] = useState(false);

  const { ProgramDropDown, selectedProgram } = useProgramDropDown(programOptions);

  const incomplete =
    !Iresent || !because || !affectsMy.length || !myPart.length || !didWell.length || !learned;

  const reset = (): void => {
    setLetGo(false);
    setIresent("");
    setBecause("");
    setAffectsMy([]);
    setMyPart([]);
    setDidWell([]);
    setLearned("");
  };

  if (letGo) {
    return (
      <WhatYouWrote
        reset={reset}
        sections={createWhatYouWroteSections(
          resentmentFieldsToTypedSections({
            Iresent,
            because,
            affectsMy,
            myPart,
            didWell,
            learned,
          }),
        )}
      />
    );
  }

  const program = strings[selectedProgram as ProgKey];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard
        header={
          <View style={styles.headerRow}>
            <Text variant="headlineSmall">Trouble:</Text>
            <ProgramDropDown />
            <Text variant="headlineSmall">{program.title}</Text>
          </View>
        }>
        <View style={styles.stack}>
          <CollapsingText>
            <View style={styles.stack}>
              {program.intro.map((line, index) => (
                <Text key={index}>{line}</Text>
              ))}
            </View>
          </CollapsingText>
          <Text
            style={styles.centerBold}
            variant="titleMedium">
            {`So, why don't you write about it?`}
          </Text>

          <View style={styles.stack}>
            <AccordionSection title="Who or what is bothering you?">
              <TextInput
                value={Iresent}
                placeholder="Person, institution, concept, or situation"
                onChangeText={setIresent}
                maxLength={100}
              />
            </AccordionSection>
            <AccordionSection title="And why?">
              <StyledTextInput
                value={because}
                setter={setBecause}
                placeholder="Let it all out..."
              />
            </AccordionSection>
            <AccordionSection title="How does it affect you? What does it threaten?">
              <CheckboxGroupBox
                valuesList={affectsMy}
                options={affects[selectedProgram as ProgKey]}
                setter={setAffectsMy}
              />
            </AccordionSection>
            <AccordionSection title="What part did you play in this?">
              <CheckboxGroupBox
                valuesList={myPart}
                options={myParts[selectedProgram as ProgKey]}
                setter={setMyPart}
              />
            </AccordionSection>
            <AccordionSection title="What did you do well?">
              <CheckboxGroupBox
                valuesList={didWell}
                options={successes[selectedProgram as ProgKey]}
                setter={setDidWell}
              />
            </AccordionSection>
            <AccordionSection title="Do you see the situation differently now?">
              <StyledTextInput
                value={learned}
                setter={setLearned}
              />
            </AccordionSection>
          </View>

          <Text style={styles.centerText}>Are you ready to let it go?</Text>
          <View style={styles.buttonRow}>
            <BeFreeButton
              disabled={incomplete}
              setLetGo={() => setLetGo(true)}
            />
            <Button
              mode="outlined"
              onPress={() => setNeverVisible(true)}>
              NEVER!!
            </Button>
          </View>
        </View>
      </PageCard>
      <Privacy />
      <NeverLetGo
        visible={neverVisible}
        onClose={() => setNeverVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  stack: {
    gap: 12,
  },
  centerBold: {
    textAlign: "center",
    fontWeight: "bold",
  },
  centerText: {
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
});
