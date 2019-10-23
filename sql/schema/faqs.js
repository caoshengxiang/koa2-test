const mongoose = require('../db')
const Schema = mongoose.Schema

const faqsSchema = Schema({
  name: String,
  flag: Number,
  created: Number, // 创建时间戳
})

module.exports = mongoose.model('faqs', faqsSchema)
