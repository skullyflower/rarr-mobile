import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, TouchableRipple, useTheme } from 'react-native-paper';

import DeleteButton from '@/components/buttons/delete-button';
import ColorBox from '@/components/layout/color-box';
import PageCard from '@/components/layout/page-card';
import SemiSafeContent, { type OneEntry } from './semi-safe-content';
import { formatTitle } from '@/lib/copy-text';
import { getLogList, readLog } from '@/lib/storage/journal-store';
import strings from '@/data/journal.json';

export default function JournalScreen() {
  const theme = useTheme();
  const [entries, setEntries] = useState<string[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<OneEntry | null>(null);

  const afterDelete = (toDelete: string) => (): void => {
    setEntries((prev) => prev.filter((e) => e !== toDelete));
    setSelectedEntry(null);
  };

  useEffect(() => {
    getLogList().then(setEntries);
  }, []);

  const getContents = (filename: string): void => {
    readLog(filename).then((res) => setSelectedEntry({ filename, content: res }));
  };

  if (selectedEntry) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backRow}>
          <IconButton icon="close" onPress={() => setSelectedEntry(null)} />
        </View>
        <PageCard header={formatTitle(selectedEntry.filename)}>
          <ColorBox>
            <SemiSafeContent
              entry={selectedEntry}
              afterDelete={afterDelete(selectedEntry.filename)}
            />
          </ColorBox>
        </PageCard>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header={strings.title}>
        <View style={styles.list}>
          {entries.length < 1 && <Text>{strings.emptyListText}</Text>}
          {entries.map((entry, index) => (
            <TouchableRipple
              key={index}
              onPress={() => getContents(entry)}
              style={[styles.row, { borderColor: theme.colors.outlineVariant }]}
            >
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>{formatTitle(entry)}</Text>
                <DeleteButton what={entry} callback={afterDelete(entry)} />
              </View>
            </TouchableRipple>
          ))}
        </View>
      </PageCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 8,
  },
  backRow: {
    alignItems: 'flex-end',
  },
  list: {
    gap: 4,
  },
  row: {
    borderRadius: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  rowText: {
    flex: 1,
  },
});
