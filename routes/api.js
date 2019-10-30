const router = require('koa-router')()

router.prefix('/api') // 接口在api/下，如：http://localhost:3000/api/users/userList

const userApi = require('../sql/control/user')
const chatApi = require('../sql/control/chat')
const bannerApi = require('../sql/control/banner')
const productApi = require('../sql/control/product')
const newsApi = require('../sql/control/news')
const emailApi = require('../sql/control/email')
const faqsApi = require('../sql/control/faqs')
const paramsApi = require('../sql/control/params')
const commonApi = require('../sql/control/common')

// 通用性接口
// router.post('/common/upload', commonApi.uploadConfig.single('file'), commonApi.upload)
router.post('/common/upload', commonApi.upload2)
router.post('/common/upload/cos', commonApi.uploadOs)

// 用户相关
router.get('/users/getUser', userApi.getUser)
router.post('/users/userList', userApi.userList)
router.get('/users/getUserInfo', userApi.getUserInfo)
router.post('/users/addUser', userApi.addUser)
router.post('/users/removeUser', userApi.removeUser)
router.put('/users/update/:id', userApi.updateUser)
router.post('/users/login', userApi.login)
router.post('/users/update/pass', userApi.updatePassword)
// router.put('/users/update/pass', userApi.updatePassword) // 报错信息如下，改post
//  CastError: Cast to ObjectId failed for value "pass" at path "_id" for model "User"

// 聊天
router.post('/chat/list', chatApi.chatList)

// banner 相关
router.get('/banner/detail', bannerApi.detail)
router.get('/banner/list', bannerApi.list)
router.post('/banner/add', bannerApi.add)
router.delete('/banner/delete', bannerApi.remove)
router.put('/banner/update/:id', bannerApi.update)

// 产品 相关
router.get('/product/detail', productApi.detail)
router.get('/product/list', productApi.list)
router.post('/product/add', productApi.add)
router.delete('/product/delete', productApi.remove)
router.put('/product/update/:id', productApi.update)

// 新闻 相关
router.get('/news/detail', newsApi.detail)
router.get('/news/list', newsApi.list)
router.post('/news/add', newsApi.add)
router.delete('/news/delete', newsApi.remove)
router.put('/news/update/:id', newsApi.update)

// 问题 相关
router.get('/faqs/detail', faqsApi.detail)
router.get('/faqs/list', faqsApi.list)
router.post('/faqs/add', faqsApi.add)
router.delete('/faqs/delete', faqsApi.remove)
router.put('/faqs/update/:id', faqsApi.update)

// 邮件 相关
router.get('/email/detail', emailApi.detail)
router.get('/email/list', emailApi.list)
router.post('/email/add', emailApi.add)
router.delete('/email/delete', emailApi.remove)
router.put('/email/update/:id', emailApi.update)
router.post('/email/send', emailApi.send)

// 参数 相关
router.get('/params/detail', paramsApi.detail)
router.get('/params/list', paramsApi.list)
router.post('/params/add', paramsApi.add)
router.delete('/params/delete', paramsApi.remove)
router.put('/params/update/:id', paramsApi.update)

module.exports = router

// mongose 增删改查 https://blog.csdn.net/u012810020/article/details/54582051
