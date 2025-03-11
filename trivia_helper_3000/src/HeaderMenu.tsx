//import { useDisclosure } from '@mantine/hooks';
import { Button } from '@mantine/core';
import classes from './HeaderMenu.module.css';


import logo from "./assets/Designer.jpeg";

/*
interface Props {
  setPlaylist: (playlist: string) => void;
}
  */

export function HeaderMenu() {
  //const [opened, { toggle }] = useDisclosure(false);
  //const [uploadSongsModalOpened, { open: openUploadSongsModal, close: closeUploadSongsModal }] = useDisclosure(false);
  //const [loadPlaylistModalOpened, { open: openLoadPlaylistModal, close: closeLoadPlaylistModal }] = useDisclosure(false);


  return (
    <>
      <header className={classes.header}>

        <img src={logo} alt="Designer" className={classes.designerImage} />
        <div>
          <Button className={classes.button}>Upload Songs</Button>
        </div>
      </header>

    </>
  );
}