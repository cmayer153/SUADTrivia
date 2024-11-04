import SongBox from "./SongBox";
import SongDetails from "./SongDetails";

function Playlist(props: {songs: SongDetails[]}) {
    return (
        <div>
        {props.songs.map((song) => (
            <SongBox {...song}/>
        ))}
        </div>
    );
}



export default Playlist;
