const express = require("express")

const HighScore = require("../models/highscore_model");

router = express.Router();

router.post('/', async (request, response) => {
    const { highscore } = request.body;
    const hs = new HighScore({
      highscore: highscore
    })
    const savedHighScore = await hs.save();
    response.json(savedHighScore);
});

//GET
router.get('/', async (request, response) => {
    const highscore = await HighScore.find({});
    response.json(highscore);
})

module.exports = router;
