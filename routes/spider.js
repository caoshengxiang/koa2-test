const router = require('koa-router')()

router.prefix('/spider') // 接口在apider/


const baiduNews = require('../sql/spider/baiduNews')
const rcl = require('../sql/spider/rcl')

router.get('/s/hot', baiduNews.hotList)
router.get('/s/jianshu', baiduNews.jianShuList)


router.get('/s/rcl/port/list', rcl.portList) // 港口
router.get('/s/rcl/port/code', rcl.testCodeImg)
router.get('/s/rcl/port/group/one', rcl.portGroupOne) // 一个组合
router.get('/s/rcl/port/group/all', rcl.mapPortGroup) // 组合
router.post('/s/rcl/port/local', rcl.portListLocal) // 本地港口列表
router.get('/s/rcl/test/rq', rcl.testRequest)

module.exports = router
