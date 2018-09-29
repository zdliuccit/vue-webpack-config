/**
 * 生产环境屏蔽
 * 黑科技----手动在浏览器地址栏输入url，达到设置cookie的效果
 * 比如在页面上输入 http://192.168.144.64:8023/set-cookie?name=aaa&value=111
 * 将会写入key为aaa值为111的cookie到浏览器中
 * @param {Object} ctx koa ctx
 * @param {Function} next koa next
 * @return {Promise} promise
 */
// eslint-disable-next-line consistent-return
module.exports = async function (ctx, next) {
  if (ctx.path !== '/set-cookie') {
    return next()
  }
  const params = ctx.query
  ctx.set('Set-Cookie', `${params.name}=${params.value}; Path=/; HttpOnly`)
  ctx.body = `Cookie '${params.name}' has been successfully set to '${params.value}'!`
}
