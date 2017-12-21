const router = require('koa-router')()

router.prefix('/users')

const User  = require('../sql/schema/user')



router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/userList', async(ctx, next) => {
    await new Promise((resolve, reject)=>{
        User.find({name: 'allen'}, function (err, data) {
            if(err) {
                reject(err)
            } else {
                if(data.length == 0) {
                    reject('该用户不存在')
                    User.create({
                        name: 'allen',
                        age: 18
                    }, function (err) {
                        if(err) {
                            console.log('注册写入用户错误')
                        } else {
                            console.log('添加用户')
                        }
                    })
                } else {
                    resolve(data)
                }
            }
        })
    }).then((data)=>{
        ctx.body = data
    }, (err)=>{
        ctx.body = err
    })
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
