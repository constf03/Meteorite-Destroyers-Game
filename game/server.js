const express = require('express') 
const cors = require('cors')
const app = express()
const port = 8000

// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


// mongo here...
const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://ac9669:salasana@democluster2.vsyignr.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("MongoDB connected")
})


// app listen port 8000
app.listen(port, () => {
  console.log('Example app listening on port http://localhost:8000')
})