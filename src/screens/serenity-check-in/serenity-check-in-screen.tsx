import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import AccordionSection from '@/components/layout/accordion-section';
import CollapsingText from '@/components/layout/collapsing-text';
import PageCard from '@/components/layout/page-card';
import Privacy from '@/components/privacy';
import type { DoubleListItem } from '@/components/form/double-lister-input';
import DoubleListerInput from '@/components/form/double-lister-input';
import WhatYouWrote from '@/components/what-you-wrote/what-you-wrote';
import { createWhatYouWroteSections } from '@/components/what-you-wrote/typedSectionFactories';
import { serenityFieldsToTypedSections } from './serenityCheckInTypedSections';
import strings from '@/data/serenity.json';

export default function SerenityCheckInScreen() {
  const [letGo, setLetGo] = useState(false);
  const [canCannotControl, setCanCannotControl] = useState<DoubleListItem[]>([]);

  const reset = (): void => {
    setLetGo(false);
    setCanCannotControl([]);
  };

  if (letGo) {
    return (
      <WhatYouWrote
        reset={reset}
        sections={createWhatYouWroteSections(serenityFieldsToTypedSections({ canCannotControl }))}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header={strings.title}>
        <View style={styles.stack}>
          <View style={styles.stack}>
            <Text>{strings.subHeading}</Text>
            <CollapsingText>
              <View style={styles.stack}>
                {strings.collapsedText.map((line, i) => (
                  <Text key={`serene-${i}`}>{line}</Text>
                ))}
              </View>
            </CollapsingText>
          </View>
          <AccordionSection title={strings.accordionHeading}>
            <DoubleListerInput
              list={canCannotControl}
              setList={setCanCannotControl}
              labels={[strings.labels[0], strings.labels[1]]}
            />
          </AccordionSection>
          <View style={styles.prayerBox}>
            {strings.prayer.map((line, i) => (
              <Text key={`pray-${i}`} variant="bodyLarge">
                {line}
              </Text>
            ))}
          </View>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              disabled={canCannotControl.length === 0}
              onPress={() => setLetGo(true)}
            >
              Be Free!
            </Button>
          </View>
        </View>
      </PageCard>
      <Privacy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
  },
  stack: {
    gap: 12,
  },
  prayerBox: {
    padding: 12,
    gap: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
