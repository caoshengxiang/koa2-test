const router = require('koa-router')()

router.prefix('/api') // 接口在api/下，如：http://localhost:3000/api/users/userList

const userApi = require('../sql/control/user')

// 用户相关
router.post('/users/userList', userApi.userList)
router.get('/users/getUser', userApi.getUser)
router.post('/users/addUser', userApi.addUser)
router.post('/users/removeUser', userApi.removeUser)
router.post('/users/update', userApi.updateUser)



module.exports = router