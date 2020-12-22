const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')
const dayjs = require('dayjs')

function commonFilter (list) {
  let allStock = gpsdk.filter.removeST(list)
  allStock = gpsdk.filter.removeKechuang(allStock)
  allStock = gpsdk.filter.getBigAmount(allStock)
  allStock = gpsdk.filter.removeLimitUp(allStock)
  return allStock
}

function getBuy () {
  let allStock = require(`./data-all/${dayjs().format('YYYYMMDD')}.json`)
  allStock = commonFilter(allStock)
  allStock = gpsdk.filter.getRedT(allStock)
  console.log('red t=', allStock.length)
  toJson(path.resolve(__dirname, './data-res/redt.json'), allStock)
}
getBuy()
