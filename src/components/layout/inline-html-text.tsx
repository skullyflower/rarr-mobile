import { Linking } from 'react-native';
import { Text, useTheme, type TextProps } from 'react-native-paper';

// Renders the only 3 inline tags actually used in this app's JSON content
// (<a href>, <b>, <em>) — not a general HTML/markdown parser.
type Segment =
  | { type: 'text'; text: string }
  | { type: 'a'; text: string; href: string }
  | { type: 'b'; text: string }
  | { type: 'em'; text: string };

const TAG_PATTERN = /<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>|<b>(.*?)<\/b>|<em>(.*?)<\/em>/gs;

function parseInlineHtml(input: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TAG_PATTERN.lastIndex = 0;
  while ((match = TAG_PATTERN.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: input.slice(lastIndex, match.index) });
    }
    const [, href, aText, bText, emText] = match;
    if (href !== undefined) {
      segments.push({ type: 'a', text: aText, href });
    } else if (bText !== undefined) {
      segments.push({ type: 'b', text: bText });
    } else if (emText !== undefined) {
      segments.push({ type: 'em', text: emText });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < input.length) {
    segments.push({ type: 'text', text: input.slice(lastIndex) });
  }
  return segments;
}

interface InlineHtmlTextProps extends Omit<TextProps<never>, 'children'> {
  html: string;
}

export default function InlineHtmlText({ html, style, ...rest }: InlineHtmlTextProps) {
  const theme = useTheme();
  const segments = parseInlineHtml(html);

  return (
    <Text style={style} {...rest}>
      {segments.map((segment, i) => {
        switch (segment.type) {
          case 'a':
            return (
              <Text
                key={i}
                style={{ color: theme.colors.secondary, textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL(segment.href)}
              >
                {segment.text}
              </Text>
            );
          case 'b':
            return (
              <Text key={i} style={{ fontWeight: 'bold' }}>
                {segment.text}
              </Text>
            );
          case 'em':
            return (
              <Text key={i} style={{ fontStyle: 'italic' }}>
                {segment.text}
              </Text>
            );
          default:
            return <Text key={i}>{segment.text}</Text>;
        }
      })}
    </Text>
  );
}
