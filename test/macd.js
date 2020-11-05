const gpsdk = require('../lib/index')
const toJson = require('./utils/toJson')
const path = require('path')

const sourceData = require('./data-res/redt.json')
getMACD0(sourceData)

async function getMACD0 (list) {
  const resList = []
  const len = list.length
  let index = 0
  console.log('len', len)
  while (index < 100) {
    try {
      const code = list[index].code
      const itemRes = await gpsdk.collector.getHistory(code)
      const priceArr = itemRes.map((tradeItem) => {
        return tradeItem.trade
      })
      const macdObj = gpsdk.analyst.macd(priceArr)
      const flag = macdObj.diffs[2]
      const flag2 = macdObj.diffs[3]
      if (flag === 0 && flag2 < 0) {
        console.log('macd在0旁边', code)
        resList.push(list[index])
      }
    } catch (err) {
      // console.log('err is ->', err)
    }
    index++
  }
  toJson(path.resolve(__dirname, './data-res/macd.json'), resList)
  console.log('结束')
}
