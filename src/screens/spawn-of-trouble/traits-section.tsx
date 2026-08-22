import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CheckBoxAndText from '@/components/form/checkbox-and-text';
import strings from '@/data/aca-tenth.json';

interface TraitsSectionProps {
  selectedTraits: Record<string, string | undefined>;
  setSelectedTraits: (newval: Record<string, string | undefined>) => void;
}

export default function TraitsSection({ selectedTraits, setSelectedTraits }: TraitsSectionProps) {
  const traitList = strings.traitList;
  const allquestions = useMemo(() => traitList.map((trait) => trait.Q), [traitList]);

  return (
    <View style={styles.stack}>
      <Text>Select the ones that apply today.</Text>
      {allquestions.map((q, i) => (
        <CheckBoxAndText key={`q-${i}`} q={q} selected={selectedTraits} setSelected={setSelectedTraits} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
});
