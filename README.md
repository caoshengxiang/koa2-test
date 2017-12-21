# koa2-test

## 运行环境
> node7.6以上

## 目录规划

* bin // run
* config // 配置文件
    * db_bonfig.js // 数据库配置
    * log_config.js // 日志配置
    * server_config.js // 服务配置
    * status_code.sj // 返回状态和状态码的配置
* logs // 日志目录
    * error // 错误日志
    * response　// response 普通响应日志 (还可以继续拆分，系统日志，业务日志)
* node_modules
* public　// 静态目录
* routes
    * index.js // 处理根路由下接口，如：index.html
    * api.js // 总路由配置,接口统一在/api/下
    * ...
* sql // 业务侧代码
    * control // 与路由关联的api方法
    * schema // 数据模型
    * db.js // 数据库链接
* utils // 公用方法
    * log_util.js // 日志打印格式方法
* views // 页面层
* .babelrc
* .gitignore
* app.js // 入口文件
* nodemon.json // nodemon配置
* package.json
* processes.json　// 日志配置
* README.md　// 项目描述

## koa-generator　构建工具

`npm install -g koa-generator`

`koa2 koa2-test`

`npm install`

## 启动命令
```
   npm start //
   npm run dev // nodemon
   npm run prd
```

## nodemon 重启服务器
dodemon.json配置解释: http://www.jscss.cc/2016/10/31/nodemon.html
> 作用相同的supervisor

## pm2 node进程管理
PM2 是一个带有负载均衡功能的 Node 应用的进程管理器。
[PM2  使用介绍](https://segmentfault.com/a/1190000002539204)
> 错误,(一定注意权限)
>events.js:161
       throw er; // Unhandled 'error' event
       ^

 Error: connect EACCES /home/allen/.pm2/rpc.sock
     at Object.exports._errnoException (util.js:1028:11)
     at exports._exceptionWithHostPort (util.js:1051:20)
     at PipeConnectWrap.afterConnect [as oncomplete] (net.js:1090:14)
> 权限不够

## log4js
// todo


## mongodb

## 参考：
[「新手向」koa2从起步到填坑](http://www.jianshu.com/p/6b816c609669)

[github项目](https://github.com/guo-yu/koa-guide)