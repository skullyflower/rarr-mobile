import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import ColorBox from "@/components/layout/color-box";
import PageCard from "@/components/layout/page-card";
import useProgramDropDown from "@/hooks/use-program-dropdown";
import steps from "@/data/steps.json";

type StepKey = keyof typeof steps;
const programOptions = Object.keys(steps);

export default function TheStepsScreen() {
  const { ProgramDropDown, selectedProgram } = useProgramDropDown(programOptions);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard
        header={
          <View style={styles.headerRow}>
            <Text
              variant="headlineMedium"
              style={styles.headerText}>
              The 12 Steps of
            </Text>
            <ProgramDropDown />
          </View>
        }>
        <ColorBox>
          <View style={styles.stack}>
            {steps[selectedProgram as StepKey].map((step: string, i: number) => (
              <View
                key={`step-${i}`}
                style={styles.stepRow}>
                <Text style={styles.stepNumber}>{i + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </ColorBox>
      </PageCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  headerText: {
    textAlign: "center",
  },
  stack: {
    gap: 12,
  },
  stepRow: {
    flexDirection: "row",
    gap: 8,
  },
  stepNumber: {
    fontWeight: "bold",
    minWidth: 24,
  },
  stepText: {
    flex: 1,
    fontSize: 18,
  },
});
