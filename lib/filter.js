
// 红T
function getRedT (list) {
  return list.filter((item) => {
    let { open, high, low, trade, changepercent } = item
    if (Number(changepercent) > 0) {
      open = Number(open)
      high = Number(high)
      low = Number(low)
      trade = Number(trade)
      const lineH = open - low
      const divH = trade - open
      const upLineH = high - trade
      const rate = lineH / divH
      const rate2 = upLineH / divH
      return rate > 2 && rate2 < 0.4
    }
  })
}

// 获取创业股
function getChuangye (list) {
  return list.filter((item) => {
    return item.code[0] === '3'
  })
}

// 移除涨停
function removeLimitUp (list) {
  return list.filter((item) => {
    const { changepercent } = item
    return Number(changepercent) < 9
  })
}

// 筛选出涨停
function getLimitUp (list) {
  return list.filter((item) => {
    const { changepercent } = item
    return Number(changepercent) > 9
  })
}

// 筛选出大于1亿金额的股票
function getBigAmount (list) {
  return list.filter((item) => {
    let { amount } = item
    amount = Number(amount)
    return amount > 100000000
  })
}

// 筛选出价格低于50的股票
function getLowPrice (list, price = 50) {
  return list.filter((item) => {
    const trade = Number(item.trade)
    return trade < price
  })
}

// 筛选出价格高于10的股票
function getHighPrice (list, price = 10) {
  return list.filter((item) => {
    const trade = Number(item.trade)
    return trade > price
  })
}

// 筛选出高换手率的股票
function getHighRatio (list, huanshoulv = 5) {
  return list.filter((item) => {
    const ratio = Number(item.turnoverratio)
    return ratio > huanshoulv
  })
}

module.exports = {
  getRedT,
  getChuangye,
  removeLimitUp,
  getLimitUp,
  getBigAmount,
  getLowPrice,
  getHighPrice,
  getHighRatio
}
