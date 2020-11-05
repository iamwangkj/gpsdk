const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

const code = '600893'
gpsdk.collector.getHistory(code).then((res) => {
  console.log(`${code}查询历史`, res)
  toJson(path.resolve(__dirname, './history.json'), res)
})
