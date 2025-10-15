import { Grid } from '@mantine/core';
import Player from './Player';
import Playlist from './Playlist';
import PlayHistory from './PlayHistory';
import { useEffect, useState } from 'react';
import SongDetails from './SongDetails';
import { useParams } from 'react-router-dom';
import demoSongs from './demo_songs';
import { SERVER_BASE } from '../api/urls';

export function HostContainer() {
    let { location, playlistName } = useParams();
    const [currentSong, setCurrentSong] = useState<SongDetails>({
        songTitle: "Tupelo Honey",
        artist: "Van Morrison",
        url: "https://trivia.sfo3.cdn.digitaloceanspaces.com/13%20-%20Tupelo%20Honey.mp3"
    });

    const [history, setHistory] = useState<SongDetails[]>([]);
    const [playlist, setPlaylist] = useState<SongDetails[]>(demoSongs);

    useEffect(() => {
        fetchSongsinPlaylist();
    }, [location, playlistName]);
    
    const next = () => {
        const nextSong = (playlist.shift());
        if (nextSong) {
            setCurrentSong(nextSong);
            setHistory([currentSong, ...history]);
        }
    }

    const fetchSongsinPlaylist = () => {
        if (!playlistName) {
          fetch('http://localhost:3000/playlistbylocation/' + location)
          .then(response => response.json())
          .then(data => {
            setCurrentSong(data.shift());
            setPlaylist(data);
            //next();
          })
          .catch(error => {
            console.error('Error fetching song list:', error);
          });
        } else {
          fetch('http://localhost:3000/playlists/' + playlistName)
          .then(response => response.json())
          .then(data => {
            setCurrentSong(data.shift());
            setPlaylist(data);
            //next();
          })
          .catch(error => {
            console.error('Error fetching song list:', error);
          });
        }
      }

  return (
    <Grid className="playlist-grid" columns={4} grow={true}>
      <Grid.Col span={'auto'} className="bordered-column"><PlayHistory songs={history}/></Grid.Col>
      <Grid.Col span={2} className="bordered-column"><Player song={currentSong} next={next}/></Grid.Col> 
      <Grid.Col span={'auto'} className="bordered-column"><Playlist songs={playlist}/></Grid.Col>
    </Grid>

  );
}