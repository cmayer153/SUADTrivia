const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;
const mongoURI = 'mongodb://24.199.115.180:27017/testDatabase0';

//dotenv for environment variables

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'dist')))

  /* Fallback to index.html for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});