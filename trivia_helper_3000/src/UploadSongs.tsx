import React, { useState } from 'react';
import { Box } from '@mantine/core';


interface UploadSongsProps {
    onClose: () => void;
}

const UploadSongs: React.FC<UploadSongsProps> = ({ onClose }) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = () => {
        if (selectedFiles) {
            // Perform upload logic here
            console.log('Uploading files:', selectedFiles);
            const formData = new FormData();
            Array.from(selectedFiles).forEach(file => {
                formData.append('songs', file);
            });


            // Log FormData entries for debugging
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            fetch('/upload', {
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
        onClose();
    };

    return (
        <Box className="modal">
            <div className="modal-content">
                <h2>Upload Songs</h2>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </Box>
    );
};

export default UploadSongs;