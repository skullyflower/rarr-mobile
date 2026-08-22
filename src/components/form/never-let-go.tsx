import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface NeverLetGoProps {
  visible: boolean;
  onClose: () => void;
}

export default function NeverLetGo({ visible, onClose }: NeverLetGoProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>{"Won't you reconsider?"}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            This exercise is about learning to take better care of yourself.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
