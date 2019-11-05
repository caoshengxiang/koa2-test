const router = require('koa-router')()

router.prefix('/spider') // 接口在apider/


const baiduNews = require('../sql/spider/baiduNews')
const rcl = require('../sql/spider/rcl')

router.get('/s/hot', baiduNews.hotList)
router.get('/s/jianshu', baiduNews.jianShuList)


router.get('/s/rcl/port/list', rcl.portList)
router.get('/s/rcl/port/code', rcl.testCodeImg)
router.get('/s/rcl/port/group', rcl.portGroup)
router.get('/s/rcl/port/group/all', rcl.mapPortGroup)
router.post('/s/rcl/test', rcl.testPost)
router.get('/s/rcl/test/rq', rcl.testRequest)

module.exports = router
