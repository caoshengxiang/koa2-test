const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/getUser', async(ctx, next) => {
    ctx.body = {
        status: 'success',
        data: [{
        username: 'allen',
        age: 24,
        sex: '男',
        icon: '',
        id: 1
    }]}
})

router.post('/addUser', async(ctx, next) => {
    console.log('add user', ctx.request.body)

    ctx.body = {
        status: 'success',
        data: '添加成功'
    }
})

module.exports = router
