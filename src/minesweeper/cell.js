/**
 id: int
 x: row
 y: col
 mine: true/false (has mine?)
 adjacentMines: number of adjacent mines
 flag: true/false (has been flagged as mine)
 */
module.exports = class Cell {
  constructor ({id, x, y}) {
    this.id = id
    this.x = x
    this.y = y
    //this.mine = false
    //For playing via API purposes without mine spoiler when stringifying
    Object.defineProperty(this, 'mine', { value: false, writable: true });
    this.adjacentMines = undefined
    this.flag = false
  }
}