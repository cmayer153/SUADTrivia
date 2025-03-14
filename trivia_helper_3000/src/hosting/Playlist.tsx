import SongBox from "./SongBox";
import SongDetails from "./SongDetails";

function Playlist(props: {songs: SongDetails[]}) {
    return (
        <>
        <h2>Playlist</h2>
        <div>
        {props.songs.map((song) => (
            <SongBox {...song}/>
        ))}
        </div>
        </>
    );
}



export default Playlist;
