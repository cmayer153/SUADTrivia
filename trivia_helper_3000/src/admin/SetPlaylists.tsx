import React, { useEffect, useState } from 'react';
import { NativeSelect, Button, Container } from '@mantine/core';
import axios from 'axios';
import { SERVER_BASE } from '../api/urls';

const SetPlaylists: React.FC = () => {
    const [playlist, setPlaylist] = useState('');
    const [location, setLocation] = useState('');

    const [playlistData, setPlaylistData] = useState<string[]>([]);
    const [locationData, setLocationData] = useState<string[]>([]);


    useEffect(() => {
        axios.get(SERVER_BASE + '/api/songs/playlists/unique')
            .then(response => {
                console.log('Playlists:', response.data);
                setPlaylistData(response.data);
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
        axios.get(SERVER_BASE + '/api/locations/venuenames')
            .then(response => {
                console.log('Locations:', response.data);
                setLocationData(response.data);
            }
            )
            .catch(error => {
                console.error('Error fetching locations:', error);
            }
            );
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(SERVER_BASE + '/api/set-playlist', { playlist, location });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Container>
            <NativeSelect
                data={playlistData}
                label="Select Playlist"
                value={playlist}
                onChange={(event) => setPlaylist(event.currentTarget.value)}
            />
            <NativeSelect
                data={locationData}
                label="Select Location"
                value={location}
                onChange={(event) => setLocation(event.currentTarget.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </Container>
    );
};

export default SetPlaylists;