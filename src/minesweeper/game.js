/** id: unique identifier for a game
 board: link to associated board
 width: number of cols the board has
 height: number of cells the board has
 mines: number of total mines
 remainingMines: number of remaining mines to uncover
 status: game state (won, lost, in progress)**/

exports.createGame = ({width = 9, height = 9} = {}) => {
  return {
    width: width,
    height: height
  }
}