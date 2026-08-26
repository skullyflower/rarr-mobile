import { Background } from "expo-router/build/react-navigation";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

interface BeFreeButtonProps {
  disabled: boolean;
  setLetGo: () => void;
}
export default function BeFreeButton({ disabled, setLetGo }: BeFreeButtonProps) {
  const theme = useTheme();

  return (
    <Button
      textColor={theme.colors.onSurfaceVariant}
      style={[{ backgroundColor: theme.colors.surfaceVariant }]}
      mode="contained"
      disabled={disabled}
      onPress={setLetGo}>
      Be Free!
    </Button>
  );
}
