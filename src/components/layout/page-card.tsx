import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

interface PageCardProps {
  children: ReactNode;
  header?: ReactNode;
}

export default function PageCard({ children, header }: PageCardProps) {
  const theme = useTheme();
  const showHeader = header !== undefined && header !== null && header !== '';

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.elevation.level2 }]}
      contentStyle={styles.content}
    >
      {showHeader &&
        (typeof header === 'string' ? (
          <Text
            variant="headlineSmall"
            style={[styles.headerText, { color: theme.colors.primary }]}
          >
            {header}
          </Text>
        ) : (
          <View style={styles.headerNode}>{header}</View>
        ))}
      <View style={styles.body}>{children}</View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
  },
  content: {
    paddingBottom: 8,
  },
  headerText: {
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerNode: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 4,
  },
  body: {
    paddingTop: 8,
  },
});
