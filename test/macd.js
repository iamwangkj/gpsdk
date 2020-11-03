const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

let allStock = require('./data/20201026.json')
allStock = gpsdk.filter.getBigAmount(allStock)
const buyInList = []

async function getMACD0 (list) {
  const len = list.length
  let index = 0
  console.log('len', len)
  while (index < len) {
    try {
      const code = list[index].code
      // console.log('循环体中的index', index, code)
      const itemRes = await gpsdk.collector.getHistory(code)

      const buyIn = list[index]
      const lasted = itemRes[0]

      const priceArr = itemRes.map((tradeItem) => {
        return tradeItem.trade
      })
      const macdObj = gpsdk.analyst.macd(priceArr)
      // const diff = macdObj.diffs[0]
      const flag = macdObj.bars[1]
      if (flag > -0.01 && flag < 0.01) {
        buyInList.push({
          code,
          lasted: lasted,
          buyIn: buyIn
        })
      }
    } catch (err) {
      console.log('err is ->', err)
    }
    index++
  }
  toJson(path.resolve(__dirname, './res/macd-diff-0.json'), buyInList)
  console.log('结束')
}

getMACD0(allStock)
