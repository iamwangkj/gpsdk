const path = require('path')
const dayjs = require('dayjs')
const toJson = require('./utils/toJson')
const gpsdk = require('../lib/index')
const _ = require('lodash')

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


async function getMACD0(list) {
  let len = list.length
  let index = 0
  console.log('len', len)
  while (index < len) {
    try {
      const code = list[index].code
      // console.log('循环体中的index', index, code)
      const itemRes = await gpsdk.collector.getHistory(code)
      console.log(code, index, '历史行情长度', itemRes.length)
      const priceArr = itemRes.map((tradeItem) => {
        return tradeItem.trade
      })
      const macdObj = gpsdk.analyst.macd(priceArr)
      if (macdObj && macdObj.bars && macdObj.bars[0] === 0) {
        console.warn(`----------------------------${code}的macd为0`)
      }
      else {
        // console.log(`${code}的macd不为0`)
      }
    } catch (err) {
      console.log('err is ->', index, err)
    }
    index++

  }
}

getMACD0(realRes)