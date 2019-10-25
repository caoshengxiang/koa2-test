const StatusCode = require('../../config/status_code')
const multer = require('koa-multer')//加载koa-multer模块

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
