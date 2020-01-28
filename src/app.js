const express = require('express')
const bodyParser = require('body-parser')
const MineSweeperGame = require('./minesweeper/game')
const NotFoundError = require('./minesweeper/errors/notFoundError')
const MineExplodedError = require('./minesweeper/errors/mineExplodedError')

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

//this should later disappear when we have list of games and even more when persistence is added
let game
app.post('/games', (req, res) => {
  const settings = req.body
  game = new MineSweeperGame(settings)
  res.setHeader('content-type', 'application/json')
  res.status(201)
  res.json(game)
})

app.get('/games/:gameId/board/cells/:coords', function (req, res, next) {
  const gameId = req.params.gameId
  const coords = JSON.parse(req.params.coords)
  res.setHeader('content-type', 'application/json')

  try {
    //this should later be replaced with a findGameById from a list of games
    if (game === undefined || gameId !== game.id) {
      throw new NotFoundError('Game not Found')
    }

    if (game.status === 'Lost') {
      res.status(409)
      res.json({ code: 409, message: 'You have already lost. Stop visiting cells.'})
    }

    game.board.visit(coords[0], coords[1])
    res.status(200)
    res.json(game)
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404)
      res.json({ code: 404, message: e.message })
    } else if (e instanceof MineExplodedError) {
      game.status = 'Lost'
      res.status(200)
      res.json({ code: 200, message: e.message })
    } else {
      res.status(500)
      res.json({ code: 500, message: e.message })
    }
  }
})

app.put('/games/:gameId/board/cells/:coords/flag', function (req, res, next) {
  if (game.status === 'Lost') {
    res.status(409)
    res.json({ code: 409, message: 'You have already lost. Stop flagging cells.'})
  }

  const gameId = req.params.gameId
  const coords = JSON.parse(req.params.coords)
  res.setHeader('content-type', 'application/json')

  try {
    //this should later be replaced with a findGameById from a list of games
    if (game === undefined || gameId !== game.id) {
      throw new NotFoundError('Game not Found')
    }
    game.board.flag(coords[0], coords[1])
    res.status(200)
    res.json(game)
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404)
      res.json({ code: 404, message: e.message })
    } else {
      res.status(500)
      res.json({ code: 500, message: e.message })
    }
  }
})
