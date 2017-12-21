const mongoose = require('../db')
const Schema = mongoose.Schema

const userSchema = Schema({
  name: String,
  password: String,
  age: Number,
  sex: String,
  icon: String,
})

module.exports = mongoose.model('User', userSchema)