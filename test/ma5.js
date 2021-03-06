const toJson = require('./utils/toJson')
const path = require('path')
const gpsdk = require('../lib/index')

// let allStock = require('../data-all/20201026.json')
// allStock = gpsdk.filter.getChuangye(allStock)
// allStock = gpsdk.filter.getBigAmount(allStock)

const allStock = require('./data-res/macd.json')

async function main (list) {
  const len = list.length
  let index = 0
  console.log('len', len)
  const fenxiList = []
  const buyList = []
  while (index < len) {
    try {
      const code = list[index].code
      // console.log('循环体中的index', index, code)
      const itemRes = await gpsdk.collector.getHistory(code)
      const ma5 = itemRes[1]
      const lasted = itemRes[0]
      const { averagePrice5, averagePrice10, averagePrice20 } = ma5
      let averagePrice30 = 0
      if (itemRes.length > 30) {
        let total = 0
        for (let index = 0; index < 30; index++) {
          const { trade } = itemRes[index]
          total += trade
        }
        averagePrice30 = total / 30
        // console.log('30天均价', averagePrice30)
      } else {
        console.log('不足30天的数据')
      }
      // console.log('5-10-20均价', averagePrice5, averagePrice10, averagePrice20)
      const juli = 0.01
      const condition1 = (Math.abs(averagePrice5 - averagePrice10) / averagePrice5) < juli
      const condition2 = (Math.abs(averagePrice5 - averagePrice20) / averagePrice5) < juli
      const condition3 = (Math.abs(averagePrice5 - averagePrice30) / averagePrice5) < juli
      // const condition4 = averagePrice5 < averagePrice30
      // const condition5 = averagePrice20 < averagePrice30
      // const condition4 = averagePrice10 < averagePrice30
      if (condition1 && condition2 && condition3) {
        console.log(index, '--------', code)
        buyList.push(list[index])
        fenxiList.push({
          code,
          lasted: lasted,
          buyIn: ma5
        })
        // console.log('fenxiList', fenxiList)
      } else {
        // console.log(index, '不符合')
      }
    } catch (err) {
      // console.log(`err${index}:`, err)
    }
    index++
  }
  toJson(path.resolve(__dirname, './data-res/ma5.json'), buyList)
  console.log('结束')
}

main(allStock)
