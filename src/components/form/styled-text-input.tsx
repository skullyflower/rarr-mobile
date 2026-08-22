import { TextInput, type TextInputProps } from 'react-native-paper';

interface StyledTextInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: string;
  setter: (value: string) => void;
}

export default function StyledTextInput({ value, setter, ...rest }: StyledTextInputProps) {
  return <TextInput multiline value={value} onChangeText={setter} {...rest} />;
}
