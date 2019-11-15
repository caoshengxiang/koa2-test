const mongoose = require('../db')
const Schema = mongoose.Schema

const portChangeSchema = Schema({
  created: String,
  num: Number
})

module.exports = mongoose.model('portChange', portChangeSchema)
