const mongoose = require('../db')
const Schema = mongoose.Schema

const massageSchema = Schema({
  from: Number,
  to: Number,
  sendTime: String,
  content: String,
})

module.exports = mongoose.model('Message', massageSchema)
