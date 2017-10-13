const mongoose = require('mongoose')
const dbConfig = require('../config/db_config')

mongoose.connect(dbConfig.dbLocal+dbConfig.dbName) // 链接数据库


/* 连接成功 */
mongoose.connection.on('connected', function () {
    console.log(">>>>>>>>>> Mongoose connection success, open to:"+dbConfig.dbLocal+dbConfig.dbName);
});

/**
 * 连接失败
 * */
mongoose.connection.on('error', function (err) {
    console.log('>>>>>>>>>>>> Mongoose connection error: ' + err);
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('>>>>>>>>>>>> Mongoose connection disconnected');
});

module.exports = mongoose;