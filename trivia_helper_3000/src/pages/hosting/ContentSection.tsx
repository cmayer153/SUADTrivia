import React, { useEffect } from 'react';
import { Paper, Group, Text, Stack } from '@mantine/core';
//import ReactPlayer from 'react-player/file';
import ReactAudioPlayer from 'react-audio-player';

import SongBox from '../../hosting/SongBox';
import SongDetails from '../../hosting/SongDetails';

interface ContentSectionProps {
  updateHistory: (lastPlayed: SongDetails | null) => void;
  playlist: SongDetails[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ playlist, updateHistory }) => {
  let [currentSong, setCurrentSong] = React.useState<SongDetails | null>(null);
  let [nextSong, setNextSong] = React.useState<SongDetails | null>(null);
  let [numberOfSongsPlayed, setNumberOfSongsPlayed] = React.useState<number>(1);


  useEffect(() => {
    if (playlist) {
      configureAudioPlayer();
    }
  }, [playlist, numberOfSongsPlayed]);

  //To add a shuffle, I will need to modify either useEffect of configureAudioPlayer
  //to make sure I don't change the song that is already playing.

  const configureAudioPlayer = () => {
    if (playlist.length > 0) {
      let tempSong = playlist.shift();
      setCurrentSong(tempSong ? tempSong : null);
      console.log("Current Song set to: ", currentSong);
      if (playlist.length > 0) {
        setNextSong(playlist[0]);
      } else {
        setNextSong(null);
      }
    } else {
      setCurrentSong(null);
      setNextSong(null);
    }
  };

  const handleSongEnd = () => {
    updateHistory(currentSong);
    setNumberOfSongsPlayed(numberOfSongsPlayed + 1);
  };

  return (
    <Group grow gap="md" align="stretch">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="sm">
          <Text fw={500} size="lg">
            Now Playing - {numberOfSongsPlayed}
          </Text>

          <div>
            <SongBox {...(currentSong ? currentSong : { title: "No song playing", artist: "", url: "" })} />
            <ReactAudioPlayer src={currentSong ? currentSong.url : ""} controls={true} onEnded={handleSongEnd} autoPlay={true} />
          </div>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="sm">
          <Text fw={500} size="lg">
            Up Next
          </Text>
          
          {/* Add your right container content here */}
          <div>
            <SongBox {...(nextSong ? nextSong : { title: "No song queued", artist: "", url: "" })} />
          </div>
        </Stack>
      </Paper>
    </Group>
  );
};

export default ContentSection;