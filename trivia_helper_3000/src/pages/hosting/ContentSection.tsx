import React from 'react';
import { Paper, Group, Text, Stack } from '@mantine/core';
import ReactPlayer from 'react-player/file';

const ContentSection = () => {
  return (
    <Group grow spacing="md" align="stretch">
      <Paper shadow="sm" p="md" withBorder>
        <Stack spacing="sm">
          <Text weight={500} size="lg">
            Now Playing
          </Text>

          <div style={{ 
            height: '200px', 
            backgroundColor: '#f8f9fa', 
            border: '2px dashed #dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px'
          }}>
            <ReactPlayer url={"https://trivia.sfo3.cdn.digitaloceanspaces.com/Tycho%20-%20Awake%20-%2002%20Montana.mp3"} controls={true} />
          </div>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Stack spacing="sm">
          <Text weight={500} size="lg">
            Up Next
          </Text>
          <Text size="sm" color="dimmed">
            This is the right content container. You can add any content here 
            such as widgets, statistics, or other components.
          </Text>
          {/* Add your right container content here */}
          <div style={{ 
            height: '200px', 
            backgroundColor: '#f8f9fa', 
            border: '2px dashed #dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px'
          }}>
            <Text color="dimmed" size="sm">
              Right Content Area
            </Text>
          </div>
        </Stack>
      </Paper>
    </Group>
  );
};

export default ContentSection;