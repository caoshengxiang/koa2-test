const Chat = require('../schema/chat')
const StatusCode = require('../../config/status_code')
const cache = require('../../cashes/var')
// cache['clientChatDic'].set('100', {uid: 100})

module.exports = function (server) {
  var io = require('socket.io')(server)
  var group = {} // 用对象是可以去重用户得
  io.on('connection', function (socket) {
    // 服务端上线
    socket.on('SERVER_ON', function(data) {
      let serverChatEn = data.serverChatEn;
      console.log(`有新的服务端socket连接了，服务端Id：${serverChatEn.serverChatId}`);
      cache['serverChatDic'].set(serverChatEn.serverChatId, {
        serverChatEn: serverChatEn,
        socket: socket
      });
    });

    // 服务端下线
    socket.on('SERVER_OFF', function(data) {
      let serverChatEn = data.serverChatEn;
      cache['serverChatDic'].delete(serverChatEn.serverChatId);
    });

    // 服务端发送了信息
    socket.on('SERVER_SEND_MSG', function(data) {
      if (cache['clientChatDic'].has(data.clientChatId)) {
        cache['clientChatDic'].get(data.clientChatId).socket.emit('SERVER_SEND_MSG', { msg: data.msg });
      }
    });

    // 客户端事件；'CLIENT_ON'(上线), 'CLIENT_OFF'(离线), 'CLIENT_SEND_MSG'(发送消息)
    ['CLIENT_ON', 'CLIENT_OFF', 'CLIENT_SEND_MSG'].forEach((eventName) => {
      socket.on(eventName, (data) => {
        let clientChatEn = data.clientChatEn;
        let serverChatId = data.serverChatId;
        // 1.通知服务端
        if (cache['serverChatDic'].has(serverChatId)) {
          cache['serverChatDic'].get(serverChatId).socket.emit(eventName, {
            clientChatEn: clientChatEn,
            msg: data.msg
          });
        } else {
          socket.emit('SERVER_SEND_MSG', {
            msg: {
              content: '未找到客服'
            }
          });
        }

        // 2.对不同的事件特殊处理
        if (eventName === 'CLIENT_ON') {
          // 1)'CLIENT_ON'，通知客户端正确连接
          console.log(`有新的客户端socket连接了，客户端Id：${clientChatEn.clientChatId}`);
          cache['clientChatDic'].set(clientChatEn.clientChatId, {
            clientChatEn: clientChatEn,
            socket: socket
          });
          cache['serverChatDic'].has(serverChatId) &&
          socket.emit('SERVER_CONNECTED', {
            serverChatEn: cache['serverChatDic'].get(serverChatId).serverChatEn
          });
        } else if (eventName === 'CLIENT_OFF') {
          // 2)'CLIENT_OFF'，删除连接
          cache['clientChatDic'].delete(clientChatEn.clientChatId);
        }
      });
    });

    // console.log(socket.handshake.query)
    /*var currentUser = {//获取到的用户数据
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
    })*/
  })
}
