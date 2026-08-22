import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CheckBoxAndText from '@/components/form/checkbox-and-text';
import strings from '@/data/alanon-tenth.json';

interface QuestionsSectionProps {
  selectedQuestions: Record<string, string | undefined>;
  setSelectedQuestions: (newval: Record<string, string | undefined>) => void;
}

export default function QuestionsSection({
  selectedQuestions,
  setSelectedQuestions,
}: QuestionsSectionProps) {
  const allquestions = strings.questions;

  return (
    <View style={styles.stack}>
      <Text>Select the ones that apply today.</Text>
      {allquestions.map((q, i) => (
        <CheckBoxAndText
          key={`q-${i}`}
          q={q}
          selected={selectedQuestions}
          setSelected={setSelectedQuestions}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
});
