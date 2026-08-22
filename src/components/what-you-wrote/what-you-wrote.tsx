import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

import CopyButton from '@/components/buttons/copy-button';
import SaveButton from '@/components/buttons/save-button';
import ColorBox from '@/components/layout/color-box';
import PageCard from '@/components/layout/page-card';
import ReadyToLetGo from '@/components/form/ready-to-let-go';
import type { WhatYouWroteProps } from './types';

export default function WhatYouWrote({
  reset,
  heading,
  showReadyToLetGo = true,
  sections,
}: WhatYouWroteProps) {
  const [isLettingGo, setIsLettingGo] = useState(true);

  const stringToWrite = sections
    .map((s) => s.toCopy)
    .filter(Boolean)
    .join('\n\n');

  return (
    <>
      <PageCard
        header={
          <View style={styles.headerRow}>
            {typeof heading === 'string' || heading === undefined ? (
              <Text variant="titleMedium" style={styles.headerTitle}>
                {heading ?? 'Here is what you wrote.'}
              </Text>
            ) : (
              heading
            )}
            <View style={styles.headerActions}>
              <CopyButton text={stringToWrite} />
              <SaveButton text={stringToWrite} bigbutton />
              <IconButton icon="close" onPress={reset} />
            </View>
          </View>
        }
      >
        <ColorBox>
          <View style={styles.stack}>
            <View style={styles.sections}>
              {sections.map((s) => (
                <View key={s.id}>{s.content}</View>
              ))}
            </View>
            <View style={styles.startOverRow}>
              <Button mode="outlined" onPress={reset}>
                Start Over
              </Button>
            </View>
          </View>
        </ColorBox>
      </PageCard>
      {showReadyToLetGo && (
        <ReadyToLetGo visible={isLettingGo} onClose={() => setIsLettingGo(false)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  headerTitle: {
    flexShrink: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stack: {
    gap: 16,
  },
  sections: {
    gap: 16,
  },
  startOverRow: {
    alignItems: 'center',
  },
});

export type { WhatYouWroteSectionItem, WhatYouWroteProps } from './types';
