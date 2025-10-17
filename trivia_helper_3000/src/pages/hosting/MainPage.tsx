//import React from 'react';
import { Stack } from '@mantine/core';
import Header from './Header';
import ButtonRow from './ButtonRow';
import ContentSection from './ContentSection';
import ListSection from './ListSection';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MainPage = () => {
  let { location } = useParams();

  let [playlists, setPlaylists] = useState([]);

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

  return (
    <Stack gap="lg" p="md">
      {/* Pass the location prop to Header */}
      <Header location={location} />
      <ButtonRow playlists={playlists} />
      <ContentSection />
      <ListSection />
    </Stack>
  );
};

export default MainPage;