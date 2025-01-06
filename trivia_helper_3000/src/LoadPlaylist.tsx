import React, { useState, useEffect } from 'react';
import { Box, List } from '@mantine/core';


interface LoadPlaylistProps {
    onClose: () => void;
}

const LoadPlaylist: React.FC<LoadPlaylistProps> = ({ onClose }) => {

    const [playlists, setPlaylists] = useState<string[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/playlists')
            .then(response => response.json())
            .then(data => {
                setPlaylists(data);
            })
            .catch(error => {
                console.error('Error fetching song list:', error);
            });
    }, []);


    const handlePlaylistClick = (playlist: string) => {
        setSelectedPlaylist(playlist);
    };
   

    return (
        <Box className="modal">
            <div className="modal-content">
                <h2>Select a Playlist</h2>
                <button style={{ color: 'white' }}>{selectedPlaylist}</button>
                <List>
                    {playlists.map((playlist, index) => (
                        <List.Item key={index} onClick={() => handlePlaylistClick(playlist)}>
                            {playlist.toString()}
                        </List.Item>
                    ))}
                </List>
                <button onClick={onClose} style={{ color: 'white' }}>Cancel</button>
            </div>
        </Box>
    );
};

export default LoadPlaylist;