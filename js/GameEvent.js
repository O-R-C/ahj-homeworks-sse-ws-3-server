const moment = require('moment')
const { v4: uuidv4 } = require('uuid')

/**
 * Represents a game event
 *
 * @class GameEvent
 * @param {{type: string, description: string}} options - options to create a game event
 * @property {string} type - type of the event
 * @property {string} description - description of the event
 * @property {string} id - unique id of the event
 * @property {string} date - date of the event
 */
class GameEvent {
  /**
   * Constructor
   *
   * @param {{type: string, description: string}} options - options to create a game event
   * @throws {Error} If type or description is not defined
   */
  constructor({ type, description }) {
    if (!type) {
      this.#throwError('Type must be defined')
    }
    if (!description) {
      this.#throwError('Description must be defined')
    }

    this.type = type
    this.description = description
    this.id = uuidv4()
    this.date = moment().format('HH:mm:ss DD.MM.YYYY')
  }

  /**
   * Throws an error
   *
   * @param {string} message - error message
   * @throws {Error} Error with the given message
   * @private
   */
  #throwError(message) {
    throw new Error(message)
  }
}

module.exports = GameEvent
