import React, { useEffect, useState } from 'react';
import { NativeSelect, Button, Container, Stack } from '@mantine/core';
import axios from 'axios';
import { SERVER_BASE } from '../api/urls';

const SetPlaylists: React.FC = () => {
    const [playlist1, setPlaylist1] = useState('');
    const [playlist2, setPlaylist2] = useState('');
    const [playlist3, setPlaylist3] = useState('');
    const [playlist4, setPlaylist4] = useState('');
    const [playlist5, setPlaylist5] = useState('');
    const [playlist6, setPlaylist6] = useState('');
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
                const locationNames = response.data.map((location: { venueName: string }) => location.venueName);
                setLocationData(locationNames);
            }
            )
            .catch(error => {
                console.error('Error fetching locations:', error);
            }
            );
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(SERVER_BASE + '/api/set-playlist', { 
                playlist1,
                playlist2,
                playlist3,
                playlist4,
                playlist5,
                playlist6,
                location
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Container>
            <Stack gap="md">
                <NativeSelect
                data={locationData}
                label="Select Location"
                value={location}
                onChange={(event) => setLocation(event.currentTarget.value)}
            />
            <NativeSelect
                data={['', ...playlistData]}
                label="Select Playlist 1"
                value={playlist1}
                onChange={(event) => setPlaylist1(event.currentTarget.value)}
            />
            <NativeSelect
                data={['', ...playlistData]}
                label="Select Playlist 2"
                value={playlist2}
                onChange={(event) => setPlaylist2(event.currentTarget.value)}
            />
            <NativeSelect
                data={['', ...playlistData]}
                label="Select Playlist 3"
                value={playlist3}
                onChange={(event) => setPlaylist3(event.currentTarget.value)}
            />
            <NativeSelect
                data={['', ...playlistData]}
                label="Select Playlist 4"
                value={playlist4}
                onChange={(event) => setPlaylist4(event.currentTarget.value)}
            />
            <NativeSelect
                data={['', ...playlistData]}
                label="Select Playlist 5"
                value={playlist5}
                onChange={(event) => setPlaylist5(event.currentTarget.value)}
            />
            <NativeSelect
                data={['', ...playlistData]}
                label="Select Playlist 6"
                value={playlist6}
                onChange={(event) => setPlaylist6(event.currentTarget.value)}
            />
            
            <Button onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Container>
    );
};

export default SetPlaylists;