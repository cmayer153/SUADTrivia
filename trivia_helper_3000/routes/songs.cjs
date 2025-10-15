const express = require('express');
const router = express.Router();
const LocationModel = require('../SQLite/LocationModel.cjs');
const SongModel = require('../SQLite/SongModel.cjs');

const Locations = new LocationModel();
const Songs = new SongModel();

// /api/songs/playlists/unique
// Get all unique playlist names
//TODO error checking
router.get('/playlists/unique', (req, res) => {
  const playlists = Songs.findAllPlaylists();
  res.json(playlists);
});