/**
 x: row
 y: col
 mine: true/false (has mine?)
 adjacentMines: number of adjacent mines
 flag: true/false (has been flagged as mine)
 */
module.exports = class Cell {
  constructor ({x, y}) {
    this.x = x
    this.y = y
    this.mine = false
    this.adjacentMines = undefined
    this.flag = false
  }
}