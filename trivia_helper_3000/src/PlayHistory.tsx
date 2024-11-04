import SongBox from "./SongBox";
import SongDetails from "./SongDetails";

export default function PlayHistory(props: {songs: SongDetails[]}) {
    return (
        <div>
        {props.songs.map((song) => (
            <SongBox {...song}/>
        ))}
        </div>
    );
}