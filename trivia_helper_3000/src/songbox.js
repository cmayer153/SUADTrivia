import React from 'react';

const SongBox = ({ link, title }) => {
    return (
        <div className="song-box">
            <a href={link}>{title}</a>
        </div>
    );
};

export default SongBox;