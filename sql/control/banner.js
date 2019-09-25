const Banner = require('../schema/banner')
const StatusCode = require('../../config/status_code')

// 详细
exports.getBannerDetail = async (ctx, next) => {
  let params = ctx.request.query // get 参数
  await new Promise((resolve, reject) => {
    Banner.find({ _id: params.id }, function (err, data) {
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

// 列表
// obj.find(查询条件,callback(err, data))
exports.bannerList = async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let { page = 1, size = 20 } = ctx.request.body // post参数
    console.log(ctx.request.params)
    Banner.find(reqBody, {
      limit: size,
      offset: page * size,
      sort: {_id: -1}
    }, function (err, data) { // 加入条件查询
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

// 添加
// Model.create(文档数据, callback(err)))
exports.addBanner = async (ctx, next) => {
  let reqBody = ctx.request.body
  await new Promise((resolve, reject) => {
    Banner.create(reqBody, function (err) {
      if (err) {
        reject('写入错误')
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

// 删除用户
// obj.remove(查询条件,callback(err))
exports.removeBanner = async (ctx, next) => {
  let reqBody = ctx.request.query
  if (!reqBody.id) {
    ctx.body = {
      status: StatusCode.ERROR,
      data: 'id，参数为空',
    }
  }
  await new Promise((resolve, reject) => {
    Banner.remove({_id: reqBody.id}, function (err) { // 删除
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
exports.updateBanner = async (ctx, next) => {
  let reqBody = ctx.request.body
  let reqParamsId = ctx.params.id // path 参数
  new Promise((resolve, reject) => {
    Banner.update({ _id: reqParamsId}, {$set: reqBody}, function(err) { // 这个方法有问题?接口404，但是数据修改成功【找到原因$set中有_id】
      if (err) {
        console.log('error')
        reject(err)
      } else {
        console.log('succ', reqParamsId)
        resolve('更新成功')
      }
    })
    if (!reqBody.id) { // 没有reject 或者resolve 就会404 ？？？？
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
