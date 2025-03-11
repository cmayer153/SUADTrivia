import React, { useState } from 'react';
import { Box } from '@mantine/core';

/*
interface UploadSongsProps {
    onClose: () => void;
}
*/

//TODO mantine has an upload component, it might be better
// than using the stuff i have now

//TODO is void right here?
const UploadSongs: React.FC<{}> = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [playlist, setPlaylist] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handlePlaylistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylist(event.target.value);
    };

    const handleUpload = () => {
        if (selectedFiles) {
            // Perform upload logic here
            console.log('Uploading files:', selectedFiles);
            const formData = new FormData();
            Array.from(selectedFiles).forEach(file => {
                formData.append('songs', file);
                formData.append('playlist', playlist);
            });


            // Log FormData entries for debugging
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData, 
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Upload successful:', data);
                })
                .catch(error => {
                    console.error('Error uploading files:', error);
                });
        }
    };

    return (
        <Box className="modal">
            <div className="modal-content">
                <h2>Upload Songs</h2>
                <input type="file" multiple onChange={handleFileChange} />
                <input type="text" placeholder="Playlist" value={playlist} onChange={handlePlaylistChange} />
                <button onClick={handleUpload} style={{ color: 'white' }}>Upload</button>
            </div>
        </Box>
    );
};

export default UploadSongs;