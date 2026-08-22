import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { isTypedSectionEmpty, type TypedSection } from './typedSection';

function SectionHeading({ children }: { children: string }) {
  return (
    <Text variant="titleSmall" style={styles.heading}>
      {children}
    </Text>
  );
}

function BulletList({ items, idPrefix }: { items: string[]; idPrefix: string }) {
  return (
    <View style={styles.indent}>
      {items.map((item, i) => (
        <View key={`${idPrefix}-${i}`} style={styles.bulletRow}>
          <Text>{'• '}</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function TypedSectionDisplay({ section: s }: { section: TypedSection }) {
  if (isTypedSectionEmpty(s)) return null;

  switch (s.kind) {
    case 'plainBlock':
      return (
        <View>
          <SectionHeading>{s.displayHeading}</SectionHeading>
          <View style={styles.indent}>
            <Text>{s.body}</Text>
          </View>
        </View>
      );
    case 'bulletList': {
      const items = s.normalizeUnderscores ? s.items.map((i) => i.replaceAll('_', ' ')) : s.items;
      return (
        <View>
          <SectionHeading>{s.displayHeading}</SectionHeading>
          <BulletList items={items} idPrefix={s.id} />
        </View>
      );
    }
    case 'qaPairs':
      return (
        <View>
          <SectionHeading>{s.displayHeading}</SectionHeading>
          <View style={styles.indent}>
            {s.pairs.map((one, indx) => (
              <View key={`${s.id}-${indx}`} style={styles.pairBlock}>
                <Text>{'• '}{one[0]}</Text>
                <Text style={styles.pairAnswer}>{one[1]}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    case 'acaTraitQs':
      return (
        <View>
          <SectionHeading>Traits I had today:</SectionHeading>
          <BulletList
            items={s.traitQs.map((one) => one.replaceAll('_', ' '))}
            idPrefix={s.id}
          />
        </View>
      );
    case 'choiceLevel':
      return (
        <View>
          <SectionHeading>Today&apos;s Choice Level:</SectionHeading>
          <Text style={styles.bodyText}>{s.body}</Text>
        </View>
      );
    case 'feelingStatement':
      return (
        <View>
          <SectionHeading>Today&apos;s Feeling Statement:</SectionHeading>
          <Text style={styles.bodyText}>{s.body}</Text>
        </View>
      );
    case 'affirmationBullets':
      return (
        <View>
          <SectionHeading>{s.displayHeading}</SectionHeading>
          <BulletList
            items={s.items.map((one) => `I am ${one.replaceAll('_', ' ')}`)}
            idPrefix={s.id}
          />
        </View>
      );
    case 'controlPairs':
      return (
        <View>
          <SectionHeading>{s.displayHeading}</SectionHeading>
          {s.pairs.map((value, index) => (
            <View key={`${s.id}-${index}`} style={styles.controlRow}>
              <Text style={styles.flexItem}>I want to control but cannot: {value[0]}</Text>
              <Text style={styles.flexItem}>What I could do: {value[1]}</Text>
            </View>
          ))}
        </View>
      );
    case 'fearPairs':
      return (
        <View style={styles.stackGap}>
          <SectionHeading>{s.displayHeading}</SectionHeading>
          {s.pairs.map((value, index) => (
            <View key={`${s.id}-${index}`} style={styles.stackGapSmall}>
              <Text>I fear: {value[0]}</Text>
              <Text>but am grateful: {value[1]}</Text>
            </View>
          ))}
        </View>
      );
    case 'gratefulLines':
      return (
        <View>
          {s.lines.map((value, index) => (
            <View key={`${s.id}-${index}`} style={styles.controlRow}>
              <Text>and grateful: {value}</Text>
            </View>
          ))}
        </View>
      );
    case 'characterBullets':
      return (
        <View>
          <SectionHeading>
            {s.variant === 'defects' ? 'Character Defects for today:' : 'Character Assets for today:'}
          </SectionHeading>
          <BulletList items={s.items} idPrefix={s.id} />
        </View>
      );
    default: {
      const _x: never = s;
      return _x;
    }
  }
}

export function TypedSectionsDisplay({ sections }: { sections: TypedSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <Fragment key={s.id}>
          <View>
            <TypedSectionDisplay section={s} />
          </View>
        </Fragment>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    paddingBottom: 6,
  },
  indent: {
    paddingLeft: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletText: {
    flexShrink: 1,
  },
  pairBlock: {
    marginBottom: 6,
  },
  pairAnswer: {
    paddingLeft: 12,
  },
  bodyText: {
    fontWeight: '500',
    paddingBottom: 6,
  },
  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 2,
  },
  flexItem: {
    flexShrink: 1,
  },
  stackGap: {
    gap: 8,
  },
  stackGapSmall: {
    gap: 4,
  },
});

export { TypedSectionDisplay };
