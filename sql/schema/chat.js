const mongoose = require('../db')
const Schema = mongoose.Schema

const chatSchema = Schema({
  from: String,
  to: String,
  sendTime: Number,
  content: String,
})

module.exports = mongoose.model('Chat', chatSchema)