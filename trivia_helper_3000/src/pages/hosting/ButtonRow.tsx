import React from 'react';
import { Paper, Group, Button } from '@mantine/core';


interface ButtonRowProps {
  playlists: { playlist1: string, playlist2: string, playlist3: string,
               playlist4: string, playlist5: string,
               playlist6: string };
}
const ButtonRow: React.FC<ButtonRowProps> = ({ playlists }) => {
  const handleButtonClick = (buttonName: string) => {
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
            {playlists.playlist1}
        </Button>
        <Button 
          variant="filled" 
          onClick={() => handleButtonClick('Secondary')}
        >
          {playlists.playlist2}
        </Button>
        <Button 
          variant="filled" 
          onClick={() => handleButtonClick('Tertiary')}
        >
          {playlists.playlist3}
        </Button>
        <Button 
          variant="filled" 
          onClick={() => handleButtonClick('Light')}
        >
          {playlists.playlist4}
          Light Action
        </Button>
                <Button 
          variant="filled" 
          onClick={() => handleButtonClick('Primary')}
        >
            {playlists.playlist5}
        </Button>
                <Button 
          variant="filled" 
          onClick={() => handleButtonClick('Primary')}
        >
            {playlists.playlist6}
        </Button>
      </Group>
    </Paper>
  );
};

export default ButtonRow;