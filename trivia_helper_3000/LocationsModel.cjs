const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const Location = mongoose.model('Location', new mongoose.Schema({
      locationName: String,
      nextPlaylistName: String
    }));

module.exports = Location;