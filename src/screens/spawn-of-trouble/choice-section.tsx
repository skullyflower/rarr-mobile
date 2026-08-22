import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Text, useTheme } from 'react-native-paper';

import { green, red } from '@/theme/colors';
import strings from '@/data/aca-tenth.json';

interface ChoiceSectionProps {
  freedomText: string;
  setFreedomText: (value: string) => void;
}

export default function ChoiceSection({ freedomText, setFreedomText }: ChoiceSectionProps) {
  const theme = useTheme();
  const [freedomValue, setFreedomValue] = useState(50);
  const choiceLevels = strings.choiceLevels;

  const handleSelected = (value: number): void => {
    setFreedomValue(value);
    const combos = Object.entries(choiceLevels);
    const stringValue = combos.find(([, val]) => val === value)?.[0] || '';
    setFreedomText(stringValue);
  };

  return (
    <View style={styles.stack}>
      <Text>Where are you on the discernment scale, today?</Text>
      <Text style={styles.freedomText}>{freedomText}</Text>

      <View style={[styles.sliderBox, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Slider
          minimumValue={0}
          maximumValue={99}
          step={16.5}
          value={freedomValue}
          onValueChange={handleSelected}
          minimumTrackTintColor={green[400]}
          maximumTrackTintColor={red[400]}
        />
        <View style={styles.marksRow}>
          <Text variant="labelSmall">Denial</Text>
          <Text variant="labelSmall">Some Choice</Text>
          <Text variant="labelSmall">Greater Choice</Text>
          <Text variant="labelSmall">Discernment</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
  freedomText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sliderBox: {
    borderRadius: 6,
    padding: 16,
    gap: 8,
  },
  marksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
