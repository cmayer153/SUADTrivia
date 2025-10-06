import React from 'react';
import { Stack } from '@mantine/core';
import Header from './Header';
import ButtonRow from './ButtonRow';
import ContentSection from './ContentSection';
import ListSection from './ListSection';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MainPage = () => {
  let { location } = useParams();

  useEffect(() => {
    fetchPlaylistsByLocation(location);
  }, [location]);

  const fetchPlaylistsByLocation = (location: string | undefined) => {
    if (!location) return;
    fetch('http://localhost:3000/playlistsbylocation/' + location)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched playlists:', data);
        // Handle the fetched data as needed
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
  };

  return (
    <Stack spacing="lg" p="md">
      <Header />
      <ButtonRow />
      <ContentSection />
      <ListSection />
    </Stack>
  );
};

export default MainPage;