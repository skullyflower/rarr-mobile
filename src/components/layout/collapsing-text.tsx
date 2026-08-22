import type { ReactNode } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function CollapsingText({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <View>
      {show && <View style={styles.content}>{children}</View>}
      <View style={styles.toggleRow}>
        <Button compact mode="text" onPress={() => setShow(!show)}>
          {show ? 'Show Less' : 'More Info'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: 8,
  },
  toggleRow: {
    alignItems: 'flex-end',
  },
});
