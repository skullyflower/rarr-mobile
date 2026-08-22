import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CheckboxGroupBox from '@/components/form/checkbox-group-box';
import strings from '@/data/alanon-tenth.json';

interface CharacterDefectsSectionProps {
  characterDefects: string[];
  setCharacterDefects: (value: string[]) => void;
}

export default function CharacterDefectsSection({
  characterDefects,
  setCharacterDefects,
}: CharacterDefectsSectionProps) {
  const defects = strings.characterDefects;
  return (
    <View style={styles.stack}>
      <Text>What negative traits did I exhibit today?</Text>
      <CheckboxGroupBox valuesList={characterDefects} options={defects} setter={setCharacterDefects} />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
});
