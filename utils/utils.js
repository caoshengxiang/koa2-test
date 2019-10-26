/* 过滤拦截 */

exports.localFilter = (ctx) => {
  let url = ctx.originalUrl
  if (url.indexOf('update') > -1) { // 包含update说明是编辑接口
  } else {
  }
}
