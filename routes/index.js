const router = require('koa-router')()
// const request = require("request");
const connection = require('../mysql/connection')

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/string', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*') // * 所有请求，或指定http://localhost:8080
  ctx.body = {}
})

router.get('/json', async (ctx, next) => {
  // 执行sql脚本对数据库进行读写
  connection.query('SELECT * FROM table', (error, results, fields) => {
    if (error) throw error
    // connected!

    // 结束会话
    connection.release()
  })
  ctx.body = {
    title: 'koa2 json by nodemon restart'
  }
})

module.exports = router
