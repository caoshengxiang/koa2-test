const router = require('koa-router')()

router.prefix('/api') // 接口在api/下，如：http://localhost:3000/api/users/userList

const userApi = require('../sql/control/user')
const chatApi = require('../sql/control/chat')
const accountApi = require('../sql/control/account')
const bannerApi = require('../sql/control/banner')

// 用户相关
router.get('/users/getUser', userApi.getUser)
router.post('/users/userList', userApi.userList)
router.get('/users/getUserInfo', userApi.getUserInfo)
router.post('/users/addUser', userApi.addUser)
router.post('/users/removeUser', userApi.removeUser)
router.post('/users/update/:id', userApi.updateUser)

// 聊天
router.post('/chat/list', chatApi.chatList)

// 登录
router.post('/user/login', accountApi.userLogin)

// banner 相关
router.get('/banner/detail', bannerApi.getBannerDetail)
router.post('/banner/list', bannerApi.bannerList)
router.post('/banner/add', bannerApi.addBanner)
router.delete('/banner/delete', bannerApi.removeBanner)
router.put('/banner/update/:id', bannerApi.updateBanner)

module.exports = router

// mongose 增删改查 https://blog.csdn.net/u012810020/article/details/54582051
