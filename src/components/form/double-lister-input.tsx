import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput, useTheme } from 'react-native-paper';

export type DoubleListItem = [string, string];

interface DoubleListerInputProps {
  list: DoubleListItem[];
  setList: (value: DoubleListItem[]) => void;
  labels?: [string, string];
}

export default function DoubleListerInput({ list, setList, labels }: DoubleListerInputProps) {
  const theme = useTheme();
  const [oneItem, setOneItem] = useState('');
  const [twoItem, setTwoItem] = useState('');

  const addItem = useCallback(() => {
    if (oneItem && twoItem) {
      setList([[oneItem, twoItem], ...list]);
      setOneItem('');
      setTwoItem('');
    }
  }, [oneItem, twoItem, list, setList]);

  return (
    <View style={styles.stack}>
      <Card mode="outlined" style={styles.inputCard}>
        <Card.Content style={styles.inputCardContent}>
          <View style={styles.inputStack}>
            <TextInput
              placeholder={labels ? `Add a ${labels[0]}...` : 'Add an item...'}
              value={oneItem}
              onChangeText={setOneItem}
              returnKeyType="next"
            />
            <TextInput
              placeholder={labels ? `Add a ${labels[1]}...` : 'Add an item...'}
              value={twoItem}
              onChangeText={setTwoItem}
              onSubmitEditing={addItem}
              returnKeyType="done"
            />
          </View>
          <Button mode="contained" onPress={addItem}>
            Add
          </Button>
        </Card.Content>
      </Card>
      {list.map((value, index) => (
        <View key={index} style={[styles.itemRow, { borderColor: theme.colors.outline }]}>
          <View style={styles.itemStack}>
            <Text>
              <Text style={styles.bold}>{labels && labels[0]}:</Text> {value[0]}
            </Text>
            <Text>
              <Text style={styles.bold}>{labels && labels[1]}:</Text> {value[1]}
            </Text>
          </View>
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
  inputCard: {
    backgroundColor: 'transparent',
  },
  inputCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputStack: {
    flex: 1,
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    gap: 8,
  },
  itemStack: {
    flex: 1,
    gap: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
});
