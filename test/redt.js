const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

let allStock = require('./data/20201026.json')
allStock = gpsdk.filter.getBigAmount(allStock)
// allStock = gpsdk.filter.getChuangye(allStock)
// allStock = gpsdk.filter.getHighPrice(allStock)
allStock = gpsdk.filter.getRedT(allStock)

async function main (list) {
  const len = list.length
  console.log('len', len)
  let index = 0
  const fenxiList = []
  while (index < len) {
    try {
      const code = list[index].code
      // console.log('循环体中的index', index, code)
      const itemRes = await gpsdk.collector.getHistory(code)
      const buyIn = list[index]
      const lasted = itemRes[0]
      console.log(index, '--------', code)
      fenxiList.push({
        code,
        lasted: lasted,
        buyIn: buyIn
      })
    } catch (err) {
      // console.log(`err${index}:`, err)
    }
    index++
  }

  toJson(path.resolve(__dirname, './data/redt.json'), fenxiList)
  console.log('结束')
}

main(allStock)
