
// 获取用户
exports.getUser = async(ctx, next) => {
    ctx.body = [{
        username: 'allen',
        age: 24,
        sex: '男',
        icon: '',
        id: 1
    }]
}

exports.addUser = async(ctx, next) => {
    console.log('add user', ctx.request.body)
}