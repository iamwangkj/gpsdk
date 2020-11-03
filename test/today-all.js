const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')
const dayjs = require('dayjs')

gpsdk.collector.getTodayAll().then((realRes) => {
  // console.log('realRes', realRes)
  toJson(path.resolve(__dirname, `./data/${dayjs().format('YYYYMMDD')}.json`), realRes)
})
