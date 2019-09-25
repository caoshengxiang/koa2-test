const mongoose = require('../db')
const Schema = mongoose.Schema

const bannerSchema = Schema({
  title: String, // banner 标题名称
  url: String, // 图片地址
  link: String, // 跳转链接
  pos: Number, // banner位置; 1:首页
})

module.exports = mongoose.model('Banner', bannerSchema)
