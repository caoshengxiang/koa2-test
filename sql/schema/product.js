const mongoose = require('../db')
const Schema = mongoose.Schema

const productSchema = Schema({
  title: String, // 产品标题
  sub: String, // 简介
  content: String, // 详细介绍，富文本
  productCateName: Number, // 产品分类名称;
  listImg: String, // 列表图
  detailImgs: String, // 图片集合，串用逗号分隔
  created: Number, // 创建时间戳
  weight: Number, // 权重
  status: Number, // 状态【1:上线,2:下载】
  pv: Number, // 浏览量
})

module.exports = mongoose.model('Product', productSchema)
