/**
 * Created by liuzhengdong on 2017/9/7.
 * 错误处理中间件
 * @param {ctx} ctx koa ctx
 * @param {Function} next koa next */

module.exports = async function (ctx, next) {
  try {
    // Node标识
    ctx.set('X-Proxy', 'Node Server')
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = 'We are sorry. Internal server error occurred.'
    ctx.app.emit('error', err, ctx)
  }
}
