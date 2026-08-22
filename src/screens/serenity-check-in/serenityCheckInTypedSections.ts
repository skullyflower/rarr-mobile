import type { TypedSection } from '@/components/what-you-wrote/typedSection';
import type { DoubleListItem } from '@/components/form/double-lister-input';

export type SerenityFields = {
  canCannotControl: DoubleListItem[];
};

export function serenityFieldsToTypedSections(p: SerenityFields): TypedSection[] {
  return [
    {
      id: 'control',
      kind: 'controlPairs',
      displayHeading: 'My (lack of) Serenity today:',
      pairs: p.canCannotControl,
    },
  ];
}
