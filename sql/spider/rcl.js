const StatusCode = require('../../config/status_code')

/*
*
* superagent （superagent是node里一个非常方便的、轻量的、渐进式的第三方客户端请求代理模块，用他来请求目标页面）
* cheerio （cheerio相当于node版的jQuery，用过jQuery的同学会非常容易上手。它主要是用来获取抓取到的页面元素和其中的数据信息）
* */

// 引入所需要的第三方包
const superagent = require('superagent')
const cheerio = require('cheerio')
const tesseract = require('tesseract.js')
const FormData = require('form-data')
const PARAMS = require('../test')

exports.testPost = async (ctx, next) => {
  let params = ctx.request.body
  ctx.body = params
}

exports.portGroup = async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let form = new FormData()
    for (let key in PARAMS.params) {
      form.append('key', PARAMS.params[key])
    }
    superagent.POST('https://www.rclgroup.com/210Sailing_Schedule019')
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3')
      .set('Accept-Encoding', 'gzip, deflate, br')
      .set('Accept-Language', 'zh-CN,zh;q=0.9')
      .set('Cache-Control', 'max-age=0')
      .set('Connection', 'keep-alive')
      .set('Content-Length', '17396')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Cookie', 'cookiesession1=4860C136OTGPEY95UOJ8WIAH3EJL6F92; _ga=GA1.2.383328044.1572849733; _gid=GA1.2.1411074388.1572849733')
      .set('Host', 'www.rclgroup.com')
      .set('Origin', 'https://www.rclgroup.com')
      .set('Referer', 'https://www.rclgroup.com/Home')
      .set('Sec-Fetch-Mode', 'navigate')
      .set('Sec-Fetch-Site', 'none')
      .set('Sec-Fetch-User', '?1')
      .set('Upgrade-Insecure-Requests', '1')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.62 Safari/537.36')
      .send(form)
      .then(res => {
      resolve(res.text)
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
      resolve(dataArr)
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
