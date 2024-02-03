const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000
const ip = "127.0.0.1"

// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// app listen port 8000
app.listen(port, ip, () => {
  console.log('Example app listening on http://' + ip + ":" + port)
})

// mongo here
const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://ac9669:salasana@democluster2.vsyignr.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("MongoDB connected")
})

const hsSchema = new mongoose.Schema({
  hs: { type: String, required: true } 
})

// model
const HighScore = mongoose.model('HighScore', hsSchema, 'highscores')

//POST
app.post('/highscores', async (request, response) => {
  const { hs } = request.body
  const highscore = new HighScore({
    hs: hs
  })
  const savedHighScore = await highscore.save()
  response.json(savedHighScore)  
})

  //GET
app.get('/highscores', async (request, response) => {
  const highscores = await HighScore.find({})
  response.json(highscores)
})
  //GET (by id)
app.get('/highscores/:id', async (request, response) => {
  const highscore = await HighScore.findById(request.params.id)
  if (highscore) response.json(highscore)
  else response.status(404).end()
})