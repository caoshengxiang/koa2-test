const mongoose = require('../db')
const Schema = mongoose.Schema

const paramsSchema = Schema({
  name: String,
  flag: Number, // 1：产品分类
  created: Number, // 创建时间戳
})

module.exports = mongoose.model('params', paramsSchema)
