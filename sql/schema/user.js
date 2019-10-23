const mongoose = require('../db')
const Schema = mongoose.Schema

const userSchema = Schema({
  name: String,
  password: String,
  account: String,
  icon: String,
  age: Number,
  sex: String,
  created: Number, // 创建时间戳
  flag: Number, // 用户类型标识， 1：管理端
})

module.exports = mongoose.model('User', userSchema)
