import type { ReactNode } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface ConfirmProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string | ReactNode;
  onConfirm: () => void;
}

export default function Confirm({ visible, onClose, title, message, onConfirm }: ConfirmProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {typeof message === 'string' ? <Text variant="bodyMedium">{message}</Text> : message}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={onConfirm}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
