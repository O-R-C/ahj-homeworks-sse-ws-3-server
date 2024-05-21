class Report {
  #storage
  #events
  #reportInterval
  #gameTimer
  #durationInMinutes = 2

  constructor(storage, eventsData) {
    this.#storage = storage
    this.#events = eventsData
  }

  init() {
    this.#startGame()
  }

  #startGame() {
    this.#resetGame()
    this.#setGameTimer()
    this.#generateReport()
  }

  #resetGame() {
    this.#stopGame()
    this.#stopReport()
    this.#resetReport()
  }

  #stopGame() {
    if (this.#gameTimer) clearInterval(this.#gameTimer)
  }

  #stopReport() {
    if (this.#reportInterval) clearInterval(this.#reportInterval)
  }

  #resetReport() {
    this.#storage.clear()
  }

  #setGameTimer() {
    const duration = this.#durationInMinutes * 60 * 1000
    this.#gameTimer = setTimeout(this.#stopGame, duration)
  }

  #generateReport() {
    this.#reportInterval = setInterval(() => {
      const event = this.#getEvent()
      event && this.#storage.push(event)
      console.log('🚀 ~ this.#storage:', this.#storage)
    }, 2000)
  }

  #getEvent() {
    const event = this.#getRandomEvent()

    if (!this.#isSuccessful(event)) return

    return event
  }

  #getRandomIndex() {
    const { length } = this.#storage
    const random = Math.random() * length
    const index = Math.floor(random)
    return index
  }

  #getRandomEvent() {
    const index = this.#getRandomIndex()
    return this.#events[index]
  }

  #isSuccessful(event) {
    return Math.random() < event.chance
  }
}

module.exports = Report
