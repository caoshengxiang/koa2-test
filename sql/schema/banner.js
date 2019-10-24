const mongoose = require('../db')
const Schema = mongoose.Schema

const bannerSchema = Schema({
  title: String, // banner 标题名称
  imgUrl: String, // 图片地址
  subImg: String, // 机器人图
  link: String, // 跳转链接
  flag: Number, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
  created: Number, // 创建时间戳
})

module.exports = mongoose.model('Banner', bannerSchema)
