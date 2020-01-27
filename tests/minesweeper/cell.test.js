/**
 id: unique identifier for a cell
 x: row
 y: col
 mine: true/false (has mine?)
 adjacentMines: number of adjacent mines
 flag: true/false (has been flagged as mine)
 */
test('Create cell should have correct default values', () => {
  const cell = new Cell('testId', 8, 8)
  expect(cell.id).toBe('testId');
  expect(cell.x).toBe(8);
  expect(cell.y).toBe(8);
  expect(cell.mine).toBe(false);
  expect(cell.adjacentMines).toBe(undefined);
  expect(cell.flag).toBe(false);
});