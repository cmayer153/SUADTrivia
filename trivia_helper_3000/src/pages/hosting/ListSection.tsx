import React from 'react';
import { Paper, Stack, Text, Group, Badge, SimpleGrid } from '@mantine/core';

const ListSection = () => {
  // Sample data - replace with your actual data
  const listItems = [
    { id: 1, title: 'Item One', status: 'Active', description: 'Description for item one' },
    { id: 2, title: 'Item Two', status: 'Pending', description: 'Description for item two' },
    { id: 3, title: 'Item Three', status: 'Completed', description: 'Description for item three' },
    { id: 4, title: 'Item Four', status: 'Active', description: 'Description for item four' },
    { id: 5, title: 'Item Five', status: 'Inactive', description: 'Description for item five' },
    { id: 6, title: 'Item Six', status: 'Pending', description: 'Description for item six' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Pending': return 'yellow';
      case 'Completed': return 'blue';
      case 'Inactive': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Stack gap="md">
        <Text weight={500} size="lg">
          List Section
        </Text>
        <Text size="sm" color="dimmed">
          This section contains a list of containers. Each container can hold different types of content.
        </Text>
        
        <SimpleGrid 
          cols={3} 
          spacing="md"
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 }
          ]}
        >
          {listItems.map((item) => (
            <Paper key={item.id} shadow="xs" p="sm" withBorder>
              <Stack gap="xs">
                <Group align="flex-start">
                  <Text weight={500} size="sm">
                    {item.title}
                  </Text>
                  <Badge 
                    color={getStatusColor(item.status)}
                    variant="light"
                    size="sm"
                  >
                    {item.status}
                  </Badge>
                </Group>
                <Text size="xs" color="dimmed">
                  {item.description}
                </Text>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default ListSection;