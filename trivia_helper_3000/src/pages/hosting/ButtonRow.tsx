import React from 'react';
import { Paper, Group, Button } from '@mantine/core';

const ButtonRow = () => {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked`);
    // Add your button logic here
  };

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Group justify="space-between">
        <Button 
          variant="filled" 
          onClick={() => handleButtonClick('Primary')}
        >
          Primary Action
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleButtonClick('Secondary')}
        >
          Secondary Action
        </Button>
        <Button 
          variant="subtle" 
          onClick={() => handleButtonClick('Tertiary')}
        >
          Tertiary Action
        </Button>
        <Button 
          variant="light" 
          onClick={() => handleButtonClick('Light')}
        >
          Light Action
        </Button>
      </Group>
    </Paper>
  );
};

export default ButtonRow;