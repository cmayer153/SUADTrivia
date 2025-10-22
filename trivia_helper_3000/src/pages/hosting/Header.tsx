import React from 'react';
import { Paper, Text, Group, Image, Box } from '@mantine/core';

import logo from "/src/assets/TrackAttackMusicBingo.png";

interface HeaderProps {
  location?: string;
}
const Header: React.FC<HeaderProps> = ({ location }) => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Group justify="space-between" align="center">
        {/* Left Logo */}
        <Box>
          <Image
            src={logo}
            alt="Left Logo"
            height={40}
            width="auto"
            fit="contain"
          />
        </Box>

        {/* Center Text */}
        <Box style={{ textAlign: 'center' }}>
          <Text fw={500} size="lg">
            Welcome to {location ? `${location}` : 'Trivia Helper 3000'}
          </Text>
        </Box>

        {/* Right Logo */}
        <Box>
          <Image
            src={logo}
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