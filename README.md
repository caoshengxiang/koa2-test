# koa2-test

## 运行环境
> node7.6以上

## nodemon 重启服务器
dodemon.json配置解释: http://www.jscss.cc/2016/10/31/nodemon.html
> 作用相同的supervisor

## pm2 node进程管理
> 错误,(一定注意权限)
>events.js:161
       throw er; // Unhandled 'error' event
       ^

 Error: connect EACCES /home/allen/.pm2/rpc.sock
     at Object.exports._errnoException (util.js:1028:11)
     at exports._exceptionWithHostPort (util.js:1051:20)
     at PipeConnectWrap.afterConnect [as oncomplete] (net.js:1090:14)
> 权限不够

## 启动命令
```
   npm start //
   npm run dev //
   npm run prd
```


# 入门koa2,,,koa-generator
[使用参考](http://www.jianshu.com/p/6b816c609669)

### log4js