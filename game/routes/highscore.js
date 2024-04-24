const express = require("express")

const HighScore = require("../models/highscore_model");

router = express.Router();

// Post highscore
router.post('/', async (request, response) => {
    const { highscore } = request.body;
    const hs = new HighScore({
      highscore: highscore
    })
    const savedHighScore = await hs.save();
    response.json(savedHighScore);
});

// Delete highscore
router.delete('/:id', async (request, response) => {
  const deletedHighscore = await HighScore.findByIdAndDelete (request.params.id);
  if (deletedHighscore) response.json(deletedHighscore);
  else response.status(404).end();
});

// Get all highscores
router.get('/', async (request, response) => {
    const highscore = await HighScore.find({});
    response.json(highscore);
})

module.exports = router;
