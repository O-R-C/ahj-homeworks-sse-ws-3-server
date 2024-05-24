/**
 * Class for the report.
 * @class Report
 * @param {Object} storage - The storage object.
 * @param {Array} eventsData - The events data array.
 * @param {Object} GameEvent - The GameEvent class.
 * @throws {Error} If storage, eventsData, or GameEvent is not defined.
 */
class Report {
  #storage
  #events
  #GameEvent
  #gameTimer
  #reportInterval
  #durationInMinutes = 2

  /**
   * Constructor for the class.
   *
   * @param {Object} storage - The storage object.
   * @param {Array} eventsData - The events data array.
   * @param {Object} GameEvent - The GameEvent class.
   * @throws {Error} If storage, eventsData, or GameEvent is not defined.
   */
  constructor(storage, eventsData, GameEvent) {
    if (!storage) {
      this.#throwError('Storage must be defined')
    }
    if (!eventsData) {
      this.#throwError('Events data must be defined')
    }
    if (!GameEvent) {
      this.#throwError('GameEvent must be defined')
    }

    this.#storage = storage
    this.#events = eventsData
    this.#GameEvent = GameEvent
  }

  /**
   * Initializes the game.
   * @returns {void}
   */
  init() {
    this.#startGame()
  }

  /**
   * Starts the game.
   * @returns {void}
   */
  #startGame() {
    this.#resetGame()
    this.#gameStarted()
    this.#setGameTimer()
    this.#generateReport()
  }

  /**
   * Ends the game.
   * @returns {void}
   */
  #resetGame() {
    this.#stopGame()
    this.#stopReport()
    this.#resetReport()
  }

  /**
   * Stops the game.
   * @returns {void}
   */
  #stopGame() {
    if (this.#gameTimer) clearInterval(this.#gameTimer)
  }

  /**
   * Stops the report.
   * @returns {void}
   */
  #stopReport() {
    if (this.#reportInterval) clearInterval(this.#reportInterval)
  }

  /**
   * Clears the report.
   * @returns {void}
   */
  #resetReport() {
    this.#storage.clear()
  }

  /**
   * Sets the game timer.
   * @returns {void}
   */
  #setGameTimer() {
    const duration = this.#durationInMinutes * 60 * 1000
    this.#gameTimer = setTimeout(this.#endGame, duration)
  }

  #gameStarted() {
    this.#storage.push(new this.#GameEvent({ type: 'gameStarted', description: 'Игра началась' }))
  }

  #gameStopped() {
    this.#storage.push(new this.#GameEvent({ type: 'gameStopped', description: 'Игра закончилась' }))
  }

  /**
   * Generates a report every 2 seconds.
   * @returns {void}
   */
  #generateReport() {
    this.#reportInterval = setInterval(() => {
      const event = this.#getEvent()
      event && this.#storage.push(new this.#GameEvent(event))
    }, 2000)
  }

  /**
   * Gets a event if it is successful.
   * @returns {Object} The random event object.
   */
  #getEvent() {
    const event = this.#getRandomEvent()

    if (!this.#isSuccessful(event)) return

    return event
  }

  /**
   * Gets a random index from the storage array.
   * @returns {number} The random index.
   */
  #getRandomIndex() {
    const { length } = this.#events
    const random = Math.random() * length
    const index = Math.floor(random)
    return index
  }

  /**
   * Gets a random event from the events array.
   * @returns {Object} The random event object.
   */
  #getRandomEvent() {
    const index = this.#getRandomIndex()
    return this.#events[index]
  }

  /**
   * Checks if the event is successful.
   * @param {Object} event - The event object.
   * @returns {boolean} True if the event is successful, false otherwise.
   */
  #isSuccessful(event) {
    return Math.random() < event.chance
  }

  /**
   * Stops the game.
   * Stops the report.
   * Sends an end message to the SSE stream.
   * @returns {void}
   */
  #endGame = () => {
    this.#stopGame()
    this.#stopReport()
    this.#gameStopped()
  }

  /**
   * Throws an error.
   * @param {string} message - The error message.
   * @returns {void}
   */
  #throwError(message) {
    throw new Error(message)
  }
}

module.exports = Report
