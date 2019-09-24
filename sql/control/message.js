const Message = require('../schema/massage')
const StatusCode = require('../../config/status_code')

// 添加消息
// Model.create(文档数据, callback(err)))
exports.addMessage = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let reqBody = ctx.request.body
  await new Promise((resolve, reject) => {
    Message.create(reqBody, function (err) {
      if (err) {
        reject('错误')
      } else {
        resolve('添加成功')
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
