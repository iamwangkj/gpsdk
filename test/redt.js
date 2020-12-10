const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

function getBuy () {
  let allStock = require('./data-all/20201210.json')
  allStock = gpsdk.filter.getBigAmount(allStock)
  allStock = gpsdk.filter.removeST(allStock)
  allStock = gpsdk.filter.getRedT(allStock)
  console.log('red t=', allStock)
  toJson(path.resolve(__dirname, './data-res/redt.json'), allStock)
}
getBuy()
