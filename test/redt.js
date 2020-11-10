const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

function getBuy () {
  let allStock = require('./data-all/20201110.json')
  allStock = gpsdk.filter.getBigAmount(allStock)
  allStock = gpsdk.filter.removeST(allStock)
  // allStock = gpsdk.filter.getChuangye(allStock)
  allStock = gpsdk.filter.getRedT(allStock)
  toJson(path.resolve(__dirname, './data-res/redt.json'), allStock)
}
getBuy()

function getMerge () {
  const buyList = require('./data-res/redt.json')
  const zuixinStock = require('./data-all/20201109.json')
  const mergeList = []
  buyList.forEach((buyItem) => {
    zuixinStock.some((item) => {
      if (buyItem.code === item.code) {
        mergeList.push({
          code: buyItem.code,
          buy: buyItem,
          sale: item
        })
        return true
      }
    })
  })
  toJson(path.resolve(__dirname, './data-res/redt-merge.json'), mergeList)
}

function checkRes () {
  const data = require('./data-res/redt-merge.json')
  gpsdk.checker.check(data)
}
