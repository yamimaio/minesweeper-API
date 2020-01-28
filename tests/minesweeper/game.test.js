const uuidv4 = require('uuid/v4');
const MinesweeperGame = require('../../src/minesweeper/game');

jest.mock('uuid/v4');  // <= auto-mock uuid/v4

describe('If a new game is created', () => {
  test('with no parameters, then it must have default properties', () => {
    uuidv4.mockReturnValue('testid')
    const game = new MinesweeperGame()
    expect(uuidv4).toHaveBeenCalled()
    expect(game.id).toEqual('testid')
    expect(game.height).toBe(9)
    expect(game.width).toBe(9)
    expect(game.mines).toBe(10)
    expect(game.status).toBe('New Game')
  })

  test('with parameters, then it must have given properties', () => {
    uuidv4.mockReturnValue('testid')
    const game = new MinesweeperGame({width: 15, height: 20, mines: 25})
    expect(uuidv4).toHaveBeenCalled()
    expect(game.id).toEqual('testid')
    expect(game.height).toBe(20)
    expect(game.width).toBe(15)
    expect(game.mines).toBe(25)
    expect(game.status).toBe('New Game')
  })

  test('it must return have a corresponding size board', () => {
    const game = new MinesweeperGame()
    expect(game.board.height).toBe(9)
    expect(game.board.width).toBe(9)
    expect(game.board.mines).toBe(10)
    expect(game.getRemainingMines()).toBe(25)
    expect(game.getStatus).toBe('New Game')
  })
})