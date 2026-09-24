import React, { useState } from 'react';
import { Box } from '@mantine/core';
import { useApi } from '../api/useApi';

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
    const apiFetch = useApi();


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

            apiFetch('/upload', {
                method: 'POST',
                body: formData,
            })
                .then(async response => {
                    // Server replies with plain text on success and JSON on
                    // 401/403, so read text and branch on status rather than
                    // assuming JSON.
                    const body = await response.text();
                    if (!response.ok) {
                        throw new Error(`Upload failed (${response.status}): ${body}`);
                    }
                    console.log('Upload successful:', body);
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
                <button onClick={handleUpload} style={{ color: 'white' }}>Upload</button>
            </div>
        </Box>
    );
};

export default UploadSongs;