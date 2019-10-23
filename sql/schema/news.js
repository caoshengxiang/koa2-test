const mongoose = require('../db')
const Schema = mongoose.Schema

const newSchema = Schema({
  title: String, // 标题
  sub: String, // 简介
  content: String, // 详细介绍，富文本
  type: Number, // 分类; 1:
  listImg: String, // 列表图
  created: Number, // 创建时间戳
  status: Number, // 状态【1:上线,2:下载】
  weight: Number, // 权重
  pv: Number, // 浏览量
})

module.exports = mongoose.model('News', newSchema)
