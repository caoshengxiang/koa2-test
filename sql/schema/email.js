const mongoose = require('../db')
const Schema = mongoose.Schema

const emailSchema = Schema({
  subject: String, // 邮件标题
  html: String, // 邮件正文，富文本
  form: String, // 发送者邮箱
  to: String, // 接收者邮箱
  name: String, // 名字
  email: String, // 邮箱
  phone: String, // 电话
  company: String, // 公司
  title: String, // 标题
  content: String, // 正文
  created: Number, // 创建时间戳
})

module.exports = mongoose.model('Email', emailSchema)
// mongodb-linux-x86_64-ubuntu1604-4.2.0
// mongod --dbpath=/usr/loacl/node/data/db --logpath=/usr/local/node/data/logs/mongodb.log --logappend --auth --port=27017 --fork
// ./mongod --dbpath=/usr/loacl/node/data/db --logpath=/usr/local/node/data/logs/mongodb.log
