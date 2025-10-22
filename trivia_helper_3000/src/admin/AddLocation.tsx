import React, { useState } from 'react';

import { SERVER_BASE } from '../api/urls';

const AddLocation: React.FC = () => {
    const [location, setLocation] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(SERVER_BASE + '/api/locations/addLocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location }),
            });

            if (response.ok) {
                alert('Location added successfully!');
                setLocation('');
            } else {
                alert('Failed to add location.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the location.');
        }
    };

    return (
        <div>
            <h2>Add Location</h2>
            <input
                type="text"
                value={location}
                onChange={handleInputChange}
                placeholder="Enter location"
            />
            <button onClick={handleSubmit}>Add Location</button>
        </div>
    );
};

export default AddLocation;