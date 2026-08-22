import { useState } from 'react';
import { Button, Menu } from 'react-native-paper';

interface UseProgramDropDown {
  ProgramDropDown: () => React.JSX.Element;
  selectedProgram: string;
}

export default function useProgramDropDown(programOptions: string[]): UseProgramDropDown {
  const [selectedProgram, setSelectedProgram] = useState(programOptions[0]);
  const [visible, setVisible] = useState(false);

  const ProgramDropDown = (): React.JSX.Element => (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button mode="contained-tonal" icon="chevron-down" onPress={() => setVisible(true)}>
          {selectedProgram}
        </Button>
      }
    >
      {programOptions.map((program) => (
        <Menu.Item
          key={program}
          leadingIcon={selectedProgram === program ? 'check' : undefined}
          title={program}
          onPress={() => {
            setSelectedProgram(program);
            setVisible(false);
          }}
        />
      ))}
    </Menu>
  );

  return { ProgramDropDown, selectedProgram };
}
