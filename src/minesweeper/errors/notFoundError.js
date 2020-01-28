module.exports = class NotFound extends Error {
  constructor () {
    super('Cell not found')
    this.code = 404
  }
}