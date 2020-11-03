
const list = require('./data/ma5.json')

const upList = []
const downList = []
list.forEach((item) => {
  const { ma5, lasted, code } = item
  const changePercent = ((lasted.trade - ma5.trade) / ma5.trade * 100).toFixed(2)
  if (changePercent > 0) {
    console.log('涨', code, `${changePercent}%`)
    upList.push(item)
  } else {
    console.log('跌', code, `${changePercent}%`)
    downList.push(item)
  }
})

console.log(`总(${list.length})，涨跌比(${upList.length}:${downList.length})`)
