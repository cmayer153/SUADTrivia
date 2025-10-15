const express = require('express');
const router = express.Router();
const LocationModel = require('../SQLite/LocationModel.cjs');

const Locations = new LocationModel();


// Get all venue names
//TODO error checking
router.get('/venuenames', (req, res) => {
  const venueNames = Locations.findAllVenueNames();
  res.json(venueNames);
});


module.exports = router;