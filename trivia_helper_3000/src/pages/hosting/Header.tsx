import React from 'react';
import { Paper, Text, Group, Image, Box } from '@mantine/core';

const Header = () => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Group justify="space-between" align="center">
        {/* Left Logo */}
        <Box>
          <Image
            src="/src/assets/Designer.jpeg"
            alt="Left Logo"
            height={40}
            width="auto"
            fit="contain"
          />
        </Box>

        {/* Center Text */}
        <Box style={{ textAlign: 'center' }}>
          <Text weight={500} size="lg">
            Your Application Title
          </Text>
          <Text size="sm" color="dimmed">
            Subtitle or tagline here
          </Text>
        </Box>

        {/* Right Logo */}
        <Box>
          <Image
            src="/src/assets/Designer.jpeg"
            alt="Right Logo"
            height={40}
            width="auto"
            fit="contain"
          />
        </Box>
      </Group>
    </Paper>
  );
};

export default Header;