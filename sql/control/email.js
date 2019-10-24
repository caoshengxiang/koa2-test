const Email = require('../schema/email')
const StatusCode = require('../../config/status_code')
const nodemailer = require('nodemailer')
const emailConfig = require('../../utils/emailConfig')
const transporter = nodemailer.createTransport(emailConfig)

// 详细
exports.detail = async (ctx, next) => {
  let params = ctx.request.query // get 参数
  await new Promise((resolve, reject) => {
    Email.findById(params.id, function (err, data) {
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
      data: {
        error: err
      },
    }
  })
}

// 列表
// Model.find(query, fields, options, callback)
exports.list = async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let { page = 1, size = 20, pos } =  ctx.request.query // get参数
    size = parseInt(size, 10)
    page = parseInt(page, 10) - 1
    console.log(ctx.request.params)

    const query = {}
    Email.find(query).skip(page * size).limit(size).exec(function (err, data) { // 加入条件查询
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
      data: {
        error: err
      },
    }
  })
}

// 添加
// Model.create(文档数据, callback(err)))
exports.add = async (ctx, next) => {
  let reqBody = ctx.request.body
  console.log(reqBody)
  await new Promise((resolve, reject) => {
    Email.create(Object.assign({}, { created: new Date().getTime() }, reqBody), function (err) {
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
      data: {
        error: err
      },
    }
  })
}

// 删除用户
// obj.remove(查询条件,callback(err))
exports.remove = async (ctx, next) => {
  let reqBody = ctx.request.query
  if (!reqBody.id) {
    ctx.body = {
      status: StatusCode.ERROR,
      data: {
        error: 'id，参数为空'
      },
    }
  }
  await new Promise((resolve, reject) => {
    Email.remove({ _id: reqBody.id }, function (err) { // 删除
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
      data: {
        error: err
      },
    }
  })
}

// 更新
// obj.update(查询条件,更新对象,callback(err))
exports.update = async (ctx, next) => {
  let reqBody = ctx.request.body
  let reqParamsId = ctx.params.id // path 参数
  new Promise((resolve, reject) => {
    Email.update({ _id: reqParamsId }, { $set: reqBody }, function (err) { // 这个方法有问题?接口404，但是数据修改成功【找到原因$set中有_id】
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
      data: {
        error: err
      },
    }
  })
}

// 发邮件
exports.send = async (ctx, next) => {
  let reqBody = ctx.request.body
  console.log(reqBody)
  let start = Date.now()
  let html = `
            <p>名字：${reqBody.name}</p>
            <p>邮箱: ${reqBody.email}</p>
            <p>电话：${reqBody.phone}</p>
            <p>公司：${reqBody.company}</p>
            <p>标题：${reqBody.title}</p>
            <p>内容：${reqBody.content}</p>
            `
  let mailOptions = {
    from: emailConfig.auth.user, // sender address
    to: emailConfig.auth.user, // list of receivers
    subject: '客户联系提醒---' + reqBody.title, // Subject line
    // text: 'Hello world ?', // plaintext body
    html: html // html body
  }
  await new Promise((resolve, reject) => {
    Email.create(Object.assign({}, {
      created: new Date().getTime(),
    }, reqBody), function (err) {
      if (err) {
        reject('写入错误')
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            reject('邮件发送错误')
            return console.log(error)
          }
          console.log('Message sent: ' + info.response)
          console.log('Finish send mail:' + Date.now())
          console.log(Date.now() - start)
          resolve('发送成功')
        })
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
      data: {
        error: err
      },
    }
  })
}
