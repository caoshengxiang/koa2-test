const jwt = require('jsonwebtoken')
const serect = 'token'  //密钥，不能丢
module.exports = (userinfo) => { //创建token并导出
  const token = jwt.sign({
    _id: userinfo._id,
    time: userinfo.time
  }, serect, { expiresIn: '2h' })
  return token
}
