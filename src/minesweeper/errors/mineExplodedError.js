module.exports = class MineExplodedError extends Error {
  constructor () {
    super('Mine Exploded! You lose.')
    this.code = 200
  }
}