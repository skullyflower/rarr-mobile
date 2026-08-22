import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import CopyButton from '@/components/buttons/copy-button';
import DeleteButton from '@/components/buttons/delete-button';
import SaveButton from '@/components/buttons/save-button';

export interface OneEntry {
  filename: string;
  content: string;
}

interface SemiSafeContentProps {
  entry: OneEntry;
  afterDelete?: () => void;
}

export default function SemiSafeContent({ entry, afterDelete }: SemiSafeContentProps) {
  const { content: rawContent, filename: fileName } = entry;
  const [text, setText] = useState(rawContent);

  return (
    <View style={styles.stack}>
      <View style={styles.actionsRow}>
        <SaveButton text={text} fileName={fileName} disabled={rawContent === text} />
        <CopyButton text={text} />
        {fileName && afterDelete && <DeleteButton what={fileName} callback={afterDelete} />}
      </View>
      <TextInput multiline value={text} onChangeText={setText} style={styles.textArea} />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textArea: {
    minHeight: 300,
  },
});
