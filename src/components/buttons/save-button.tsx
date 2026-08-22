import { useEffect, useState } from 'react';
import { Button, IconButton } from 'react-native-paper';

import { writeLog } from '@/lib/storage/journal-store';

interface SaveButtonProps {
  text: string;
  fileName?: string;
  disabled?: boolean;
  bigbutton?: boolean;
}

export default function SaveButton({ text, fileName, disabled, bigbutton }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  const saveLog = (): void => {
    writeLog(text, fileName).then((res) => setSaved(res));
  };

  useEffect(() => {
    setSaved(false);
  }, [text]);

  if (bigbutton) {
    return (
      <Button icon={saved ? 'check' : 'content-save'} disabled={disabled} onPress={saveLog}>
        Save
      </Button>
    );
  }

  return (
    <IconButton
      icon={saved ? 'check' : 'content-save'}
      disabled={disabled}
      onPress={saveLog}
      accessibilityLabel={`Save to ${fileName ? fileName : "Today's Log"}`}
    />
  );
}
