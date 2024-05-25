const Router = require('@koa/router')
const { streamEvents } = require('http-event-stream')
const Report = require('../../js/Report')
const GameEvent = require('../../js/GameEvent')
const eventsData = require('../../js/eventsData')
const gameReport = require('../../db/gameReport')

const report = new Report(gameReport, eventsData, GameEvent)

report.init()

const router = new Router()

router.get('/report', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      const storage = gameReport.get()
      const index = storage.findIndex((item) => item.id === lastEventId)

      return storage.slice(index + 1).map((item) => {
        return {
          id: item.id,
          event: 'message',
          data: JSON.stringify(item),
        }
      })
    },
    async stream(sse) {
      const sendItem = (sse, item) => {
        sse.sendEvent({
          id: item.id,
          event: 'message',
          data: JSON.stringify(item),
        })
      }

      const listener = (item) => {
        sendItem(sse, item)
      }

      gameReport.get().forEach((item) => sendItem(sse, item))
      gameReport.listen(listener)
      return () => {
        gameReport.deleteListener(listener)
      }
    },
  })
  ctx.respond = false
})

module.exports = router
