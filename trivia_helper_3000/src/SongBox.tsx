import { Box } from '@mantine/core';
import SongDetails from './SongDetails';

function SongBox(songData: SongDetails ) {
  return (
    <Box>
      <h2>{songData.title}</h2>
      <h3>{songData.artist}</h3>
    </Box>
  );
}

export default SongBox;
