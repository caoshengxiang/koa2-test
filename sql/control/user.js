const User = require('../schema/user')

exports.userList = async(ctx, next) => {
    await new Promise((resolve, reject)=>{
        User.find({name: 'allen'}, function (err, data) {
            if(err) {
                reject(err)
            } else {
                if(data.length == 0) {
                    reject('该用户不存在')
                    User.create({
                        name: 'allen',
                        age: 18
                    }, function (err) {
                        if(err) {
                            console.log('注册写入用户错误')
                        } else {
                            console.log('添加用户')
                        }
                    })
                } else {
                    resolve(data)
                }
            }
        })
    }).then((data)=>{
        ctx.body = data
    }, (err)=>{
        ctx.body = err
    })
}