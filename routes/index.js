const combine = require('koa-combine-routers')

const index = require('./index/index')
const report = require('./report')

const router = combine([index, report])

module.exports = router
