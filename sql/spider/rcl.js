const StatusCode = require('../../config/status_code')
const Rcl = require('../schema/rcl')
const Port = require('../schema/port')

/*
*
* superagent （superagent是node里一个非常方便的、轻量的、渐进式的第三方客户端请求代理模块，用他来请求目标页面）
* cheerio （cheerio相当于node版的jQuery，用过jQuery的同学会非常容易上手。它主要是用来获取抓取到的页面元素和其中的数据信息）
* */

// 引入所需要的第三方包
const superagent = require('superagent')
const cheerio = require('cheerio')
const tesseract = require('tesseract.js')
const PARAMS = require('../test')
const moment = require('moment')

exports.testPost = async (ctx, next) => {
  let params = ctx.request.body
  console.log('params', params)
  ctx.body = {
    text: PARAMS.html
  }
}
exports.testRequest = async (ctx, next) => { // 测试请求post
  await new Promise((resolve, reject) => {
    superagent.post('http://localhost:3000/spider/s/rcl/test')
      .type('form')
      .send({ id: '1' })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log('错误')
        reject(err)
      })
  }).then(da => {
    ctx.body = {
      data: da
    }
  }).catch(err => {
    console.log('这里发生错误')
    ctx.body = {
      error: err
    }
  })
}

exports.mapPortGroup = async (ctx, next) => { // 港口组合
  async function group (CNARR, OTHERARR) {
    // try {
    //   const result = await superagent.get('http://localhost:3000/spider/s/rcl/port/group/all').query({
    //     pol: pol,
    //     pod: pod
    //   })
    // } catch (error) {
    //   console.error(error)
    // }
    // for (let i = 0; i < CNARR.length; i++) {
    for (let [j, kj] of OTHERARR.entries()) {
      const result = await superagent.get('http://localhost:3000/spider/s/rcl/port/group/all').query({
        pol: CNARR[0],
        pod: OTHERARR[j]
      })
      console.log({
        pol: CNARR[0],
        pod: OTHERARR[j]
      })
    }
    // }
  }

  await new Promise((resolve, reject) => {
    Port.find().then(da => {
      let CNARR = []
      let OTHERARR = []
      da.map((item => {
        if (item.portCode.substr(0, 2) == 'CN') {
          CNARR.push(item.portCode)
        } else {
          OTHERARR.push(item.portCode)
        }
        group(CNARR,OTHERARR)

      }))
    }).catch(err => {
      reject(err)
    })
  }).then(da => {
    ctx.body = {
      data: da
    }
  }).catch(err => {
    ctx.body = {
      error: err
    }
  })
}

exports.portGroup = async (ctx, next) => { // 起点终点查询
  let q = ctx.request.query
  let pa = Object.assign({}, PARAMS.params, {
    ctl00$ContentPlaceHolder1$vsdate: moment().format('DD/MM/YYYY'),
    ctl00$ContentPlaceHolder1$vsLoading: q.pol,
    ctl00$ContentPlaceHolder1$vsDischarge: q.pod
  })
  await new Promise((resolve, reject) => {
    superagent.post('https://www.rclgroup.com/210Sailing_Schedule019')
      .type('form')
      .send(pa)
      .then(res => {
        let data = []
        let $ = cheerio.load(res.text)
        let trLength = $('#vesseltable tbody tr').length
        $('#vesseltable tbody tr').each((inx, ele) => {
          let dObj = {}
          if ($(ele).find('td').length > 1) {
            $(ele).find('td').each((index, tdEle) => {
              console.log($(tdEle).attr('data-label'))
              switch ($(tdEle).attr('data-label')) {
                case 'Vessel Name':
                  dObj.VESSEL = $(tdEle).text()
                  break
                case 'Voy No':
                  dObj.VOYAGE = $(tdEle).text()
                  break
                case 'Port of Loading':
                  dObj.POL_NAME_EN = $(tdEle).text()
                  break
                case 'Loading Port(Arrival)':
                  dObj.LPA = $(tdEle).text()
                  break
                case 'Loading Port(Departure)':
                  dObj.ETD = $(tdEle).text()
                  break
                case 'Port of Discharge':
                  dObj.POD_NAME_EN = $(tdEle).text()
                  break
                case 'Destination Arrival':
                  dObj.ETA = $(tdEle).text()
                  break
                case 'Transit Time':
                  dObj.TRANSIT_TIME = $(tdEle).text()
                  break
                case 'Vessel Flag':
                  dObj.FLAG = $(tdEle).text()
                  break
                // case '':
                //   // dObj.IS_TRANSIT = 0
                //   break
                default:
                  break
              }
            })
            if (dObj.VESSEL) {
              data.push(dObj)
            }
          }
        })
        Rcl.insertMany(data, function (err) { // 存入多条数据
          if (err) {
            console.log('写入错误')
            reject(err)
          } else {
            console.log('批量写入')
            resolve(data)
          }
        })
      })
      .catch(err => {
        reject(err)
      })
  }).then(da => {
    ctx.body = {
      data: da
    }
  }).catch(err => {
    ctx.body = {
      error: err
    }
  })
}

exports.portList = async (ctx, next) => {
  let params = ctx.request.query // get 参数
  await new Promise((resolve, reject) => {
    superagent.get('https://www.rclgroup.com/Home#sailing').then(res => {
      let $ = cheerio.load(res.text)
      let dataArr = []
      $('#ContentPlaceHolder1_vsLoading option').each((idx, ele) => {
        // console.log($(ele).text())
        let textArr = $(ele).text().split(' - ')
        let obj = {
          portCode: textArr[0],        // 获取新闻标题
          port: textArr[1]    // 获取新闻网页链接
        }
        dataArr.push(obj)
      })

      Port.remove().then(() => {
        console.log('删除')
        Port.insertMany(dataArr, function (err) { // 存入多条数据
          if (err) {
            console.log('写入错误')
            reject(err)
          } else {
            console.log('批量写入')
            resolve(dataArr)
          }
        })
      })
    }).catch(err => {
      reject(err)
    })
  }).then(da => {
    console.log('数据获取正常')
    // Port.create(da[0]).then((d) => {
    //   console.log('create', d)
    //   ctx.body = {
    //     data: da[0]
    //   }
    // })
    ctx.body = {
      data: da
    }
  }).catch(err => {
    ctx.body = {
      error: err
    }
  })
}

exports.testCodeImg = async (ctx, next) => {
  let params = ctx.request.query // get 参数
  await new Promise((resolve, reject) => {
    tesseract.recognize(
      // 'https://www.rclgroup.com/admin/CommonCx/captcha/captcha.jpg?v=0345',
      // 'https://www.rclgroup.com/admin/CommonCx/captcha/captcha.jpg?v=5233',
      'https://www.rclgroup.com/admin/CommonCx/captcha/captcha.jpg?v=5734',
      'eng'
    )
      .progress(function (p) { console.log('progress', p) })
      .then(function (result) {
        console.log(result.text)
        resolve(result.text)
      }).catch(err => {
      reject(err)
    })

    /*
    *
    *
    * 其中，myImage可以是图片file对象，或者图片的存放地址的字符串等，我们这里先用存放地址的字符串。
    * options则是对解析过程的个性化设置，可以设置语言等其他属性，较为重要的有lang属性，用来设置语言类型，英文为eng（默认）,数字是Math.
    * tesseract.recognize(myImage,options)
    * .then(function(result){
    *     console.log(result)
    * });
    *
    *
    * */
    // tesseract.recognize(
    //   'https://tesseract.projectnaptha.com/img/eng_bw.png',
    //   'eng',
    //   // { logger: m => console.log(m) }
    // ).then(data => {
    //   console.log(data.text)
    //   resolve(data.text)
    // }).catch(err => {
    //   reject(err)
    // })
  }).then(da => {
    ctx.body = {
      data: da
    }
  }).catch(err => {
    ctx.body = {
      error: err
    }
  })
}
