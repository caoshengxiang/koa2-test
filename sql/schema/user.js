const mongoose  = require('../db')
const Schema = mongoose.Schema

const userSchema = Schema({
    name: String,
    age: Number
})


module.exports = mongoose.model('User', userSchema)