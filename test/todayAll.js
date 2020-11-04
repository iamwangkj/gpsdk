const path = require('path')
const dayjs = require('dayjs')
const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')

gpsdk.collector.getTodayAll().then((realRes) => {
  // console.log('realRes', realRes)
  toJson(path.resolve(__dirname, `./data-all/${dayjs().format('YYYYMMDD')}.json`), realRes)
})
