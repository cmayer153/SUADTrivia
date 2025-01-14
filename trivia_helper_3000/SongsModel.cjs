const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const Song = mongoose.model('Song', new mongoose.Schema({
      url: String,
      songTitle: String,
      artist: String,
      playlist: String
    }));

module.exports = Song;