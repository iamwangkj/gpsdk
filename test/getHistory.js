const gpsdk = require('../lib/index')

gpsdk.collector.getHistory('300581').then((res) => {
  console.log('res', res)
  const ticks = res.map((item) => {
    return item.trade
  })
  console.log('gpsdk.analyst.macd(ticks)', gpsdk.analyst.macd(ticks))
})
