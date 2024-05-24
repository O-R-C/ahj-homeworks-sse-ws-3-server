const ArrayStorage = require('./ArrayStorage')

class GameReport extends ArrayStorage {
  #listeners = []

  listen(listener) {
    this.#listeners.push(listener)
  }

  push(item) {
    super.push(item)
    this.#listeners.forEach((listener) => listener(item))
  }
}

module.exports = GameReport
