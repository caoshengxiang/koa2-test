const mongoose = require('../db')
const Schema = mongoose.Schema

const portSchema = Schema({
  portCode: String, // 船公司港口五字码
  port: String, // 船公司港口英文名
  date: String, // 爬取日期
})

module.exports = mongoose.model('port', portSchema)
