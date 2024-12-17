const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;
const mongoURI = 'mongodb://24.199.115.180:27017/testDatabase0';
const upload = multer({ dest: 'upload/' });

//dotenv for environment variables

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'dist')))

  
  

  app.post('/upload', upload.array('songs'),(req, res) => {
    const content = req.files;
    if (!req.files) {
      return res.status(400).send('No file uploaded.');
    }
    res.status(200).send('File uploaded successfully.');
  });

  /* Fallback to index.html for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});