import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

import GetImage from '@/components/get-image';

const MEMBERS = [
  'Congrats.png',
  'NiceWork.png',
  'WellDone.png',
  'GoodJob.png',
  'WayToGo.png',
  'Congrats.png',
  'NiceWork.png',
  'WellDone.png',
  'GoodJob.png',
  'WayToGo.png',
];

interface ReadyToLetGoProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReadyToLetGo({ visible, onClose }: ReadyToLetGoProps) {
  const member = Number(Math.random().toFixed(1)) * 10;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>Congratulations! Nice work.</Dialog.Title>
        <Dialog.Content>
          <View style={styles.row}>
            <GetImage imgPath={MEMBERS[member] ?? 'GoodJob.png'} altText="Good Work" maxWidth={140} />
            <Text style={styles.text} variant="bodyMedium">
              Now you might want to talk about what you&apos;ve discovered with a trusted friend or
              mentor.
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    flex: 1,
  },
});
