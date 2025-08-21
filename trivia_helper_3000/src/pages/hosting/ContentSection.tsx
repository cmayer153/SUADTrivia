import React from 'react';
import { Paper, Group, Text, Stack } from '@mantine/core';

const ContentSection = () => {
  return (
    <Group grow spacing="md" align="stretch">
      <Paper shadow="sm" p="md" withBorder>
        <Stack spacing="sm">
          <Text weight={500} size="lg">
            Left Container
          </Text>
          <Text size="sm" color="dimmed">
            This is the left content container. You can add any content here 
            such as forms, charts, tables, or other components.
          </Text>
          {/* Add your left container content here */}
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
              Left Content Area
            </Text>
          </div>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Stack spacing="sm">
          <Text weight={500} size="lg">
            Right Container
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