import SongBox from "./SongBox";
import SongDetails from "./SongDetails";

export default function PlayHistory(props: {songs: SongDetails[]}) {
    return (
        <>
        <h2>Play History</h2>
        <div>
        {props.songs.map((song) => (
            <SongBox {...song}/>
        ))}
        </div>
        </>
    );
}