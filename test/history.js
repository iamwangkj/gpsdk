const gpsdk = require('../lib/index')

const code = '600893'
gpsdk.collector.getHistory(code).then((res) => {
  console.log(`${code}查询历史`, res)
})
