const router = require('koa-router')()

router.get('/oa', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})



router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json by nodemon restart'
  }
})

module.exports = router
