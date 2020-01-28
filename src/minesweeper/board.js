/**
 width: number of cols the board has
 height: number of cells the board has
 mines: number of total mines
 remainingMines: number of remaining mines to uncover
 cells: 2D array of board cells
 **/
const Cell = require('./cell')
const NotFoundError = require('./errors/notFoundError')
const MineExplodedError = require('./errors/mineExplodedError')

module.exports = class Board {
  constructor ({ width, height, mines }) {
    this.width = width
    this.height = height
    this.mines = mines
    this.remainingMines = mines
    this.cells = this.generateBoardCells(width, height)

    this.populateMines(width * height, mines)
  }

  /**
   * Returns al cells of board
   * @param width
   * @param height
   * @param mines
   * @returns {[]}
   */
  generateBoardCells (width, height, mines) {
    const cells = []
    let id = 0
    for (let x = 0; x < height; x++) {
      let row = []
      for (let y = 0; y < width; y++) {
        row.push(new Cell({ id: id, x: x, y: y }))
        id++
      }
      cells.push(row)
    }

    return cells
  }

  /**
   * Randomly populates cells with given amount of mines
   * @param totalCells
   * @param mines
   */
  populateMines (totalCells, mines) {
    const numbers = [...Array(totalCells).keys()]
    numbers.sort(() => Math.random() - 0.5)
    const mineIds = numbers.slice(0, mines)

    mineIds.map(id => this.findCell(id).mine = true)
  }

  /**
   * Given an id, returns the corresponding cell
   * @param id
   * @returns Cell
   */
  findCell (id) {
    const x = Math.floor(id / this.width)
    const y = id % this.width
    return this.cells[x][y]
  }

  /**
   * Given coords, returns the cell
   * @param x
   * @param y
   * @returns Cell
   */
  getCell (x, y) {
    if (x < 0 || x > this.height - 1 || y < 0 || y > this.width - 1) {
      throw new NotFoundError()
    }
    return this.cells[x][y]
  }

  /**
   * Get's number of adjacent mines for a cell
   * @param x
   * @param y
   * @returns {number}
   */
  getAdjacentMines (x, y) {
    let mines = 0
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (this.cells[i] !== undefined && this.cells[i][j] !== undefined
          && !(i === x && j === y) //don't count own mine
          && this.cells[i][j].mine) {
          mines++
        }
      }
    }
    return mines
  }

  /**
   * Visits a cell and set number of adjacent cells
   * @throws NotFoundError if cell is not on board
   * @throws MineExplodedError if cell had a mine
   * @param x
   * @param y
   */
  visit (x, y) {
    const cell = this.getCell(x, y)
    if (cell.mine) {
      throw new MineExplodedError()
    }

    cell.adjacentMines = this.getAdjacentMines(x, y)
  }

}