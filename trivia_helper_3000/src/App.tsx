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
import { HeaderMenu } from './HeaderMenu';

function App() {
  //const [count, setCount] = useState(0);
  const [currentSong, setCurrentSong] = useState<SongDetails>({
      songTitle: "Tupelo Honey",
      artist: "Van Morrison",
      url: "https://trivia.sfo3.cdn.digitaloceanspaces.com/13%20-%20Tupelo%20Honey.mp3"
  });
  const [history, setHistory] = useState<SongDetails[]>([]);
  const [playlist, setPlaylist] = useState<SongDetails[]>(demoSongs);

  const next = () => {
      const nextSong = (playlist.shift());
      if (nextSong) {
          setCurrentSong(nextSong);
          setHistory([currentSong, ...history]);
      }
  }

  const fetchSongsinPlaylist = (playlistName: string) => {
    // fetch playlist from backend
    fetch('http://localhost:3000/playlists/' + playlistName)
    .then(response => response.json())
    .then(data => {
      setPlaylist(data);
      next();
    })
    .catch(error => {
      console.error('Error fetching song list:', error);
    });
    // setPlaylist(playlist)
  }


  return (
    <MantineProvider>
      {
        <div>
        <HeaderMenu setPlaylist={fetchSongsinPlaylist}/> 
        <Grid className="playlist-grid" columns={4} grow={true}>
      <Grid.Col span={'auto'} className="bordered-column"><PlayHistory songs={history}/></Grid.Col>
      <Grid.Col span={2} className="bordered-column"><Player song={currentSong} next={next}/></Grid.Col> 
      <Grid.Col span={'auto'} className="bordered-column"><Playlist songs={playlist}/></Grid.Col>
    </Grid>
    </div>
      }
    </MantineProvider>


  )
}

export default App