const StatusCode = require('../../config/status_code')
const request = require('request')
const fs = require('fs')
const path = require('path')

// const multer = require('koa-multer')//加载koa-multer模块

// const storage = multer.diskStorage({
//   //文件保存路径
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   //修改文件名称
//   filename: function (req, file, cb) {
//     let fileFormat = (file.originalname).split('.')
//     cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
//   }
// })
// exports.uploadConfig = multer({ storage: storage }) //加载配置
//

// koa-bodyparser 上传
// exports.upload = async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   // await new Promise((resolve, reject) => {
//   //
//   // }).then((data) => {
//   //   ctx.body = {
//   //     status: StatusCode.SUCCESS,
//   //     data: data[0],
//   //   }
//   // }, (err) => {
//   //   ctx.body = {
//   //     status: StatusCode.ERROR,
//   //     data: {
//   //       error: err
//   //     },
//   //   }
//   // })
//   ctx.body = {
//     status: StatusCode.SUCCESS,
//     data: {
//       url: 'uploads/' + ctx.req.file.filename
//     }
//   }
// }

// 腾讯对象存储
// const constConfig = require('../../config/const_config')
// const COS = require('cos-nodejs-sdk-v5');
// const cos = new COS({
//   SecretId: constConfig.SecretId,
//   SecretKey: constConfig.SecretKey
// });

// koa-body 上传 (单文件)
exports.upload2 = async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件

  console.log(file)
  // ctx.body = file

  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let nFileNeme = `/${new Date().getTime()}-${file.name}`
  let filePath = path.join(__dirname, '../../public/uploads/')
  let fileResource = filePath + nFileNeme

  if(!fs.existsSync(filePath)) {  //判断staic/upload文件夹是否存在，如果不存在就新建一个

    fs.mkdir(filePath, (err) => {

      if (err) {

        throw new Error(err)

      } else {
        // 创建可写流
        const upStream = fs.createWriteStream(fileResource)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
        ctx.body = {
          status: StatusCode.SUCCESS,
          data: {
            url: 'uploads' + nFileNeme
          }
        }
      }
    })
  } else {
    // 创建可写流
    const upStream = fs.createWriteStream(fileResource)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: {
        url: 'uploads' + nFileNeme
      }
    }
  }
}

// 请求外部接口上传os
exports.uploadOs = async (ctx, next) => {
  // ctx.body = {
  //   data: ctx.request.body
  // }
  let formData = {
    // 普通文本
    // name: 'value',
    // 文件
    file: ctx.request.files,
  }
  request.post({ url: 'http://119.27.160.97:7995/suining/file/upload', formData }, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      console.log(body) // 请求成功的处理逻辑
      ctx.body = {
        status: StatusCode.SUCCESS,
        data: {
          url: '',
          error: error,
          res: response,
          body: body
        }
      }
    } else {
      ctx.body = {
        data: '错误！'
      }
    }
  })

  // http://119.27.160.97:7995/suining/banner/lisPages?type=1


  // request('http://119.27.160.97:7995/suining/banner/lisPages?type=1', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(body) // Show the HTML for the baidu homepage.
  //     ctx.body = body
  //   }
  // })
}
