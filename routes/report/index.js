const Router = require('@koa/router')
const { v4: uuidv4 } = require('uuid')
const { streamEvents } = require('http-event-stream')

const router = new Router()

router.get('/report', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      return []
    },
    async stream(sse) {
      sse.sendEvent({
        event: 'startMessage',
        data: 'sse event',
        id: uuidv4(),
      })

      return () => {}
    },
  })
  ctx.respond = false
})

module.exports = router
