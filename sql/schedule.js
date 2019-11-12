const schedule = require('node-schedule')
const superagent = require('superagent')
const Rcl = require('./schema/rcl')
const Port = require('./schema/port')
const PortGroup = require('./schema/portGorup')
const logUtil = require('./../utils/log_util')

let scheduleTask = null

module.exports = task1 = () => {
  //每分钟的1-10秒都会触发，其它通配符依次类推
  scheduleTask = schedule.scheduleJob('1 22 * * * *', () => {
    console.log('scheduleCronstyle:' + new Date())
    superagent.get('http://localhost:3000/spider/s/rcl/port/list').then(portDa => {
      logUtil.spiderLogger(`定时任务---组合查询-获取港口数据-成功。`)
      superagent.get('http://localhost:3000/spider/s/rcl/port/group/all').then(gDa => {
        logUtil.spiderLogger(`定时任务---任务返回- ${JSON.stringify(gDa.text)}`)
      }).catch(err => {
        logUtil.spiderLogger('定时任务---组合查询有错误（停止）')
      })
    }).catch(err => {
      logUtil.spiderLogger('定时任务---组合查询-获取港口数据-失败（停止）')
      logUtil.spiderLogger(`${err}`)
    })
  })
}
