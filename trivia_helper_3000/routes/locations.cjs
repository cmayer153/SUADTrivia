const express = require('express');
const router = express.Router();
const cors = require('cors');
const LocationModel = require('../SQLite/LocationModel.cjs');

const Locations = new LocationModel();

router.use(cors());

// /api/locations

// Get all venue names
//TODO error checking
router.get('/venuenames', (req, res) => {
  const venueNames = Locations.findAllVenueNames();
  res.json(venueNames);
});

router.post('/addLocation', (req, res) => {
  const location = req.body;
  Locations.insert({venueName: location.location, 
    playlist1: "demo",
    playlist2: "demo",
    playlist3: "demo",
    playlist4: "demo",
    playlist5: "demo",
    playlist6: "demo"});
  res.status(200).send('Location added successfully.');
  //TODO error checking
  //.catch(err => res.status(500).send('Error adding location.'));

} );

router.get('/playlistsbylocation/:location', (req, res) => {
  const location = req.params.location;
  const playlists = Locations.findByVenueName(location);    
  res.json(playlists);
});

module.exports = router;