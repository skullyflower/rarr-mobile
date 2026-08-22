import acaTenth from '@/data/aca-tenth.json';
import {
  buildTypedSectionCopy,
  isTypedSectionEmpty,
  joinTypedSectionsCopy,
  type TypedSection,
} from '../typedSection';

const firstTrait = acaTenth.traitList[0];

describe('buildTypedSectionCopy — one fixture per TypedSection kind', () => {
  it('plainBlock', () => {
    const section: TypedSection = {
      id: 'p1',
      kind: 'plainBlock',
      displayHeading: 'Because',
      body: 'they cut me off in traffic',
    };
    expect(buildTypedSectionCopy(section)).toBe('Because\nthey cut me off in traffic');
  });

  it('plainBlock uses copyHeading over displayHeading when provided', () => {
    const section: TypedSection = {
      id: 'p2',
      kind: 'plainBlock',
      displayHeading: 'Display',
      copyHeading: 'Copy',
      body: 'text',
    };
    expect(buildTypedSectionCopy(section)).toBe('Copy\ntext');
  });

  it('bulletList (stacked)', () => {
    const section: TypedSection = {
      id: 'b1',
      kind: 'bulletList',
      displayHeading: 'Tools',
      copyHeading: 'Tools I used today:',
      items: ['journaling', 'calling a friend'],
      copyLayout: 'stacked',
    };
    expect(buildTypedSectionCopy(section)).toBe(
      'Tools I used today:\n\t• journaling\n\t• calling a friend'
    );
  });

  it('bulletList normalizes underscores when requested', () => {
    const section: TypedSection = {
      id: 'b2',
      kind: 'bulletList',
      displayHeading: 'Traits',
      copyHeading: 'Traits:',
      items: ['self_doubt'],
      normalizeUnderscores: true,
      copyLayout: 'stacked',
    };
    expect(buildTypedSectionCopy(section)).toBe('Traits:\n\t• self doubt');
  });

  it('qaPairs (alanon variant)', () => {
    const section: TypedSection = {
      id: 'qa1',
      kind: 'qaPairs',
      variant: 'alanon',
      displayHeading: 'Spot Check',
      pairs: [['Q1?', 'A1']],
    };
    expect(buildTypedSectionCopy(section)).toBe('Spot Check Q and A for today:\n \t• Q1?\n\t A1\n');
  });

  it('qaPairs (traits variant)', () => {
    const section: TypedSection = {
      id: 'qa2',
      kind: 'qaPairs',
      variant: 'traits',
      displayHeading: 'Traits',
      pairs: [['Q1?', 'A1']],
    };
    expect(buildTypedSectionCopy(section)).toBe('Traits I had today:\n \t• Q1?\n\t A1\n');
  });

  it('acaTraitQs resolves answers from aca-tenth.json by question text', () => {
    const section: TypedSection = {
      id: 'aca1',
      kind: 'acaTraitQs',
      traitQs: [firstTrait.Q],
    };
    expect(buildTypedSectionCopy(section)).toBe(
      `Spawn of Trouble Traits I had today:\n\t• ${firstTrait.A}`
    );
  });

  it('choiceLevel', () => {
    const section: TypedSection = { id: 'c1', kind: 'choiceLevel', body: 'Choosing' };
    expect(buildTypedSectionCopy(section)).toBe('Choice Level:\nToday I was capable of: Choosing');
  });

  it('feelingStatement', () => {
    const section: TypedSection = { id: 'f1', kind: 'feelingStatement', body: 'I feel calm' };
    expect(buildTypedSectionCopy(section)).toBe("Today's Feeling Statement:\n\tI feel calm");
  });

  it('affirmationBullets', () => {
    const section: TypedSection = {
      id: 'aff1',
      kind: 'affirmationBullets',
      displayHeading: 'Affirmations',
      copyHeading: 'Praise',
      items: ['brave', 'kind'],
    };
    expect(buildTypedSectionCopy(section)).toBe('Praise Today: \n\t• I am brave,\n\t• I am kind');
  });

  it('controlPairs', () => {
    const section: TypedSection = {
      id: 'ctrl1',
      kind: 'controlPairs',
      displayHeading: 'Control',
      pairs: [['the weather', 'bring an umbrella']],
    };
    expect(buildTypedSectionCopy(section)).toBe(
      'Control Issues Today:\n\t  Today I want to control, but cannot control:\n\t the weather\n   While I could and probably should: \n\t bring an umbrella'
    );
  });

  it('fearPairs', () => {
    const section: TypedSection = {
      id: 'fear1',
      kind: 'fearPairs',
      displayHeading: 'Fears',
      pairs: [['failure', 'I have support']],
    };
    expect(buildTypedSectionCopy(section)).toBe(
      'Fears and Gratitudes for today:\n \t• Fear: failure\n\t\tBut grateful: I have support'
    );
  });

  it('gratefulLines', () => {
    const section: TypedSection = { id: 'g1', kind: 'gratefulLines', lines: ['my health'] };
    expect(buildTypedSectionCopy(section)).toBe('...and grateful:\n \t• my health');
  });

  it('characterBullets (defects)', () => {
    const section: TypedSection = {
      id: 'ch1',
      kind: 'characterBullets',
      variant: 'defects',
      items: ['impatience'],
    };
    expect(buildTypedSectionCopy(section)).toBe('Character Defects for today:\n impatience\n');
  });

  it('characterBullets (assets)', () => {
    const section: TypedSection = {
      id: 'ch2',
      kind: 'characterBullets',
      variant: 'assets',
      items: ['patience'],
    };
    expect(buildTypedSectionCopy(section)).toBe('Character Assets for today:\n patience\n');
  });
});

describe('isTypedSectionEmpty', () => {
  it('treats whitespace-only bodies as empty', () => {
    expect(isTypedSectionEmpty({ id: 'x', kind: 'plainBlock', displayHeading: 'H', body: '   ' })).toBe(
      true
    );
  });

  it('treats empty arrays as empty', () => {
    expect(
      isTypedSectionEmpty({
        id: 'x',
        kind: 'bulletList',
        displayHeading: 'H',
        copyHeading: 'H',
        items: [],
        copyLayout: 'stacked',
      })
    ).toBe(true);
  });

  it('buildTypedSectionCopy returns empty string for empty sections', () => {
    const section: TypedSection = { id: 'x', kind: 'plainBlock', displayHeading: 'H', body: '' };
    expect(buildTypedSectionCopy(section)).toBe('');
  });
});

describe('joinTypedSectionsCopy', () => {
  it('joins non-empty sections with a blank line and drops empty ones', () => {
    const sections: TypedSection[] = [
      { id: 'a', kind: 'plainBlock', displayHeading: 'A', body: 'first' },
      { id: 'b', kind: 'plainBlock', displayHeading: 'B', body: '' },
      { id: 'c', kind: 'plainBlock', displayHeading: 'C', body: 'third' },
    ];
    expect(joinTypedSectionsCopy(sections)).toBe('A\nfirst\n\nC\nthird');
  });
});
