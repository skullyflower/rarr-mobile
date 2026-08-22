import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';

interface AccordionSectionProps {
  title: string;
  children: ReactNode;
}

export default function AccordionSection({ title, children }: AccordionSectionProps) {
  const theme = useTheme();

  return (
    <List.Accordion
      title={title}
      titleNumberOfLines={4}
      titleStyle={{ color: theme.colors.primary }}
      style={[
        styles.header,
        { borderColor: theme.colors.outline, backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <View
        style={[
          styles.panel,
          { borderColor: theme.colors.outline, backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        {children}
      </View>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 4,
  },
  panel: {
    borderWidth: 1,
    padding: 12,
  },
});
