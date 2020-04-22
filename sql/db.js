const mongoose = require('mongoose')
const dbConfig = require('../config/db_config')

const connectStr = 'mongodb://'+dbConfig.name + ':' + dbConfig.pwd + '@' + dbConfig.dbLocal + dbConfig.dbName + '?authSource=admin'
mongoose.connect(connectStr) // 链接数据库

/* 连接成功 */
mongoose.connection.on('connected', function () {
  console.log('>>>>>>>>>> Mongoose connection success, open to:' + connectStr)
})

/**
 * 连接失败
 * */
mongoose.connection.on('error', function (err) {
  console.log('>>>>>>>>>>>> Mongoose connection error: ' + err)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('>>>>>>>>>>>> Mongoose connection disconnected')
})

module.exports = mongoose