import React, { useEffect } from 'react';
import { Paper, Group, Text, Stack } from '@mantine/core';
//import ReactPlayer from 'react-player/file';
import ReactAudioPlayer from 'react-audio-player';

import SongDetails from '../../hosting/SongDetails';

interface ContentSectionProps {
  playlist: SongDetails[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ playlist }) => {
  let [currentSong, setCurrentSong] = React.useState<SongDetails | null>(null);
  let [nextSong, setNextSong] = React.useState<SongDetails | null>(null);


  useEffect(() => {
    if (playlist) {
      configureAudioPlayer();
    }
  }, [playlist]);

  const configureAudioPlayer = () => {
    if (playlist.length > 0) {
      setCurrentSong(playlist[0]);
      console.log("Current Song set to: ", currentSong);
      if (playlist.length > 1) {
        setNextSong(playlist[1]);
      } else {
        setNextSong(null);
      }
    } else {
      setCurrentSong(null);
      setNextSong(null);
    }
  };

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
            <ReactAudioPlayer src={currentSong ? currentSong.url : ""} controls={true} />
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