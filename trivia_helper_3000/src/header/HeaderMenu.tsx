import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import LoadPlaylist from './LoadPlaylistModal';
import LoadLocation from './LoadLocationModal';

import classes from './HeaderMenu.module.css';


import logo from "/src/assets/Designer.jpeg";

/*
interface Props {
  setPlaylist: (playlist: string) => void;
}
  */

export function HeaderMenu() {
  //const [opened, { toggle }] = useDisclosure(false);
  const [loadPlaylistModalOpened, { open: openLoadPlaylistModal, close: closeLoadPlaylistModal }] = useDisclosure(false);
  const [loadLocationModalOpened, { open: openLoadLocationModal, close: closeLoadLocationModal }] = useDisclosure(false);
  const navigate = useNavigate();

  const loadLocationModalBody = (
    <div className="loadLocationModalBody">
      <LoadLocation onClose = {closeLoadLocationModal} ></LoadLocation>
    </div>
  )

  const loadPlaylistModalBody = (
    <div className="loadPlaylistModalBody">
      <LoadPlaylist onClose = {closeLoadPlaylistModal} ></LoadPlaylist>
    </div>
  )

  return (
    <>
      <header className={classes.header}>

        <img src={logo} alt="Designer" className={classes.designerImage} />
        <div>
          <Button onClick={()=>navigate('/admin')} className={classes.button}>Admin</Button>
        </div>
        <div>
          <Button onClick={()=>openLoadLocationModal()} className={classes.button}>Load Location</Button>
        </div>
        <div>
          <Button onClick={()=>openLoadPlaylistModal()} className={classes.button}>Load Playlist</Button>
        </div>
      </header>

      <Modal opened={loadLocationModalOpened} onClose={closeLoadLocationModal} className={classes.modal} size="md" >
        {loadLocationModalBody}
      </Modal>
      <Modal opened={loadPlaylistModalOpened} onClose={closeLoadPlaylistModal} className={classes.modal} size="md" >
        {loadPlaylistModalBody}
      </Modal>
    </>
  );
}