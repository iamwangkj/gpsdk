const gpsdk = require('../lib/index')
const macd = require('macd')

// gpsdk.collector.getTodayAll().then((realRes) => {
//   console.log('realRes', realRes)
//   toJson(path.resolve(__dirname, `./data/${dayjs().format('YYYYMMDD')}.json`), realRes)
// })

const realRes = require('./data/20201010.json')

// realRes.forEach((item, allIndex) => {
//   console.log('allIndex', allIndex)
//   const { code } = item
//   gpsdk.collector.getHistory(code).then((itemRes) => {
//     // console.log('历史行情', itemRes)
//     const priceArr = itemRes.map((tradeItem) => {
//       return tradeItem.trade
//     })
//     const macdObj = gpsdk.analyst.macd(priceArr)
//     if (macdObj && macdObj.histogram && macdObj.histogram[1] === 0) {
//       console.log(`${code}的macd为0`)
//     }
//     else {
//       console.log(`${code}的macd不为0`)
//     }
//   }).catch(console.error)
// })

async function getMACD0 (list) {
  const len = list.length
  let index = 0
  console.log('len', len)
  while (index < len) {
    try {
      const code = list[index].code
      // console.log('循环体中的index', index, code)
      const itemRes = await gpsdk.collector.getHistory(code)
      // console.log(code, index, '历史行情长度', itemRes.length)
      const priceArr = itemRes.map((tradeItem) => {
        return tradeItem.trade
      })
      const macdObj = macd(priceArr)
      // console.log('macdObj', macdObj)
      const i = 1
      if (macdObj && macdObj.histogram && macdObj.histogram[i] < 0.1 && macdObj.histogram[i] > -0.1) {
        if (macdObj.MACD[i] < macdObj.signal[i]) {
          console.warn(`------------------------------${code}的macd`)
        }
      } else {
        // console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${code}的macd不为0`)
      }
      // const macdObj = gpsdk.analyst.macd(priceArr)
      // if (macdObj && macdObj.bars && macdObj.bars[1] === 0) {
      //   console.warn(`------------------------------${code}的macd为0`)
      // } else {
      //   // console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${code}的macd不为0`)
      // }
    } catch (err) {
      console.log('err is ->', err)
    }
    index++
  }
}

getMACD0(realRes)
