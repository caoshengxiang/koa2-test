const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})



router.get('/string', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // * 所有请求，或指定http://localhost:8080
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json by nodemon restart'
  }
})

module.exports = router
