import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Grid } from '@mantine/core';
import Player from './Player';
import SongDetails from './SongDetails';
import './App.css'
import Playlist from './Playlist';
import demoSongs from './demo_songs';

function App() {
  const [count, setCount] = useState(0);
  const [currentSong, setCurrentSong] = useState<SongDetails>({
      title: "Tupelo Honey",
      artist: "Van Morrison",
      url: "https://trivia.sfo3.cdn.digitaloceanspaces.com/13%20-%20Tupelo%20Honey.mp3"
  });


  return (
    <MantineProvider>
      {
        <Grid className="playlist-grid" columns={4} grow={true}>
      <Grid.Col span={'auto'} className="bordered-column">100000000</Grid.Col>
      <Grid.Col span={2} className="bordered-column"><Player {...currentSong}/></Grid.Col> 
      <Grid.Col span={'auto'} className="bordered-column"><Playlist songs={demoSongs}/></Grid.Col>
    </Grid>
      }
    </MantineProvider>


  )
}

export default App


