import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CheckboxGroupBox from '@/components/form/checkbox-group-box';
import strings from '@/data/alanon-tenth.json';

interface CharacterAssetsSectionProps {
  characterAssets: string[];
  setCharacterAssets: (value: string[]) => void;
}

export default function CharacterAssetsSection({
  characterAssets,
  setCharacterAssets,
}: CharacterAssetsSectionProps) {
  const assets = strings.CharacterAssets;
  return (
    <View style={styles.stack}>
      <Text>What positive traits did I exhibit today?</Text>
      <CheckboxGroupBox valuesList={characterAssets} options={assets} setter={setCharacterAssets} />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
});
