const mongoose = require("mongoose");

const hsSchema = new mongoose.Schema({
    highscore: {
        type: Number,
        required: true
    } 
  })
  
  // model
const HighScoreModel = mongoose.model('HighScore', hsSchema);
module.exports = HighScoreModel;