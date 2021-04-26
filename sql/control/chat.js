const Chat = require('../schema/chat')
const StatusCode = require('../../config/status_code')
const cache = require('../../cashes/var')

// 用户列表
// obj.find(查询条件,callback(err, data))
exports.chatList = async (ctx, next) => {
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

exports.getIMServerList = async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let reqBody = ctx.request.body // post参数
    resolve({
      code: 0,
      records: Array.from(cache['serverChatDic'].values()).map((item) => {
        return item.serverChatEn
      }) // 只需要serverChatDic.values内的serverChatEn
    })
  }).then((data) => {
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: data,
    }
  })
}
