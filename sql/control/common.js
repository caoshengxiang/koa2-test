const StatusCode = require('../../config/status_code')
const multer = require('koa-multer')//加载koa-multer模块
const request = require('request')

const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
exports.uploadConfig = multer({ storage: storage }) //加载配置

exports.upload = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  // await new Promise((resolve, reject) => {
  //
  // }).then((data) => {
  //   ctx.body = {
  //     status: StatusCode.SUCCESS,
  //     data: data[0],
  //   }
  // }, (err) => {
  //   ctx.body = {
  //     status: StatusCode.ERROR,
  //     data: {
  //       error: err
  //     },
  //   }
  // })
  ctx.body = {
    status: StatusCode.SUCCESS,
    data: {
      url: 'uploads/' + ctx.req.file.filename
    }
  }
}


// 腾讯对象存储
// const constConfig = require('../../config/const_config')
// const COS = require('cos-nodejs-sdk-v5');
// const cos = new COS({
//   SecretId: constConfig.SecretId,
//   SecretKey: constConfig.SecretKey
// });

// 请求外部接口上传os
exports.uploadOs = async (ctx, next) => {
  ctx.body = {
    data: ctx.request.body
  }
  let formData = {
    // 普通文本
    // name: 'value',
    // 文件
    file: ctx.request.body.file,
  }
  request.post({url: 'http://119.27.160.97:7995/suining/file/upload', formData: formData,  function (error, response, body) {

      if (!error && response.statusCode == 200) {
        console.log(body) // 请求成功的处理逻辑
      }
    ctx.body = {
        status: StatusCode.SUCCESS,
        data: {
          url:  '',
          error: error,
          res: response,
          body: body
        }
      }
  }})
}
