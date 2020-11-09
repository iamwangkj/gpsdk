const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')
function getCheck () {
  let allStock = require('./data-all/20201103.json')
  // allStock = gpsdk.filter.getBigAmount(allStock)
  // allStock = gpsdk.filter.getChuangye(allStock)
  // allStock = gpsdk.filter.getHighPrice(allStock)
  allStock = gpsdk.filter.getRedT(allStock)
  toJson(path.resolve(__dirname, './data-res/redt.json'), allStock)

  const zuixinStock = require('./data-all/20201109.json')
  const shuchu = []
  allStock.forEach((buyItem) => {
    zuixinStock.some((item) => {
      if (buyItem.code === item.code) {
        shuchu.push({
          code: buyItem.code,
          buy: buyItem,
          sale: item
        })
        return true
      }
    })
  })

  toJson(path.resolve(__dirname, './data-res/redt-check.json'), shuchu)
}

function check1 () {
  const data = require('./data-res/redt-check.json')
  gpsdk.checker.check(data)
}

// getCheck()
check1()
