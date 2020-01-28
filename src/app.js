const express = require('express')
const bodyParser = require('body-parser')
const MineSweeperGame = require('./minesweeper')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

app.get('/', (req, res) => {
  res.send('Welcome to Minesweeper. POST to /games to start a new game')
})

app.post('/games', (req, res) => {
  const settings = req.body
  const game = new MineSweeperGame(settings)
  res.setHeader('content-type', 'application/json')
  res.status(201)
  res.json(game)
})