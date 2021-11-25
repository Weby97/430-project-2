const path = require('path');
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const unirest = require("unirest");
const controllers = require('./server/controllers');
const port = process.env.PORT || 3001;

// const API_KEY = "2acdd705-d8b4-4707-9493-41955ab453e9";

const dbURL = 'mongodb+srv://bl4720:Ny7EkSCaRITTT@cluster0.bvkwv.mongodb.net/Project2?retryWrites=true&w=majority';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const app = express();

// Check if this disable function is in the right spot
app.disable('x-powered-by');
app.use(compression());

// Middleware to help parse incoming requests with JSON payloads
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/getRandom', controllers.Note.getRandom);
app.post('/write', controllers.Note.make);
app.get('/',  (req, res) => {
  res.render('app');
});

// for any request that doesn't match one above, send back React's index.html file
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname+'/server/views/index.html'));
    res.render('app');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
