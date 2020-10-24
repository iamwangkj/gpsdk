const axios = require('axios')

// 将code转化为symbol
function codeToSymbol (code) {
  let symbol = ''
  if (code.length === 6) {
    symbol = ['5', '6', '9'].indexOf(code.charAt(0)) >= 0 ? `sh${code}` : `sz${code}`
  } else {
    symbol = code
  }
  return symbol
}

// 获取今天第一页股票实时行情
function getToday (pageIndex = 1, pageSize = 100) {
  const url = `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?num=${pageSize}&sort=changepercent&asc=0&node=hs_a&symbol=&_s_r_a=page&page=${pageIndex}`
  return axios.get(url)
}

// 获取今日所有股票实时行情
async function getTodayAll () {
  let pageIndex = 1
  let isEnd = false
  let resArr = []
  while (!isEnd) {
    const res = await getToday(pageIndex)
    const { data } = res
    console.log(`获取第${pageIndex}页stock行情，长度为${data.length}`)
    resArr = resArr.concat(data)
    data.length < 100 ? isEnd = true : pageIndex++
  }
  return resArr
}
// getTodayAll()

// 获取某只股票的历史行情
function getHistory (code) {
  return new Promise((resolve, reject) => {
    const symbol = codeToSymbol(code)
    const url = `http://api.finance.ifeng.com/akdaily/?code=${symbol}&type=fq`
    axios.get(url).then(({ data }) => {
      const { record } = data
      // console.log('data', data)
      if (record && record.length > 0) {
        const res = record.reverse()
        // console.log('股票历史行情，倒排序后', res)
        const newRes = res.map((item) => {
          return {
            date: item[0],
            open: Number(item[1]),
            high: Number(item[2]),
            trade: Number(item[3]),
            low: Number(item[4]),
            liang: Number(item[5]),
            priceChange: Number(item[6]),
            percentChange: `${item[7]}%`,
            averagePrice5: Number(item[8]),
            averagePrice10: Number(item[9]),
            averagePrice20: Number(item[10])
          }
        })
        resolve(newRes)
      } else {
        reject(`获取${code}历史为空`)
      }
    }).catch((err) => {
      // console.error('getHistory err', err)
      reject(err)
    })
  })
}
// getHistory('300100')

module.exports = {
  getTodayAll,
  getHistory
}
