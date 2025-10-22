import React, { useState, useEffect } from 'react';
import { Box, List } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE } from '../api/urls';


interface LoadLocationProps {
    onClose: () => void;
}

const LoadLocation: React.FC<LoadLocationProps> = ({ onClose }) => {

    const [locations, setLocations] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(SERVER_BASE + '/api/locations/venuenames')
            .then(response => response.json())
            .then(data => {
                let tempLocations: string[] = data.map((loc: any) => loc.venueName);
                setLocations(tempLocations);
            })
            .catch(error => {
                console.error('Error fetching  locations:', error);
            });
    }, []);


    const handleLocationClick = (location: string) => {
        setSelectedLocation(location);
    };
   

    return (
        <Box className="modal">
            <div className="modal-content">
                <h2>Select a Location</h2>
                <button style={{ color: 'white' }} onClick={() => navigate('/location/' + selectedLocation)}>{selectedLocation}</button>
                <List>
                    {locations.map((location, index) => (
                        <List.Item key={index} onClick={() => handleLocationClick(location)}>
                            {location.toString()}
                        </List.Item>
                    ))}
                </List>
                <button onClick={onClose} style={{ color: 'white' }}>Cancel</button>
            </div>
        </Box>
    );
};

export default LoadLocation;