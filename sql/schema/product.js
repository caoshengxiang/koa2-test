const mongoose = require('../db')
const Schema = mongoose.Schema

const productSchema = Schema({
  title: String, // 产品标题
  sub: String, // 简介
  content: String, // 详细介绍，富文本
  type: Number, // 分类; 1:
  listImg: String, // 列表图
  detailImgs: String, // 详情图，串用逗号分隔
})

module.exports = mongoose.model('Product', productSchema)
