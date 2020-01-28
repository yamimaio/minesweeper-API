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
const NotFoundError = require('../../src/minesweeper/errors/notFoundError')
const MineExplodedError = require('../../src/minesweeper/errors/mineExplodedError')

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
    const noMineCell = new Cell({ id: 0, x: 8, y: 8 })
    const mineCell = new Cell({ id: 0, x: 8, y: 8 })
    mineCell.mine = true
    const board = new Board({ width: 3, height: 3, mines: 3 })
    board.cells = [
      [mineCell, mineCell, noMineCell],
      [noMineCell, noMineCell, noMineCell],
      [noMineCell, mineCell, noMineCell]
    ]
    expect(board.getAdjacentMines(0, 0)).toBe(1)
    expect(board.getAdjacentMines(0, 1)).toBe(1)
    expect(board.getAdjacentMines(0, 2)).toBe(1)
    expect(board.getAdjacentMines(1, 0)).toBe(3)
    expect(board.getAdjacentMines(1, 1)).toBe(3)
    expect(board.getAdjacentMines(1, 2)).toBe(2)
    expect(board.getAdjacentMines(2, 0)).toBe(1)
    expect(board.getAdjacentMines(2, 1)).toBe(0)
    expect(board.getAdjacentMines(2, 2)).toBe(1)
  })
})

describe('Visit cell should', () => {
  test('throw error if cell does not exist', () => {
    const board = new Board({ width: 3, height: 3, mines: 3 })
    expect(() => {board.visit(9, 9)}).toThrow(NotFoundError)
  })

  test('throw error if cell has a mine', () => {
    //all cells have mines
    const board = new Board({ width: 3, height: 3, mines: 9 })
    expect(() => {board.visit(2, 2)}).toThrow(MineExplodedError)
  })

  test('should set number of adjacent mines if cell has no mine', () => {
    const board = new Board({ width: 3, height: 3, mines: 0 })
    board.visit(2, 2)
    expect(board.getCell(2, 2).adjacentMines).toBe(0)
  })
})

describe('Flag cell should', () => {
  test('if no flag, set flag to true and reduce remainingMines number', () => {
    //all cells have mines
    const board = new Board({ width: 3, height: 3, mines: 9 })
    board.flag(2, 2)
    expect(board.getCell(2, 2).flag).toBe(true)
    expect(board.remainingMines).toBe(8)
  })

  test('if flag, set flag to false and increase remainingMines number', () => {
    //all cells have mines
    const board = new Board({ width: 3, height: 3, mines: 9 })
    board.flag(2, 2)
    board.flag(2, 2)
    expect(board.getCell(2, 2).flag).toBe(false)
    expect(board.remainingMines).toBe(9)
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

describe('Board Complete should', () => {
  test('return false if mines are still not flagged', () => {
    const board = new Board({ width: 1, height: 1, mines: 1 })
    expect(board.isComplete()).toBe(false)
  })

  test('return false if all mines are flagged but cells are not revealed', () => {
    const board = new Board({ width: 2, height: 1, mines: 1 })
    const noMineCell = new Cell({ id: 0, x: 8, y: 8 })
    const mineCell = new Cell({ id: 0, x: 0, y: 8 })
    mineCell.mine = true
    mineCell.flag = true
    board.remainingMines = 0
    board.cells = [
      [mineCell, noMineCell]
    ]
    expect(board.isComplete()).toBe(false)
  })

  test('return true if all mines are flagged and all cells are revealed', () => {
    const board = new Board({ width: 2, height: 1, mines: 1 })
    const noMineCell = new Cell({ id: 0, x: 8, y: 8 })
    const mineCell = new Cell({ id: 0, x: 0, y: 8 })
    mineCell.mine = true
    mineCell.flag = true
    noMineCell.adjacentMines = 1
    board.remainingMines = 0
    board.cells = [
      [mineCell, noMineCell]
    ]
    expect(board.isComplete()).toBe(true)
  })
})
