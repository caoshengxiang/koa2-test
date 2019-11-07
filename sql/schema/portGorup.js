const mongoose = require('../db')
const Schema = mongoose.Schema

const portGroupSchema = Schema({
  portPol: String, // 起始
  portPod: String, // 终止
  status: Number, // 1：正常查询，2：无查询结果，3：异常, 4
  content: String, // 原始返回（原文，注意异常时返回的 是json串）
  userTime: String, // 组合请求用时
})

module.exports = mongoose.model('portGroup', portGroupSchema)
