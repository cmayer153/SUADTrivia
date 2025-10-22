import ReactPlayer from 'react-player/file';
import SongDetails from './SongDetails';
import { Button } from '@mantine/core';

export default function Player(props: {song: SongDetails, next: () => void}) {
    return (
        <div>
            <ReactPlayer url={props.song.url} controls={true} />
            <h2>{props.song.title}</h2>
            <Button onClick={props.next}>Next</Button>
        </div>
    );
}