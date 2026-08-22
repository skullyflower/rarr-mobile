import type { TypedSection } from '@/components/what-you-wrote/typedSection';
import type { DoubleListItem } from '@/components/form/double-lister-input';

export type FearsFields = {
  fearsList: DoubleListItem[];
  grateful: string[];
};

export function fearsFieldsToTypedSections(p: FearsFields): TypedSection[] {
  return [
    {
      id: 'fears',
      kind: 'fearPairs',
      displayHeading: "Today's fears:",
      pairs: p.fearsList,
    },
    {
      id: 'grateful',
      kind: 'gratefulLines',
      lines: p.grateful,
    },
  ];
}
