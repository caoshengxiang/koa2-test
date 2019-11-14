const mysql = require('mysql')
module.exports = mysql.createConnection({
  host: '127.0.0.1',   // 数据库地址
  user: 'root',    // 数据库用户
  password: '123456',   // 数据库密码
  database: 'csq'  // 选中数据库
})
