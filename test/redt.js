const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

const buyDate = '20200706'
let allStock = require(`./data-all/${buyDate}.json`)
allStock = gpsdk.filter.getBigAmount(allStock)
// allStock = gpsdk.filter.getChuangye(allStock)
// allStock = gpsdk.filter.getHighPrice(allStock)
allStock = gpsdk.filter.getRedT(allStock)
toJson(path.resolve(__dirname, `./data-buy/redt-${buyDate}.json`), allStock)

async function diff (list) {
  const len = list.length
  console.log('len', len)
  let index = 0
  const buyList = []

  while (index < len) {
    try {
      const code = list[index].code
      console.log(`循环体中的${index}----${code}`)
      const itemRes = await gpsdk.collector.getHistory(code)
      buyList.push({
        code,
        sale: itemRes[0],
        buy: list[index]
      })
    } catch (err) {
      // console.log(`err${index}:`, err)
    }
    index++
  }
  console.log('结束')
}
