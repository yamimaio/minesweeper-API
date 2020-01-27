const uuid = require('uuid')
require('../../src/minesweeper')

describe('If a new game is created', () => {
  test('with no parameters, then it must have default properties', () => {
    const anonymousId = 'testid'
    const v4Spy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId)
    const game = new MinesweeperGame()
    expect(v4Spy).toHaveBeenCalledTimes(1)
    expect(game.id).toEqual(anonymousId)
    expect(game.height).toBe(9)
    expect(game.width).toBe(9)
    expect(game.mines).toBe(10)
    expect(game.remainingMines).toBe(10)
    expect(game.status).toBe('New Game')
  })

  test('with parameters, then it must have given properties', () => {
    const anonymousId = 'testid'
    const v4Spy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId)
    const game = new MinesweeperGame(15, 20, 25)
    expect(v4Spy).toHaveBeenCalledTimes(1)
    expect(game.id).toEqual(anonymousId)
    expect(game.height).toBe(20)
    expect(game.width).toBe(15)
    expect(game.mines).toBe(25)
    expect(game.remainingMines).toBe(25)
    expect(game.status).toBe('New Game')
  })

  test('it must return have a corresponding size board', () => {
    const game = new MinesweeperGame()
    expect(game.board.height).toBe(20)
    expect(game.board.width).toBe(15)
    expect(game.board.mines).toBe(25)
    expect(game.getRemainingMines()).toBe(25)
    expect(game.getStatus).toBe('New Game')
  })
})