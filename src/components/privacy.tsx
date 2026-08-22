import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import strings from '@/data/privacy.json';

export default function Privacy() {
  return (
    <View style={styles.container}>
      {strings.text.map((line, i) => (
        <Text key={`priv-${i}`} style={i === 0 ? styles.bold : undefined}>
          {line}
        </Text>
      ))}
      {strings.appOnlyText.map((line, i) => (
        <Text key={`app-${i}`}>{line}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
