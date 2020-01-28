/**
 width: number of cols the board has
 height: number of cells the board has
 mines: number of total mines
 remainingMines: number of remaining mines to uncover
 cells: 2D array of board cells
 **/

module.exports = class Board {
  constructor ({ width, height, mines}) {
    this.width = width
    this.height = height
    this.mines = mines
    this.remainingMines = mines
    this.cells = []
  }
}