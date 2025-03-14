import './SongBox.css';
import { Box } from '@mantine/core';
import SongDetails from './SongDetails';


function SongBox(songData: SongDetails ) {
  return (
    <Box className="SongBox">
      <h2>{songData.songTitle}</h2>
      <h3>{songData.artist}</h3>
    </Box>
  );
}

export default SongBox;
