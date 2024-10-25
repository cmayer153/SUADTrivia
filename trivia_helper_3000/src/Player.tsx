import ReactPlayer from 'react-player/file';
import SongDetails from './SongDetails';
import { Button } from '@mantine/core';

export default function Player(song: SongDetails) {
    return (
        <div>
            <ReactPlayer url={song.url} controls={true} />
            <Button>Next</Button>
        </div>
    );
}