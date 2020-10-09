const jsonfile = require('jsonfile')

const toJson = (filename, data) => {
  jsonfile.writeFile(filename, data, (err) => {
    err && console.error(err)
  })
  console.log(`生成json文件：${filename}`)
}

module.exports = toJson
