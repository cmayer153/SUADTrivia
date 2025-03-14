import { Tabs } from '@mantine/core';
import UploadSongs from './UploadSongs';
import AddLocation from './AddLocation';
import SetPlaylists from './SetPlaylists';

export function AdminContainer() {
    return (
        <Tabs defaultValue="setPlaylists">
            <Tabs.List>
                <Tabs.Tab value="setPlaylists">
                    Set Playlists
                </Tabs.Tab>
                <Tabs.Tab value="uploadSongs">
                    Upload Songs
                </Tabs.Tab>
                <Tabs.Tab value="addLocation">
                    Add Location
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="setPlaylists">
                <SetPlaylists />
            </Tabs.Panel>
            <Tabs.Panel value="uploadSongs">
                <UploadSongs />

            </Tabs.Panel>
            <Tabs.Panel value="addLocation">
                <AddLocation />
            </Tabs.Panel>

        </Tabs>
    );
}