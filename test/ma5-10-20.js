const gpsdk = require('../lib/index')

let allStock = require('./data/20201023.json')
// allStock = gpsdk.filter.getChuangye(allStock)
allStock = gpsdk.filter.getBigAmount(allStock)

const fenxiList = []

async function main (list) {
  const len = list.length
  let index = 0
  console.log('len', len)
  while (index < len) {
    try {
      const code = list[index].code
      // console.log('循环体中的index', index, code)
      const itemRes = await gpsdk.collector.getHistory(code)
      // console.log('itemRes=', itemRes)
      const { averagePrice5, averagePrice10, averagePrice20 } = itemRes[0]
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
      const juli = 0.03
      const condition1 = (Math.abs(averagePrice5 - averagePrice10) / averagePrice5) < juli
      const condition2 = (Math.abs(averagePrice5 - averagePrice20) / averagePrice5) < juli
      const condition3 = averagePrice5 < averagePrice10
      const condition4 = averagePrice10 < averagePrice20
      const condition5 = (Math.abs(averagePrice5 - averagePrice20) / averagePrice5) < juli
      const condition6 = averagePrice20 < averagePrice30
      if (condition1 && condition2 && condition3 && condition4 && condition5 && condition6) {
        console.log(index, '--------', code)
        fenxiList.push({
          code
        })
        // console.log('fenxiList', fenxiList)
      } else {
        // console.log('不符合')
      }
    } catch (err) {
      // console.log(`err${index}:`, err)
    }
    index++
  }
  console.log('结束')
}

main(allStock)
