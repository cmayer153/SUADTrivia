import React from 'react';
import { Paper, Stack, Text, SimpleGrid } from '@mantine/core';
import SongDetails from '../../hosting/SongDetails';
import SongBox from '../../hosting/SongBox';

interface ListSectionProps {
  playHistory: SongDetails[]; 
}

const ListSection: React.FC<ListSectionProps> = ({ playHistory }) => {
 
  

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Stack gap="md">
        <Text fw={500} size="lg">
          Play History
        </Text>
        
        <SimpleGrid 
          cols={3} 
          spacing="md"
        >
          {playHistory.map((item) => (
            <Paper key={item.title} shadow="xs" p="sm" withBorder>
              <Stack gap="xs">
                <SongBox {...item} />
       
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default ListSection;