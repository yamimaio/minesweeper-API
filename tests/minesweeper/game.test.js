const uuid = require('uuid')
require('../../src/minesweeper')

test('Create game with no parameters must have default properties', () => {
  const anonymousId = 'testid';
  const v4Spy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const game = new MinesweeperGame()
  expect(v4Spy).toHaveBeenCalledTimes(1);
  expect(game.id).toEqual(anonymousId);
  expect(game.height).toBe(9);
  expect(game.width).toBe(9);
  expect(game.mines).toBe(10);
  expect(game.remainingMines).toBe(10);
  expect(game.status).toBe('New Game');
});

test('Create game with parameters must have given properties', () => {
  const anonymousId = 'testid';
  const v4Spy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const game = new MinesweeperGame(15,20,25)
  expect(v4Spy).toHaveBeenCalledTimes(1);
  expect(game.id).toEqual(anonymousId);
  expect(game.height).toBe(20);
  expect(game.width).toBe(15);
  expect(game.mines).toBe(25);
  expect(game.remainingMines).toBe(25);
  expect(game.status).toBe('New Game');
});