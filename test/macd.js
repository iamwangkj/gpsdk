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

async function getMACD0 (list) {
  const resList = []
  const len = list.length
  let index = 0
  console.log('len', len)
  while (index < len) {
    try {
      const code = list[index].code
      const itemRes = await gpsdk.collector.getHistory(code)
      const priceArr = itemRes.map((tradeItem) => {
        return tradeItem.trade
      })
      const macdObj = gpsdk.analyst.macd(priceArr)
      const flag = Number(macdObj.macds[6])
      const flag2 = Number(macdObj.diffs[6])
      if (flag > -0.01 && flag < 0.01 && flag2 < 0) {
        console.log('macd在0旁边', flag, flag2, code)
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

function main () {
  let allStock = require(`./data-all/${dayjs().format('YYYYMMDD')}.json`)
  allStock = commonFilter(allStock)
  getMACD0(allStock)
}
main()
