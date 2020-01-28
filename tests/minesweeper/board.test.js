/**
 id: unique identifier for a game
 width: number of cols the board has
 height: number of cells the board has
 mines: number of total mines
 remainingMines: number of remaining mines to uncover
 cells: 2D array of board cells
 **/
const Board = require('../../src/minesweeper/board')
const Cell = require('../../src/minesweeper/cell')

describe('If a new board is created', () => {
  test('it should result in collections of rxc cells with the correct number of mines.' +
    'flag must be false for all mines, adjacent mines should be undefined for all', () => {
    const board = new Board({ width: 9, height: 9, mines: 10 })
    expect(board.height).toBe(9)
    expect(board.width).toBe(9)
    expect(board.mines).toBe(10)
    expect(board.remainingMines).toBe(10)
    expect(board.cells.length).toBe(9)
    let mineCount = 0
    board.cells.forEach(row => {
      expect(row.length).toBe(9)
      row.forEach(cell => {
        expect(cell).toBeInstanceOf(Cell)
        expect(cell.flag).toBe(false)
        expect(cell.adjacentMines).toBe(undefined)
        if (cell.mine) mineCount++
      })
    })
    expect(mineCount).toBe(10)
  })
})

describe('When getCell is called', () => {
  test('it should return correct cell', () => {
    const board = new Board({ width: 3, height: 3, mines: 9 })
    expect(board.getCell(2, 2)).toBe(board.cells[2][2])
  })
})

describe('When getAdjacentMines is called', () => {
  test('it should correctly calculate number of adjacent mines when present', () => {
    const noMineCell = new Cell()
    const mineCell = new Cell()
    mineCell.mine = true
    const grid = [
      [mineCell, mineCell, noMineCell],
      [noMineCell, noMineCell, noMineCell],
      [noMineCell, mineCell, noMineCell]
    ]
    const adjacentMines = getAdjacentMines(grid)
    expect(adjacentMines).toBe(3)
  })

  test('it should return 0 if no adjacent mines', () => {
    const noMineCell = new Cell()
    const grid = [
      [noMineCell, noMineCell, noMineCell],
      [noMineCell, noMineCell, noMineCell],
      [noMineCell, noMineCell, noMineCell]
    ]
    const adjacentMines = getAdjacentMines(grid)
    expect(adjacentMines).toBe(0)
  })
})

describe('Visit cell should', () => {
  test('throw error if cell does not exist', () => {
    const board = new Board('testId', 9, 9, 10)
    board.visit(9, 9).toThrowError(NotFoundError)
  })

  test('throw error if cell has a mine', () => {
    //all cells have mines
    const board = new Board('testId', 3, 3, 9)
    board.visit(2, 2).toThrowError(MineExplodedError)
  })

  test('should set number of adjacent mines if cell has no mine', () => {
    const board = new Board('testId', 3, 3, 0)
    board.visit(2, 2)
    expect(board.getCell(2, 2).adjacentMines).not.toBe(undefined)
  })
})

describe('Flag cell should', () => {
  test('set flag to true and change remainingMines number', () => {
    //all cells have mines
    const board = new Board('testId', 3, 3, 9)
    board.flag(2, 2)
    expect(board.getCell(2, 2).flag).toBe(true)
    expect(board.remainingMines).toBe(8)
  })
})

describe('Find cell should', () => {
  test('given an id return the corresponding Cell', () => {
    const board = new Board({ width: 3, height: 3, mines: 9 })
    const cell = board.findCell(5)
    expect(cell).toBeInstanceOf(Cell)
    expect(cell.x).toBe(1)
    expect(cell.y).toBe(2)
  })
})
