import React from 'react';
import { Stack } from '@mantine/core';
import Header from './Header';
import ButtonRow from './ButtonRow';
import ContentSection from './ContentSection';
import ListSection from './ListSection';

const MainPage = () => {
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