//import React from 'react';
import { Stack } from '@mantine/core';
import Header from './Header';
import ButtonRow from './ButtonRow';
import ContentSection from './ContentSection';
import ListSection from './ListSection';
import SongDetails from '../../hosting/SongDetails';
import SongBox from '../../hosting/SongBox';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MainPage = () => {
  let { location } = useParams();

  let [playlists, setPlaylists] = useState([]);
  let [currentPlaylist, setCurrentPlaylist] = useState<SongDetails[]>([]);

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
        setCurrentPlaylist(data);
        console.log("Current Playlist set to: ", currentPlaylist);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  };

  return (
    <Stack gap="lg" p="md">
      {/* Pass the location prop to Header */}
      <Header location={location} />
      <ButtonRow playlists={playlists} loadPlaylist={fetchSongsByPlaylist} />
      <ContentSection playlist={currentPlaylist} />
      <ListSection />
    </Stack>
  );
};

export default MainPage;