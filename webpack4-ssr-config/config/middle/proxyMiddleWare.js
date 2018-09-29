/**
 * http代理中间件 匹配代理、请求重定向
 * 获取app.config.js配置文件，匹配proxy
 */
const urlUtils = require('url')
const koaHttpProxy = require('koa-better-http-proxy')
const compose = require('koa-compose')
const appConfig = require('./../../app.config')
const logger = require('./../logger/koa-logger')('proxyMiddleWare')

const isProd = process.env.NODE_ENV === 'production'

const needToken = !!appConfig.token
let proxyToken
if (needToken) {
  proxyToken = require('./proxyToken')()
}

/**
 * 代理处理中间件
 * @return {Function} koa middleware
 */
module.exports = function () {
  async function preProxyMiddleware(ctx, next) {
    const url = ctx.url
    logger.info(`Request '${url}'`)
    let proxyTarget
    let proxyConfig = appConfig.proxy
    // 在appConfig.proxy中寻找匹配前缀的代理
    for (const [prefix, target] of Object.entries(proxyConfig)) {
      if (url.startsWith(prefix)) {
        // 匹配替换
        ctx.url = url.replace(prefix, '')
        proxyTarget = target
        ctx._proxyTarget = proxyTarget
        logger.info(`Match to proxy: '${prefix}' => '${proxyTarget}'`)
        break
      }
    }
    if (!proxyTarget) {
      logger.info('Proxy not found')
      return Promise.resolve()
    }
    logger.info(`Will be Agent to '${proxyTarget + ctx.url}'`)
    return next()
  }

  /**
   * 顺序执行async函数
   */
  return compose([
    preProxyMiddleware,
    koaHttpProxy(
      (ctx) => {
        return ctx._proxyTarget
      },
      {
        // 不解析body，不限制body大小
        parseReqBody: false,
        /**
         * 发出代理请求前的回调,更改头文件
         * @param {Object} proxyReqOpts - 代理请求选项
         * @param {ctx} ctx - koa ctx
         * @return {Promise.<*>} *
         */
        async proxyReqOptDecorator(proxyReqOpts, ctx) {
          const parsedTarget = urlUtils.parse(ctx._proxyTarget, true)
          proxyReqOpts.host = parsedTarget.hostname
          proxyReqOpts.port = parsedTarget.port
          proxyReqOpts.https = parsedTarget.protocol === 'https:'

          // 去掉Referer头，否则可能会造成CSRF问题，影响开发
          if (!isProd) {
            delete proxyReqOpts.headers.Referer
            delete proxyReqOpts.headers.Origin
          }
          // 计时开始
          ctx._proxyStartTime = Date.now()
          if (!needToken) {
            return proxyReqOpts
          }
          return await proxyToken.handleRequest(ctx)
            .then((additionalHeaders) => {
              Object.assign(proxyReqOpts.headers, additionalHeaders)
            })
            .then(() => {
              return proxyReqOpts
            })
        },
        /**
         * 代理请求被响应后的回调
         * @param {Response} proxyRes - 代理请求选项
         * @param {Object} proxyResData - 响应数据
         * @param {ctx} ctx - koa ctx
         * @return {Promise.<*>} *
         */
        async userResDecorator(proxyRes, proxyResData, ctx) {
          logger.info('ProxyRes headers:', '\n', JSON.stringify(ctx.response.headers, null, 2))
          const location = `${ctx._proxyTarget}${ctx.url}`
          logger.info(`Proxy request '${location}' completed(${proxyRes.statusCode}), costing ${Date.now() - ctx._proxyStartTime}ms.`)
          if (!needToken) {
            return proxyResData
          }
          return await proxyToken.handleResponse(ctx)
            .then(() => {
              return proxyResData
            })
        },
      }),
  ])
}
