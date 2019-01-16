const router = require('koa-router')()
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')
const request = require("request");
const Secret = require('../utils/secret')
const CryptoJS = require('crypto-js')

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})


router.get('/string', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // * 所有请求，或指定http://localhost:8080

  /*test criptojs*/
  // let encryptData = Secret.Encrypt('123')

  // ctx.body = 'aes secret: ' + encryptData
  let d = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('123456'))

  ctx.body = {
    data: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('123456')),
    text: CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse('MTIzNDU2')),
    md5: CryptoJS.MD5('123456').toString(),
  }
})

router.get('/json', async (ctx, next) => {

  let appid = 'wxdef9d8d3abee65ae'
  let secret = '7f2d47a777f4654f88851c410b45ff1a'
  let code = '023pooiW18tg2Z0qUBhW1ZI6iW1pooin'
  request.get({
    url:'https://api.weixin.qq.com/sns/jscode2session?appid='+ appid+
    '&secret='+ secret+
    '&js_code='+code+
    '&grant_type=authorization_code'
  }, function(err, response, body){
    let resdata = JSON.parse(response.body)
    console.log(resdata.session_key)

    var encryptedData = "mNBT9N86+49ISv1uKizqDQVCWjAeAcg+dlwI3Nm0YMT8qu1kxDczrp3IoQxY5MCNGv3yHgJNUeRMvabPQQrxgUAoI3J8AWaVIAt5ZduW8nnlbnjPqB61ZQu+0FA9jj359ZgprJD+8vApYl2GC+NlovluoHA7AwDPy3F7pIifja9LQl4tjv4ZarcRLHVaJfx6yJei3HepOpOAn3R3lb3odArvsWgbUb6PcFetli0GRTzOmICItL4CQe2vkVH71snTRnog6UQJ1DCz0N5DB8+EUN5EfKL70ZJk33NeUC9zptXfVJcaLewUq9fM8jIfiyCpG114FBC15Fr8FTdMxCYb3/hLWgRd2BZ61jdEuAmHfXtpI3oo39xH5cI9NFIBzxvtmJTQCj/a9feQ6S0vu9nRZb0O7u6nCeamkQ9LV2CE0nwS/2j1fjceAUSt4g8uwhVUP5c4WPJrygRscckPSM1CNmBO8ltIMjVkntf5yk3tid2309AwbR6kSRLSOSXxqXxEmjsxDfEQqQFwX6dKtNabRep2JkmfCMpA2fNfe8QOxJw="
    var iv = 'ZNC+i6qYM7qr0w+9Auhd0g=='
    var pc = new WXBizDataCrypt(appid, resdata.session_key)
    var data = pc.decryptData(encryptedData , iv)
    console.log('解密后 data: ', data)
  });

  ctx.body = {
    title: 'koa2 json by nodemon restart'
  }
})

module.exports = router
