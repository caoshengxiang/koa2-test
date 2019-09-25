const router = require('koa-router')()

router.prefix('/api') // 接口在api/下，如：http://localhost:3000/api/users/userList

const userApi = require('../sql/control/user')
const chatApi = require('../sql/control/chat')
const accountApi = require('../sql/control/account')
const bannerApi = require('../sql/control/banner')
const productApi = require('../sql/control/product')
const newsApi = require('../sql/control/news')
const emailApi = require('../sql/control/email')

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

// 产品 相关
router.get('/product/detail', productApi.detail)
router.post('/product/list', productApi.list)
router.post('/product/add', productApi.add)
router.delete('/product/delete', productApi.remove)
router.put('/product/update/:id', productApi.update)

// 新闻 相关
router.get('/product/detail', newsApi.detail)
router.post('/product/list', newsApi.list)
router.post('/product/add', newsApi.add)
router.delete('/product/delete', newsApi.remove)
router.put('/product/update/:id', newsApi.update)

// 邮件 相关
router.get('/email/detail', emailApi.detail)
router.post('/email/list', emailApi.list)
router.post('/email/add', emailApi.add)
router.delete('/email/delete', emailApi.remove)
router.put('/email/update/:id', emailApi.update)
router.post('/email/send', emailApi.send)

module.exports = router

// mongose 增删改查 https://blog.csdn.net/u012810020/article/details/54582051
