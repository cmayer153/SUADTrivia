const express = require('express');
const router = express.Router();
const cors = require('cors');
const LocationModel = require('../SQLite/LocationModel.cjs');
const SongModel = require('../SQLite/SongModel.cjs');

const Locations = new LocationModel();
const Songs = new SongModel();

router.use(cors());

// /api/songs/playlists/unique
// Get all unique playlist names
//TODO error checking
router.get('/playlists/unique', (req, res) => {
  const playlists = Songs.findAllPlaylists();
  res.json(playlists);
});

router.get('/playlistsbylocation/:location', (req, res) => {
  const location = req.params.location;
  const locationData = Locations.findByVenueName(location);
  if (!locationData) {
    return res.status(404).json({ error: 'Location not found' });
  }

  const playlistNames = [
    locationData.playlist1,
    locationData.playlist2,
    locationData.playlist3,
    locationData.playlist4,
    locationData.playlist5,
    locationData.playlist6
  ].filter(name => name); // Filter out any null or undefined names

  let songs = [];

  playlistNames.forEach(playlist => {
    const playlistSongs = Songs.findByPlaylist(playlist);
    songs = songs.concat(playlistSongs);
  });

  res.json(songs);
});


module.exports = router;