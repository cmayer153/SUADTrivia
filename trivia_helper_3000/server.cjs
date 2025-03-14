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
const Location = require('./LocationsModel.cjs');
const authOptions = require('./creds.cjs');
const mongoURI = 'mongodb://24.199.115.180:27017/testDatabase0';
//const mongoURI = 'mongodb://localhost:27017/suad_test_00';
//const upload = multer({ dest: 'upload/' });

//dotenv for environment variables


mongoose.connect(mongoURI, authOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'dist')))
  app.use(express.json());
  
  //FOR TESTING
  app.use(cors());

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

app.post('/api/addLocation', (req, res) => {
  const location = req.body;
  Location.insertMany({locationName: location.location, nextPlaylistName: "demo"})
  .then(() => res.status(200).send('Location added successfully.'))
  .catch(err => res.status(500).send('Error adding location.'));

} );

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
      /*  Old Parsing, not in line with new file naming convention
      const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
      const parts = fileNameWithoutExtension.split('__');
      return {
        songTitle: parts[0],
        artist: parts[1] || 'Unknown Artist'
      };
      */

      const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
      let tempSplit = fileNameWithoutExtension.split('_');
      const playlist = tempSplit[0];
      tempSplit = tempSplit[1].split('-');
      const trackNumber = tempSplit[0];
      const songTitle = tempSplit[1];

      return {
        playlist: playlist,
        trackNumber: trackNumber,
        songTitle: songTitle
      };

    };

    const newSong = content.map(file => {
      const parsed = parseFileName(file.originalname);

      return {
        url: "https://trivia.sfo3.digitaloceanspaces.com/" + encodeURIComponent(file.originalname),
        songTitle: parsed.songTitle,
        //artist: parsed.artist,
        artist: 'Unknown Artist',
        //playlist: playlist.playlist[0] || 'Unknown Playlist'
        playlist: parsed.playlist
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

  //Fallback to index.html for SPA (Single Page Application)
  /*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist'));
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

app.get('/locations', (req, res) => {
  Location.find({}, {locationName: 1, _id: 0})
    .then(locations => {
      locationNames = locations.map(location => location.locationName);
      res.status(200).json(locationNames);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error fetching locations.' });
    });
}
);

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

app.get('/playlistbylocation/:location', (req, res) => {
  const location = req.params.location;
  Location.find({ locationName: { $regex : new RegExp(location, "i") } })
    .then(loc => {
      const playlist = loc[0].nextPlaylistName;
      Song.find({ playlist: playlist })
        .then(songs => {
          res.status(200).json(songs);
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error fetching songs for location.' });
    });
});

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

//is this used?
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