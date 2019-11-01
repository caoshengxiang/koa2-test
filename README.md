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

## [mongose](http://www.nodeclass.com/api/mongoose.html)

## 参考：
[「新手向」koa2从起步到填坑](http://www.jianshu.com/p/6b816c609669)

[github项目](https://github.com/guo-yu/koa-guide)

### 数据库目录

* mongodb安装目录/data
    * db
    * log
* Server
* mongod.cfg

### 数据库启动

这是我window下的数据库目录
```shell
D:\an\mongodb\bin>mongod --dbpath D:\an\mongodb\data\db --logpath D:\an\mongodb\data\log\mongod.log
```

### mongodb可视化
[介绍一款好用 mongodb 可视化工具](https://cloud.tencent.com/developer/news/334105)

> D:\an\工具\adminMongo  本地运行 `npm start`

### 开机启动



### 启动配置文件

### 帮助

[socket.io 中文手册](https://www.cnblogs.com/lxxhome/p/5980615.html)


# 生产部署
1.[使用pm2部署node koa2项目并实现自动重启](https://blog.csdn.net/ziwoods/article/details/72833233)



# 服务器启动

##  mongodb
  1. 启用 `./mongod --config mongodb.conf`  
  [参考链接](https://www.cnblogs.com/ontoweb-zp/p/7670694.html)

## 启动nginx


## 部署项目
 1. 注意切换分支
 2. 安装依赖包
 3. 注意是否有上传目录  /public/uploads ,没有uploads目录就新建
 
## 更新
 1. `cd koa2-test`    执行 `git pull`     pm2 使用了--watch 参数会自动检测变化重启


## 服务器安装配置说明

1. [nginx](https://www.cnblogs.com/jimisun/p/8057156.html)
> 直接安这个教程安装就可以，可以提升下版本  目录: cd /usr/local/nginx

2. [node](https://www.cnblogs.com/zeussbook/p/11009639.html)
> 直接安这个教程安装就可以，可以提升下版本 , 目录 cd /usr/local/node 下载也下载这个目录下解压

3. [mongodb](https://www.cnblogs.com/ontoweb-zp/p/7670694.html)
> 直接安这个教程安装, wget 直接修改下载版本号为4.2.1  目录 cd /usr/local/mongodb  注意目录 解压 改名为mongodb4.2.1 再这个目录下建data 再data目录下直接建db 和 logs

```mongodb.conf
    
    # 创建配置文件 mongodb.conf：
    vi mongodb.conf
    
     #设置数据文件的存放目录
    dbpath = /usr/local/mongodb/mongodb4.2.1/data/db
    
    # 设置日志文件的存放目录及其日志文件名
    logpath = /usr/local/mongodb/mongodb4.2.1/data/logs/mongodb.log
    
    # 设置端口号（默认的端口号是 27017）
    port = 27017
    
    # 设置为以守护进程的方式运行，即在后台运行
    fork = true
    
    # nohttpinterface = true
    # nohttpinterface = true #这个报错 注释掉Error parsing INI config file: unrecognised option 'nohttpinterface'
    
    #ip限制如果指定ip使用的话
    bind_ip = 0.0.0.0
```

4. [git](https://git-scm.com/download/linux) 
>4.1  直接 yum install git 安装; 
 4.2 也可以[解压安装](https://www.cnblogs.com/gaogaoyanjiu/p/9463879.html)
 4.3 [git初始配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)
