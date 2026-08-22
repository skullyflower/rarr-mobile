import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CheckboxGroupBox from '@/components/form/checkbox-group-box';
import { red } from '@/theme/colors';
import strings from '@/data/aca-tenth.json';

interface AssetsSectionProps {
  praise: string[];
  setSetPraise: (value: string[]) => void;
}

export default function AssetsSection({ praise, setSetPraise }: AssetsSectionProps) {
  const assets = strings.assets;

  return (
    <View style={styles.stack}>
      <Text>Select Your Assets, include those you are not sure about or would like to have.</Text>
      {praise.length < 10 && (
        <Text style={[styles.centerBold, { color: red[200] }]}>Select at least 10.</Text>
      )}
      <CheckboxGroupBox columns={3} valuesList={praise} options={assets} setter={setSetPraise} />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
  centerBold: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
