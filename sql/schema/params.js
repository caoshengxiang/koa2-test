const mongoose = require('../db')
const Schema = mongoose.Schema

const paramsSchema = Schema({
  created: Number, // 创建时间戳
  weight: Number, // 权重
  status: Number, // 状态【1:上线/2:下载】
  index: String, // 序号
  q: String, // 问题
  a: String, // 回答
})

module.exports = mongoose.model('params', paramsSchema)
