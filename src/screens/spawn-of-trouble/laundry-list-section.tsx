import { Linking, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import CheckboxGroupBox from '@/components/form/checkbox-group-box';
import strings from '@/data/aca-tenth.json';

const bothLaundryLists = strings.laundryLists;

interface LaundryListSectionProps {
  llTraits: string[];
  setLLTraits: (value: string[]) => void;
}

export default function LaundryListSection({ llTraits, setLLTraits }: LaundryListSectionProps) {
  const theme = useTheme();

  return (
    <View style={styles.stack}>
      <Text>
        Select the Laundry List and Other Laundry List traits that you experienced today.{' '}
        <Text
          style={{ color: theme.colors.secondary, textDecorationLine: 'underline' }}
          onPress={() => Linking.openURL('https://adultchildren.org/literature/laundry-list/')}
        >
          Go to adultchildren.org for more information.
        </Text>
      </Text>
      {bothLaundryLists.map((traitOptions, i) => (
        <View key={`trait${i}`} style={styles.group}>
          <Text variant="labelLarge">Traits {i + 1}</Text>
          <CheckboxGroupBox columns={2} valuesList={llTraits} options={traitOptions} setter={setLLTraits} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
  group: {
    gap: 4,
  },
});
