const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { url } = require('inspector');
const app = express();
const port = 3000;
//const mongoURI = 'mongodb://24.199.115.180:27017/testDatabase0';
const mongoURI = 'mongodb://localhost:27017/suad_test_00';
//const upload = multer({ dest: 'upload/' });

//dotenv for environment variables

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'dist')))

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
}).array('songs', 1);
  
  

  app.post('/upload', upload, (req, res) => {
    const content = req.files;
    const name = req.body;
    
    /*
    upload(req, res, (error) => {
      if (error) {
        console.error(error);
        return res
      }
    });
    */

    //How to check if multer was successful?

    //if (!req.files) {
    //  return res.status(400).send('No file uploaded.');
    //}

    
    const Song = mongoose.model('Song', new mongoose.Schema({
      url: String,
      songTitle: String,
      artist: String

    }));

    const newSong = content.map(file => ({
      url: "https://trivia.sfo3.digitaloceanspaces.com/" + file.originalname,
      songTitle: name.songTitles,
      artist: "temp"
    }));

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});