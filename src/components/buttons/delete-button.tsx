import { useState } from 'react';
import { IconButton } from 'react-native-paper';

import Confirm from '@/components/confirm';
import { formatTitle } from '@/lib/copy-text';
import { deleteLog } from '@/lib/storage/journal-store';

interface DeleteButtonProps {
  what: string;
  callback: (what: string) => void;
}

export default function DeleteButton({ what, callback }: DeleteButtonProps) {
  const [visible, setVisible] = useState(false);

  const handleDelete = (): void => {
    deleteLog(what).then(() => {
      callback(what);
      setVisible(false);
    });
  };

  return (
    <>
      <IconButton
        icon="delete"
        onPress={() => setVisible(true)}
        accessibilityLabel={`Delete ${formatTitle(what)}`}
      />
      <Confirm
        visible={visible}
        onClose={() => setVisible(false)}
        title="Delete Entry"
        message="Are you sure you want to delete this entry?"
        onConfirm={handleDelete}
      />
    </>
  );
}
