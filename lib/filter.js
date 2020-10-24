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
const getLowPrice = (list) => {
  return list.filter((item) => {
    const trade = Number(item.trade)
    return trade < 50
  })
}

module.exports = {
  getChuangye,
  removeLimitUp,
  getLimitUp,
  getBigAmount,
  getLowPrice
}
