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

  deleteListener(listener) {
    this.#listeners = this.#listeners.filter((item) => item !== listener)
  }
}

module.exports = GameReport
