import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import classes from './HeaderMenu.module.css';
import UploadSongs from './UploadSongs';
import LoadPlaylist from './LoadPlaylist';
import logo from "./assets/Designer.jpeg";


interface Props {
  setPlaylist: (playlist: string) => void;
}

export function HeaderMenu(props: Props) {
  //const [opened, { toggle }] = useDisclosure(false);
  const [uploadSongsModalOpened, { open: openUploadSongsModal, close: closeUploadSongsModal }] = useDisclosure(false);
  const [loadPlaylistModalOpened, { open: openLoadPlaylistModal, close: closeLoadPlaylistModal }] = useDisclosure(false);



  const uploadModalBody = (
    <div className="uploadModalBody">
      <UploadSongs onClose = {closeUploadSongsModal}></UploadSongs>
    </div>
  )

  const loadPlaylistModalBody = (
    <div className="loadPlaylistModalBody">
      <LoadPlaylist onClose = {closeLoadPlaylistModal} setPlaylist = {props.setPlaylist}></LoadPlaylist>
    </div>
  )

  return (
    <>
    <header className={classes.header}>
      
      <img src={logo} alt="Designer" className={classes.designerImage} />
      <Button onClick={openUploadSongsModal}>Upload Songs</Button>
      <Button onClick={openLoadPlaylistModal}>Load Playlist</Button>
    </header>
    <Modal opened={uploadSongsModalOpened} onClose={closeUploadSongsModal} title="Menu" size="md" >
      {uploadModalBody}
    </Modal>
    <Modal opened={loadPlaylistModalOpened} onClose={closeLoadPlaylistModal} title="Menu" size="md" >
      {loadPlaylistModalBody}
    </Modal>
    </>
  );
}