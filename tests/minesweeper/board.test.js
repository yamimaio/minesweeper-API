/**
 id: unique identifier for a game
 width: number of cols the board has
 height: number of cells the board has
 mines: number of total mines
 remainingMines: number of remaining mines to uncover
 cells: 2D array of board cells
 **/

test('Create board should result in a collections of rxc cells with the correct number of mines.' +
  'flag must be false for all mines, adjacent mines should be undefined for all', () => {
  const board = new Board('testId', 9, 9, 10)
  expect(board.id).toBe('testId');
  expect(board.height).toBe(9);
  expect(board.width).toBe(9);
  expect(board.mines).toBe(10);
  expect(board.remainingMines).toBe(10);
  expect(board.cells.length).toBe(9);
  let mineCount = 0
  board.cells.forEach(row => {
    expect(row.length).toBe(9)
    row.forEach(cell => {
        expect(cell.flag).toBe(false)
        expect(cell.adjacentMines).ToBe(undefined)
        if(cell.mine) mineCount++
      })
    })
  expect(mineCount).toBe(10)
});

test('getCell should return correct cell', () => {
  const board = new Board('testId', 3, 3, 9)
  expect(board.getCell(2,2)).toBe(board.cells[2][2])
});


test('getAdjacentMines should correctly calculate number of adjacent mines' +
  ' when present', () => {
  const noMineCell = new Cell()
  const mineCell = new Cell()
  mineCell.mine = true
  const grid = [
    [mineCell,  mineCell,  noMineCell],
    [noMineCell, noMineCell, noMineCell],
    [noMineCell, mineCell, noMineCell]
  ]
  const adjacentMines = getAdjacentMines(grid)
  expect(adjacentMines).toBe(3);
});

test('getAdjacentMines should return 0 if no adjacent mines', () => {
  const noMineCell = new Cell()
  const grid = [
    [noMineCell, noMineCell, noMineCell],
    [noMineCell, noMineCell, noMineCell],
    [noMineCell, noMineCell, noMineCell]
  ]
  const adjacentMines = getAdjacentMines(grid)
  expect(adjacentMines).toBe(0);
});

test('Visit cell should throw error if cell does not exist', () => {
  const board = new Board('testId', 9, 9, 10)
  board.visit(9,9).toThrowError(NotFoundError);
});

test('Visit cell should throw error if cell has a mine', () => {
  //all cells have mines
  const board = new Board('testId', 3, 3, 9)
  board.visit(2,2).toThrowError(MineExplodedError);
});

test('Visit cell should set number of adjacent mines if cell has no mine', () => {
  const board = new Board('testId', 3, 3, 0)
  board.visit(2,2)
  expect(board.getCell(2,2).adjacentMines).not.toBe(undefined)
});

test('Flag cell should set flag to true and change remainingMines number', () => {
  //all cells have mines
  const board = new Board('testId', 3, 3, 9)
  board.flag(2,2)
  expect(board.getCell(2,2).flag).toBe(true)
  expect(board.remainingMines).toBe(8)
});

