const gpsdk = require('../lib/index')

let allStock = require('./data/20201103.json')
allStock = gpsdk.filter.getChuangye(allStock)
// allStock = gpsdk.filter.getBigAmount(allStock)
// allStock = gpsdk.filter.getHighPrice(allStock)
allStock = gpsdk.filter.getRedT(allStock)

const res = allStock.map((item) => {
  return item.code
})

console.log('res', res)
