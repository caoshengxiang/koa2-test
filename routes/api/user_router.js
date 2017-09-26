const router = require('koa-router')()

router.prefix('/api')

const user_controller = require('../../controllers/user');

router.get('/getUser', user_controller.getUser);
router.post('/addUser', user_controller.addUser);

module.exports = router