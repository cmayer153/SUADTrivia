const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { url } = require('inspector');
const app = express();
const cors = require('cors');
const port = 3000;
const Song = require('./SongsModel.cjs');
const authOptions = require('./creds.cjs');
const mongoURI = 'mongodb://24.199.115.180:27017/testDatabase0';
//const mongoURI = 'mongodb://localhost:27017/suad_test_00';
//const upload = multer({ dest: 'upload/' });

//dotenv for environment variables


mongoose.connect(mongoURI, authOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'dist')))
  
  //FOR TESTING
  app.use(cors());

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
    const playlist = req.body;

    const parseFileName = (fileName) => {
      const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
      const parts = fileNameWithoutExtension.split('__');
      return {
        songTitle: parts[0],
        artist: parts[1] || 'Unknown Artist'
      };
    };

    const newSong = content.map(file => {
      const parsed = parseFileName(file.originalname);

      return {
        url: "https://trivia.sfo3.digitaloceanspaces.com/" + encodeURIComponent(file.originalname),
        songTitle: parsed.songTitle,
        artist: parsed.artist,
        playlist: playlist.playlist || 'Unknown Playlist'
      };
    });
    
    //How to check if multer was successful?

    //if (!req.files) {
    //  return res.status(400).send('No file uploaded.');
    //}

    Song.insertMany(newSong)
      .then(() => console.log('Files saved to MongoDB'))
      .catch(err => console.log(err));
      
    //res.status(200).send('File uploaded successfully.');

  });

  /* Fallback to index.html for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

app.get('/playlists', (req, res) => {
  Song.aggregate([
    {
      $group: {
        _id: "$playlist"
      }
    },
    {
      $project: {
        _id: 0,
        playlist: "$_id"
      }
    }
  ])
  .then(playlists => {
    playlistNames = playlists.map(playlist => playlist.playlist);
    res.status(200).json(playlistNames);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Error fetching unique playlists.' });
  });
  
 
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

app.get('/songs', (req, res) => {
  Song.find({}).then((songs) => {
    res.status(200).json(songs);
  });
  
  /*
  , (err, songs) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(songs);
  })
    */
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});