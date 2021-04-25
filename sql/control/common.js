const StatusCode = require('../../config/status_code')
const request = require('request')
const fs = require('fs')
const path = require('path')

// koa-body 上传 (单文件)
exports.upload = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  // 上传单个文件
  console.log(ctx.request.body)
  const file = ctx.request.files.file // 获取上传文件

  // console.log(file)
  // ctx.body = file

  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let nFileNeme = `/${new Date().getTime()}-${file.name}`
  let filePath = path.join(__dirname, '../../public/uploads/')
  let fileResource = filePath + nFileNeme

  if (!fs.existsSync(filePath)) {  //判断staic/upload文件夹是否存在，如果不存在就新建一个

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
