
const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

let allStock = require('./data-all/20201012.json')
allStock = gpsdk.filter.removeKechuang(allStock)
allStock = gpsdk.filter.getBigAmount(allStock)
allStock = gpsdk.filter.getChuangye(allStock)

function getPer (list) {
  const res = []
  list.forEach((item) => {
    const { per } = item
    if (per > 0 && per < 10) {
      res.push(item)
    }
  })
  res.sort((a1, b1) => {
    const a = a1.per
    const b = b1.per
    return a - b
  })
  return res
}

function getPb (list) {
  const res = []
  list.forEach((item) => {
    const { pb } = item
    if (pb < 1) {
      res.push(item)
    }
  })
  res.sort((a1, b1) => {
    const a = a1.pb
    const b = b1.pb
    return a - b
  })
  return res
}

toJson(path.resolve(__dirname, './data-res/sort.json'), getPb(allStock))
