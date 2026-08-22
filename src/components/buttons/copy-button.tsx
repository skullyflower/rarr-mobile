import { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';

import copyText from '@/lib/copy-text';

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
}

export default function CopyButton({ text, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [text]);

  return (
    <IconButton
      icon={copied ? 'check' : 'content-copy'}
      disabled={disabled}
      onPress={() => {
        copyText(text);
        setCopied(true);
      }}
      accessibilityLabel="Copy and send to your fellow traveller"
    />
  );
}
