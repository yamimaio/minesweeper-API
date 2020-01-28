/** id: unique identifier for a game
 board: link to associated board
 width: number of cols the board has
 height: number of cells the board has
 mines: number of total mines
 remainingMines: number of remaining mines to uncover
 status: game state (won, lost, in progress)**/
const uuidv4 = require('uuid/v4')

module.exports = class MinesweeperGame {
  constructor ({ width = 9, height = 9, mines = 10 } = {}) {
    this.id = uuidv4()
    this.width = width
    this.height = height
    this.mines = mines
    this.board = undefined
    this.status = 'New Game'
  }

  getRemainingMines () {
    return this.board.remainingMines
  }
}