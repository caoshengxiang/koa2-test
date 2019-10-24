const User = require('../schema/user')
const StatusCode = require('../../config/status_code')

// 用户登录
// obj.find(查询条件,callback(err, data))
exports.userLogin = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await new Promise((resolve, reject) => {
    let reqBody = ctx.request.body // post参数
    User.find({name: reqBody.name, password: reqBody.password}, function (err, data) { // 加入条件查询
      if (err) {
        reject(err)
      } else if (data.length <=0) {
        reject('账号不存在或密码错误！')
      } else {
        resolve(data)
      }
    })
  }).then((data) => {
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: data[0],
    }
  }, (err) => {
    ctx.body = {
      status: StatusCode.ERROR,
      data: {
        error: err
      },
    }
  })
}
