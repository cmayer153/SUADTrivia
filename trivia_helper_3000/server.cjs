const express = require('express');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { url } = require('inspector');
const app = express();
const cors = require('cors');
const port = 3000;
const dotenv = require('dotenv');

const SongModel = require('./SQLite/SongModel.cjs');
const LocationModel = require('./SQLite/LocationModel.cjs');

const Songs = new SongModel();
const Locations = new LocationModel();

//TODO still need to configure dotenv
// Load env
require('dotenv').config();


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json());

app.use('/api/locations', require('./routes/locations.cjs'));
app.use('/api/songs', require('./routes/songs.cjs'));
  
  //FOR TESTING
  app.use(cors());

  //TODO how does multer have the credentials to upload to DO?
// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'trivia',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('songs', 5);
  
  app.post('/upload', upload, (req, res) => {
    const content = req.files;

    const parseFileName = (fileName) => {
      const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
      let tempSplit = fileNameWithoutExtension.split('_');
      const playlist = tempSplit[0];
      const artist = tempSplit[1];
      const songTitle = tempSplit[2];

      return {
        playlist: playlist,
        songTitle: songTitle,
        artist: artist
      };

    };

    const newSong = content.map(file => {
      const parsed = parseFileName(file.originalname);

      return {
        url: "https://trivia.sfo3.digitaloceanspaces.com/" + encodeURIComponent(file.originalname),
        title: parsed.songTitle,
        artist: parsed.artist,
        playlist: parsed.playlist
      };
    });
    
    //How to check if multer was successful?

    //if (!req.files) {
    //  return res.status(400).send('No file uploaded.');
    //}


    //newsong is an array, so need to insert each one

    Songs.insert(newSong);

    //TODO error checking
      
    res.status(200).send('Files uploaded successfully.');

  });


app.get('/playlists/:playlist', (req, res) => {
  const playlist = req.params.playlist;
  Song.find({ playlist: playlist })
    .then(songs => {
      res.status(200).json(songs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error fetching songs for playlist.' });
    });
});

/*
app.get('/playlistsbylocation/:location' (req, res) => {
  const location = req.params.location;
*/


app.post('/api/set-playlist', (req, res) => {
  const location = req.body.location;
  const playlist = req.body.playlist;
  Location.findOneAndUpdate
  (
    { locationName: location },
    { nextPlaylistName: playlist }
  )
  .then(() => res.status(200).send('Playlist set successfully.'))
  .catch(err => res.status(500).send('Error setting playlist.'));
}
);

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  // am I double hashing the password?
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashed});
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// AFTER app.use(cors()) add read-only API routes
app.get('/api/playlists', async (req, res) => {
  try {
    const names = await Song.distinct('playlist');
    res.json(names.sort());
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch playlists');
  }
});

app.get('/api/playlists/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const songs = await Song.find({ playlist: name }).sort({ songTitle: 1 });
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch songs');
  }
});


  //Fallback to index.html for SPA (Single Page Application)
  /*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist'));
});
*/

// SPA fallback for non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});