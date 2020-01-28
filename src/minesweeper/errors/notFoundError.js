module.exports = class NotFound extends Error {
  constructor (message = 'Cell not found') {
    super(message)
    this.code = 404
  }
}