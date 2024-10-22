import React from 'react';
import SongBox from './SongBox';

const SongList = ({ songs }) => {
    return (
        <ul>
            {songs.map((song, index) => (
                <li key={index}>
                    <SongBox song={song} />
                </li>
            ))}
        </ul>
    );
};

export default SongList;