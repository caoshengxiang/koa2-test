const StatusCode = require('../../config/status_code')

/*
*
* superagent （superagent是node里一个非常方便的、轻量的、渐进式的第三方客户端请求代理模块，用他来请求目标页面）
* cheerio （cheerio相当于node版的jQuery，用过jQuery的同学会非常容易上手。它主要是用来获取抓取到的页面元素和其中的数据信息）
* */

// 引入所需要的第三方包
const superagent = require('superagent')
const cheerio = require('cheerio')

// 百度新闻 热点新闻爬取
exports.hotList = async (ctx, next) => {
  let params = ctx.request.query // get 参数
  await new Promise((resolve, reject) => {
    // Product.findById(params.id, function (err, data) {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve(data)
    //   }
    // })
    superagent.get('http://news.baidu.com/').end((err, res) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.log(`热点新闻抓取失败 - ${err}`)
        reject(`热点新闻抓取失败 - ${err}`)
      } else {
        // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
        // 抓取热点新闻数据

        let hotNews = []
        // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中。

        /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
           以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
         */
        let $ = cheerio.load(res.text)

        // 找到目标数据所在的页面元素，获取数据
        $('div#pane-news ul li a').each((idx, ele) => {
          // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
          // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
          let news = {
            title: $(ele).text(),        // 获取新闻标题
            href: $(ele).attr('href')    // 获取新闻网页链接
          }
          hotNews.push(news)              // 存入最终结果数组
        })
        resolve(hotNews)
      }
    })
  }).then((data) => {
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: data,
    }
  }, (err) => {
    ctx.body = {
      status: StatusCode.ERROR,
      data: err,
    }
  })
}

/*简书首页列表爬取*/

exports.jianShuList = async (ctx, next) => {
  let params = ctx.request.query // get 参数
  await new Promise((resolve, reject) => {
    superagent.get('https://www.jianshu.com/')
      .query('seen_snote_ids%5B%5D=53366789&seen_snote_ids%5B%5D=19243324&seen_snote_ids%5B%5D=33011457&seen_snote_ids%5B%5D=9983984&seen_snote_ids%5B%5D=2398901&seen_snote_ids%5B%5D=22046963&seen_snote_ids%5B%5D=46026324&seen_snote_ids%5B%5D=14089338&seen_snote_ids%5B%5D=3862390&seen_snote_ids%5B%5D=15426969&seen_snote_ids%5B%5D=44818660&seen_snote_ids%5B%5D=52435223&seen_snote_ids%5B%5D=11260741&seen_snote_ids%5B%5D=25673304&seen_snote_ids%5B%5D=36114903&seen_snote_ids%5B%5D=38484201&seen_snote_ids%5B%5D=24621860&seen_snote_ids%5B%5D=10639982&seen_snote_ids%5B%5D=30243940&seen_snote_ids%5B%5D=36784359&seen_snote_ids%5B%5D=33425583&seen_snote_ids%5B%5D=6936677&seen_snote_ids%5B%5D=35378760&seen_snote_ids%5B%5D=3419509&seen_snote_ids%5B%5D=2300302&seen_snote_ids%5B%5D=20317894&seen_snote_ids%5B%5D=47267495&seen_snote_ids%5B%5D=18340804&seen_snote_ids%5B%5D=6594244&seen_snote_ids%5B%5D=7326431&seen_snote_ids%5B%5D=3072350&seen_snote_ids%5B%5D=3686276&seen_snote_ids%5B%5D=6684688&seen_snote_ids%5B%5D=17992051&seen_snote_ids%5B%5D=8305658&seen_snote_ids%5B%5D=16239730&seen_snote_ids%5B%5D=2812281&seen_snote_ids%5B%5D=42986059&seen_snote_ids%5B%5D=25486811&seen_snote_ids%5B%5D=26246830&seen_snote_ids%5B%5D=4753722&page=20')
      .end((err, res) => {
        if (err) {
          // 如果访问失败或者出错，会这行这里
          console.log(`抓取失败 - ${err}`)
          reject(`抓取失败 - ${err}`)
        } else {
          console.log('抓取成功 ok')

          let data = jianshuList(res)
          data.forEach(item => {
            // articleDetail(item).then(d)
          })
          resolve(data)
        }
      })
  }).then((data) => {
    ctx.body = {
      status: StatusCode.SUCCESS,
      data: data,
    }
  }, (err) => {
    ctx.body = {
      status: StatusCode.ERROR,
      data: err,
    }
  })

  function articleDetail (p) {
    return new Promise((resolve, reject) => {
      superagent.get(p.link).end((err, res) => {
        if (err) {
          reject(err)
        } else {
          let $ = cheerio.load(res.text)
          let obj = JSON.parse(JSON.stringify(p))
          obj['created'] = $('.s-dsoj').find('time').text()
          obj['len'] = $('.s-dsoj').find('span').eq(1)
          obj['read'] = $('.s-dsoj').find('span').eq(2)
          obj['content'] = $('._2rhmJa').html()
          resolve(obj)
        }
      })
    })
  }

  function jianshuList (res) {
    let $ = cheerio.load(res.text)
    let data = []
    $('ul.note-list li .content').each((idx, ele) => {
      let chiren = $(ele).children()
      let d = {
        idx: idx,
        title: $(chiren[0]).text(),
        link: 'https://www.jianshu.com/' + $(chiren[0]).attr('href'),
        intro: $(chiren[1]).text(),
        author: $(chiren[2]).find('.nickname').text(),
        authorLink: $(chiren[2]).find('.nickname').attr('href'),
        like: $(chiren[2]).find('span').eq(1).text(),
        money: $(chiren[2]).find('span').eq(2).text()
      }
      data.push(d)
    })
    return data
  }
}
