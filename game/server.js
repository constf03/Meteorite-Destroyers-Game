const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// cors - allow connection from different domains and ports
app.use(cors());

// convert json string to json object (from request)
app.use(express.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('./public/index.html');
});

// app listen port 3000
app.listen(port, () => {
  console.log(`Meteorite Destroyers listening on http://localhost:${port}`);
});

// MongoDB
const mongoose = require('mongoose');
const mongoDB = process.env.URI
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected");
});

// route variables
const highscoreRoute = require("./routes/highscore");

// routes
app.use("/highscores", highscoreRoute);
