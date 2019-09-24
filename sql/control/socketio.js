const Chat = require('../schema/chat')
const StatusCode = require('../../config/status_code')

module.exports = function (server) {
  var io = require('socket.io')(server)
  var group = {} // 用对象是可以去重用户得
  io.on('connection', function (socket) {
    // console.log(socket.handshake.query)
    var currentUser = {//获取到的用户数据
      uid: socket.handshake.query.id,
      socket: socket,
    }
    group[currentUser.uid] = currentUser//保存用户连接
    let connectionNum = 0
    for (let key in group) {
      connectionNum++
    }
    console.log('会话人数：'+ connectionNum)

    socket.emit('news', {from: '聊天助手', to: '_ALL', sendTime: Date.parse(new Date()),content: '欢迎来到聊天室！'})

    currentUser.socket.on('client', function (data) {
      // console.log(data)
      new Promise((resolve, reject) => {
        let saveMsg = {
          from: data.from,
          to: data.to,
          sendTime: Date.parse(new Date()),
          content: data.content,
        }
        Chat.create(saveMsg, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(saveMsg)
          }
        })
      }).then((data) => {
        // currentUser.socket.emit('news', data)
        for (let key in group) {
          group[key].socket.emit('news', data)
        }
      }, (err) => {
        console.log(err)
      })
    })
  })
}
