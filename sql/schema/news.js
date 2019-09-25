const mongoose = require('../db')
const Schema = mongoose.Schema

const newSchema = Schema({
  title: String, // 产品标题
  sub: String, // 简介
  content: String, // 详细介绍，富文本
  type: Number, // 分类; 1:
  listImg: String, // 列表图
  detailImgs: String, // 详情图，串用逗号分隔
  created: Number, // 创建时间戳
})

module.exports = mongoose.model('News', newSchema)
