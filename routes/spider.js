const router = require('koa-router')()

router.prefix('/spider') // 接口在apider/


const baiduNews = require('../sql/spider/baiduNews')

router.get('/s/hot', baiduNews.hotList)
router.get('/s/jianshu', baiduNews.jianShuList)


module.exports = router
