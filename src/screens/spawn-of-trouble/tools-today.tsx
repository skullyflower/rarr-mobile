import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ListerInput from '@/components/form/lister-input';

interface ToolsUsedTodayProps {
  listOfTools: string[];
  setListOfTools: (value: string[]) => void;
}

export default function ToolsUsedToday({ listOfTools, setListOfTools }: ToolsUsedTodayProps) {
  return (
    <View style={styles.stack}>
      <Text>What are the tools of recovery you are using to help you live life in the moment?</Text>
      <ListerInput
        list={listOfTools}
        setList={setListOfTools}
        placeholder="Describe a tool you used today..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
});
