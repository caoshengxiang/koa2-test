const StatusCode = require('../../config/status_code')

exports.upload = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await new Promise((resolve, reject) => {
    let reqBody = ctx.request.body // post参数
    // console.log(ctx.request.params)
    Chat.find(reqBody, function (err, data) { // 加入条件查询
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }).then((data) => {
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: data,
    }
  }, (err) => {
    ctx.body = {
      status: StatusCode.ERROR,
      data: err,
    }
  })
}
