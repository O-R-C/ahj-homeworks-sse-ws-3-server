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
      console.log('🚀 ~ lastEventId:', lastEventId)

      // const storage = gameReport.get()
      // console.log('🚀 ~ lastEventId:', lastEventId)
      // console.log('🚀 ~ storage:', storage)

      // if (!lastEventId) {
      //   return storage
      // }

      // const index = storage.findIndex((item) => item.id === lastEventId)
      // console.log('🚀 ~ index:', index)

      // return storage.slice(index + 1)

      return []
    },
    async stream(sse) {
      gameReport.listen((item) => {
        sse.sendEvent({
          id: item.id,
          event: 'message',
          data: JSON.stringify(item),
        })
      })
      return () => {}
    },
  })
  ctx.respond = false
})

module.exports = router
