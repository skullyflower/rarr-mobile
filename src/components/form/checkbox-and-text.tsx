import { StyleSheet, View } from 'react-native';
import { Checkbox, Text, TouchableRipple, useTheme } from 'react-native-paper';

import StyledTextInput from '@/components/form/styled-text-input';

interface CheckBoxAndTextProps {
  q: string;
  selected: Record<string, string | undefined>;
  setSelected: (newval: Record<string, string | undefined>) => void;
}

export default function CheckBoxAndText({ q, selected, setSelected }: CheckBoxAndTextProps) {
  const theme = useTheme();
  const checked = selected[q] !== undefined;

  const toggle = (): void => {
    setSelected({ ...selected, [q]: checked ? undefined : '' });
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={toggle}
        style={[
          styles.row,
          {
            borderColor: theme.colors.outline,
            backgroundColor: checked ? theme.colors.surfaceVariant : undefined,
          },
        ]}
      >
        <View style={styles.rowInner}>
          <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={toggle} />
          <Text style={styles.label}>{q}</Text>
        </View>
      </TouchableRipple>
      {checked && (
        <StyledTextInput
          value={selected[q] || ''}
          setter={(newVal) => setSelected({ ...selected, [q]: newVal })}
          placeholder="Write about it."
          style={styles.textInput}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    gap: 8,
  },
  row: {
    borderWidth: 1,
    borderRadius: 7,
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  label: {
    flex: 1,
  },
  textInput: {
    minHeight: 80,
  },
});
