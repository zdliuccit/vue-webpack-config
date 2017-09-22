/**
 * token处理
 * @type {string}
 */
const logger = require('./logger/koa-logger')('proxyMiddleWare')
// 带token http头
const accessTokenHeaderName = 'x-access-token'
// 请求来源 http头
const accessOriginHeaderName = 'x-access-origin'

// 默认cookie配置
const defaultCookieConfig = {
  name: '_atk',
  httpOnly: true,
  overwrite: true,
  // 长期有效(20年)
  maxAge: 1000 * 60 * 60 * 24 * 365 * 20,
}

module.exports = function createRedis () {
  const cookieConfig = Object.assign({}, defaultCookieConfig)

  return {
    /**
     * 处理请求时的token操作
     * @param {ctx} ctx - koa ctx
     * @return {Object} - 需要添加的header头
     */
    async handleRequest(ctx) {
      return {
        [accessOriginHeaderName]: ctx.query.accessOrigin || 'WAP',
      }
    },
    /**
     * 处理响应时的token操作
     * @param {ctx} ctx - koa ctx
     */
    async handleResponse(ctx) {
      logger.info('HandleResponse headers:', ctx.response.headers)
      const responseToken = ctx.response.headers[accessTokenHeaderName]
      // 如果后端响应头里没有token，则不设置cookie
      if (!responseToken) {
        return
      }
      logger.info(`Token found: ${responseToken}', it will be set to cookie.`)
      // 这里koa-better-http-proxy已经把代理响应头复制到原始响应头了
      ctx.cookies.set(cookieConfig.name, responseToken, cookieConfig)

      // 删除代理响应的"X-Access-Token"http头
      delete ctx.response.headers[accessTokenHeaderName]
      delete ctx.response.headers[accessOriginHeaderName]
    },
  }
}
