/**
 id: unique identifier for a cell
 x: row
 y: col
 mine: true/false (has mine?)
 adjacentMines: number of adjacent mines
 flag: true/false (has been flagged as mine)
 */
const Cell = require('../../src/minesweeper/cell');

describe('If a new cell is created it should', () => {
  test('have correct values', () => {
    const cell = new Cell({id: 0, x: 8, y: 8})
    expect(cell.id).toBe(0)
    expect(cell.x).toBe(8)
    expect(cell.y).toBe(8)
    expect(cell.mine).toBe(false)
    expect(cell.adjacentMines).toBe(undefined)
    expect(cell.flag).toBe(false)
  })
})