import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, Chip, Text, TouchableRipple, useTheme } from 'react-native-paper';

interface CheckboxGroupBoxProps {
  columns?: number;
  valuesList: string[];
  options: Record<string, string> | string[];
  setter: (newvalue: string[]) => void;
}

export default function CheckboxGroupBox({ valuesList, options, setter }: CheckboxGroupBoxProps) {
  const theme = useTheme();
  const optionsList = Array.isArray(options) ? options : Object.entries(options);

  const toggle = (value: string): void => {
    setter(
      valuesList.includes(value) ? valuesList.filter((v) => v !== value) : [...valuesList, value]
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setter([]), [options]);

  return (
    <View style={[styles.box, { borderColor: theme.colors.outline }]}>
      {valuesList.length > 0 && (
        <View style={styles.badgeRow}>
          {valuesList
            .filter((value) => !Array.isArray(options) || options.includes(value))
            .map((value) => (
              <Chip key={value} compact style={styles.badge}>
                {value.replaceAll('_', ' ')}
              </Chip>
            ))}
        </View>
      )}
      <View style={styles.grid}>
        {optionsList.map((part) => {
          const value = typeof part === 'string' ? part : part[0];
          const checked = valuesList.includes(value);
          return (
            <TouchableRipple
              key={value}
              onPress={() => toggle(value)}
              style={[
                styles.checkboxRow,
                {
                  borderColor: theme.colors.outline,
                  backgroundColor: checked ? theme.colors.surfaceVariant : undefined,
                },
              ]}
            >
              <View style={styles.checkboxRowInner}>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => toggle(value)} />
                <View style={styles.checkboxLabel}>
                  {typeof part === 'string' ? (
                    <Text>{part}</Text>
                  ) : (
                    <>
                      <Text style={styles.bold}>({part[0].replaceAll('_', ' ')})</Text>
                      <Text>{part[1]}</Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableRipple>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    gap: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    marginRight: 0,
  },
  grid: {
    gap: 8,
  },
  checkboxRow: {
    borderWidth: 1,
    borderRadius: 7,
  },
  checkboxRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  checkboxLabel: {
    flex: 1,
    gap: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});
