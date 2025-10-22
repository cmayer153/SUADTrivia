//import React from 'react';
import { Stack } from '@mantine/core';
import Header from './Header';
import ButtonRow from './ButtonRow';
import ContentSection from './ContentSection';
import ListSection from './ListSection';
import SongDetails from '../../hosting/SongDetails';


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MainPage = () => {
  let { location } = useParams();

  let [playlists, setPlaylists] = useState({} as {playlist1: string, playlist2: string, playlist3: string, playlist4: string, playlist5: string, playlist6: string});
  let [currentPlaylist, setCurrentPlaylist] = useState<SongDetails[]>([]);
  let [playHistory, setPlayHistory] = useState<SongDetails[]>([]);

  useEffect(() => {
    fetchPlaylistsByLocation(location);
  }, [location]);

  const fetchPlaylistsByLocation = (location: string | undefined) => {
    if (!location) return;
    fetch('http://localhost:3000/api/locations/playlistsbylocation/' + location)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched playlists:', data);
        setPlaylists(data);
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
  };

  const fetchSongsByPlaylist = (playlist: string | undefined) => {
    if (!playlist) return;
    fetch('http://localhost:3000/api/songs/songsbyplaylist/' + playlist)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched songs:', data);
        shuffleSongs(data);
        setCurrentPlaylist(data);
        setPlayHistory([]); // Reset play history when loading a new playlist
        console.log("Current Playlist set to: ", currentPlaylist);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  };

  const shuffleSongs = (songs: SongDetails[]) => {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
  };


  const updateHistory = (lastPlayed: SongDetails | null) => {
    if (!lastPlayed) return;

    setPlayHistory([...playHistory, lastPlayed]);
    console.log("Play History updated: ", playHistory);
  };

  return (
    <Stack gap="lg" p="md">
      {/* Pass the location prop to Header */}
      <Header location={location} />
      <ButtonRow playlists={playlists} loadPlaylist={fetchSongsByPlaylist} />
      <ContentSection playlist={currentPlaylist} updateHistory={updateHistory} />
      <ListSection playHistory={playHistory} />
    </Stack>
  );
};

export default MainPage;