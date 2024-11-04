const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const mongoURI = 'mongodb://24.199.115.180:27017/testDatabase0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});