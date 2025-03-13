//import { useDisclosure } from '@mantine/hooks';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <>
      <header className={classes.header}>

        <img src={logo} alt="Designer" className={classes.designerImage} />
        <div>
          <Button onClick={()=>navigate('/admin')} className={classes.button}>Admin</Button>
        </div>
      </header>

    </>
  );
}