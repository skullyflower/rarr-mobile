import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, TextInput, useTheme } from 'react-native-paper';

interface ListerInputProps {
  list: string[];
  setList: (value: string[]) => void;
  placeholder?: string;
}

export default function ListerInput({ list, setList, placeholder }: ListerInputProps) {
  const theme = useTheme();
  const [oneItem, setOneItem] = useState('');

  const addItem = useCallback(() => {
    if (oneItem) {
      setList([oneItem, ...list]);
      setOneItem('');
    }
  }, [oneItem, list, setList]);

  return (
    <View style={styles.stack}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Add an item...'}
          value={oneItem}
          onChangeText={setOneItem}
          onSubmitEditing={addItem}
          returnKeyType="done"
        />
        <Button mode="contained" onPress={addItem}>
          Add
        </Button>
      </View>
      {list.map((value, index) => (
        <View key={index} style={[styles.itemRow, { borderColor: theme.colors.outline }]}>
          <Text style={styles.itemText}>{value}</Text>
          <IconButton
            icon="delete"
            size={18}
            onPress={() => setList(list.filter((_, i) => i !== index))}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  itemText: {
    flex: 1,
  },
});
