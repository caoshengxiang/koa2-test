const router = require('koa-router')()

router.prefix('/api') // 接口在api/下，如：http://localhost:3000/api/users/userList

const userApi = require('../sql/control/user')

// 用户相关
router.get('/users/userList', userApi.userList)



module.exports = router