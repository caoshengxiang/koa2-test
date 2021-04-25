const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/json', async (ctx, next) => {

  ctx.body = {
    title: 'koa2 json by nodemon restart'
  }
})

module.exports = router
