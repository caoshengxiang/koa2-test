const User = require('../schema/user')
const StatusCode = require('../../config/status_code')

// 用户详细
exports.getUser = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // * 所有请求，或指定http://localhost:8080
  ctx.body = {
    status: 'success',
    data: {
      name: 'allen',
      age: 24,
      sex: '男',
      icon: '',
      id: 1,
    },
  }
}

// 用户列表
// obj.find(查询条件,callback(err, data))
exports.userList = async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let reqBody = ctx.request.body // post参数
    console.log(ctx.request.params)
    User.find(reqBody, function (err, data) { // 加入条件查询
      if (err) {
        reject(err)
      } else {
        // if (data.length == 0) {
        //     resolve([])
        //
        // } else {
        //   resolve(data)
        // }
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

// 列表详细
exports.getUserInfo = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // * 所有请求，或指定http://localhost:8080
  let params = ctx.request.query // get 参数
  console.log(params, 'allen')
  await new Promise((resolve, reject) => {
    User.find({_id: params.id}, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data[0])
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

// 用户添加
// Model.create(文档数据, callback(err)))
exports.addUser = async (ctx, next) => {
  // console.log('add user', ctx.request.body)
  let reqBody = ctx.request.body
  await new Promise((resolve, reject) => {
    User.create(reqBody, function (err) {
      if (err) {
        reject('注册写入用户错误')
      } else {
        resolve('添加用户成功')
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

// 删除用户
// obj.remove(查询条件,callback(err))
exports.removeUser = async (ctx, next) => {
  let reqBody = ctx.request.body
  if (!reqBody.id) {
    ctx.body = {
      status: StatusCode.ERROR,
      data: '用户名，参数为空',
    }
  }
  await new Promise((resolve, reject) => {
    User.remove({_id: reqBody.id}, function (err) { // 删除
      if (err) {
        reject(err)
      } else {
        resolve('删除成功')
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

// 更新
// obj.update(查询条件,更新对象,callback(err))
exports.updateUser = async (ctx, next) => {
  let reqBody = ctx.request.body
  let reqParamsId = ctx.params.id // path 参数
  console.log(reqParamsId, 'allen up')
  new Promise((resolve, reject) => {
    User.update({ name: 'allen'}, {$set: reqBody}, function(err) { // todo 这个方法有问题?接口404，但是数据修改成功【找到原因$set中有_id】
      if (err) {
        console.log('error')
        reject(err)
      } else {
        console.log('succ', reqParamsId)
        resolve('更新成功')
      }
    })
    if (!reqBody.id) { // todo 没有reject 或者resolve 就会404 ？？？？
      resolve('修改错误，id不存在')
    }
  }).then((data) => {
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: data
    }
  }, (err) => {
    ctx.body = {
      status: StatusCode.ERROR,
      data: err
    }
  })
}