const Koa = require('koa')
const cors = require('koa2-cors') // 引入跨入插件
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const path = require('path')
const logger = require('koa-logger')
const StatusCode = require('./config/status_code')
const decodeToken = require('./utils/token/decodeToken')

const index = require('./routes/index')
const api = require('./routes/api')

// 测试websocket
// require('./sql/control/websocket')

//log工具
const logUtil = require('./utils/log_util')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))


/* post请求报错405， 是因为和bodyparser冲突，把bodyparser 全注释 */
app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding:'gzip', // 也会报错204
  formidable: {
    keepExtensions: true,    // 保持文件的后缀
    maxFileSize: 20*1024*1024,    // 设置上传文件大小最大限制，默认2M
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
app.use(cors()) // cors跨域

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        //记录响应日志
        // logUtil.logResponse(ctx, ms);

    } catch (error) {

        ms = new Date() - start;
        //记录异常日志
        // logUtil.logError(ctx, error, ms);
    }
});

app.use(async (ctx, next) => { // 登录验证拦截
  console.log(ctx.url)
  let url = ctx.originalUrl
  if (url.indexOf('/update') > -1 || url.indexOf('/add') > -1 || url.indexOf('/remove') > -1 || url.indexOf('/delete') > -1) { // 包含update说明是编辑接口
    let token = ctx.request.header.authkey;

    if (!token) {
      ctx.body = {
        status: StatusCode.ERROR,
        data: {
          error: '未登录，请重新登录！',
          code: 9999
        },
      }
    } else {
      let res = decodeToken(token) // res 对象，包含自定义加入字段，以及自动添加字段 iat: 生成token时间 单位s; exp: 生成token设置的到期时间 单位s
      // console.log(res)
      if (res && res.exp > new Date() / 1000) {
        await next();
      } else {
        ctx.body = {
          status: StatusCode.ERROR,
          data: {
            error: '登录过期，请重新登录！',
            code: 9998
          },
        }
      }
    }
  } else {
    //开始进入到下一个中间件
    await next();
  }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// 这些中间件是有顺序，前面先执行，next() 在执行下一个，所以登录验证要放在 路由前

module.exports = app
