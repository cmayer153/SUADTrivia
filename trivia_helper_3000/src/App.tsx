import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Grid } from '@mantine/core';
import Player from './Player';
import SongDetails from './SongDetails';
import './App.css'
import Playlist from './Playlist';
import demoSongs from './demo_songs';
import PlayHistory from './PlayHistory';

function App() {
  //const [count, setCount] = useState(0);
  const [currentSong, setCurrentSong] = useState<SongDetails>({
      title: "Tupelo Honey",
      artist: "Van Morrison",
      url: "https://trivia.sfo3.cdn.digitaloceanspaces.com/13%20-%20Tupelo%20Honey.mp3"
  });
  const [history, setHistory] = useState<SongDetails[]>([]);

  const next = () => {
      const nextSong = (demoSongs.shift());
      if (nextSong) {
          setCurrentSong(nextSong);
          setHistory([currentSong, ...history]);
      }
  }


  return (
    <MantineProvider>
      {
        <Grid className="playlist-grid" columns={4} grow={true}>
      <Grid.Col span={'auto'} className="bordered-column"><PlayHistory songs={history}/></Grid.Col>
      <Grid.Col span={2} className="bordered-column"><Player song={currentSong} next={next}/></Grid.Col> 
      <Grid.Col span={'auto'} className="bordered-column"><Playlist songs={demoSongs}/></Grid.Col>
    </Grid>
      }
    </MantineProvider>


  )
}

export default App


