/**
 * Created by liuzhengdong on 2017/9/6.
 */
const path = require('path')
const urlUtils = require('url')
const koaHttpProxy = require('koa-better-http-proxy')
const compose = require('koa-compose')
const appConfig = require('./../../app.config')

const needToken = !!appConfig.token
let tokenManager
if (needToken) {
  tokenManager = require('./token')(appConfig.token)
}

const IS_DEBUG = process.env.NODE_ENV === 'development' // 是否开发模式
/**
 * 获取代理配置
 * @return {*} 代理配置
 */
function getProxyConfig () {
  if (!IS_DEBUG) {
    return appConfig.proxy
  }
  // 开发模式每次改写代理配置，都清除缓存, 重新读取,
  // 开发模式每次都join一遍，忽略性能问题啦嘿嘿
  const configPath = path.join(process.cwd(), 'server.config.js')

  delete require.cache[configPath]

  const serverConfig = require(configPath)

  console.log(`Got newest proxy mapping: ${JSON.stringify(serverConfig.proxy)}`)

  return serverConfig.proxy
}

/**
 * 代理处理中间件
 * @return {Function} koa middleware
 */
module.exports = function (/* opts */) {
  // eslint-disable-next-line
  async function preProxyMiddleware (ctx, next) {
    const url = ctx.url
    let proxyTarget
    let proxyConfig = getProxyConfig()

    // 非生产环境，才允许后端进行调试
    if (!IS_SERVER_PRODUCTION) {
      // 如果请求头里带了`proxyconfig`(node拿到的都是小写)字段,则将其与项目代理配置合并,用于调试
      // Proxy-Config这个头字段居然被chrome拒绝设置...
      let headerProxyConfig = ctx.headers.proxyconfig
      if (headerProxyConfig) {
        console.log(`'proxyconfig' detected in headers: '${headerProxyConfig}'`)
        try {
          headerProxyConfig = JSON.parse(headerProxyConfig)
        } catch (e) {
          console.log('proxyconfig parsing FAILED, please check it.')
          headerProxyConfig = {}
        }
        // Object.assign还是尽量要传三个参数啊（第一个{}），又犯了一个低级错误。。。
        proxyConfig = Object.assign({}, proxyConfig, headerProxyConfig)
        console.log(`Merged proxy config is: ${JSON.stringify(proxyConfig)}`)
      }
    }
    // 在appConfig.proxy中寻找匹配前缀的代理
    for (const [prefix, target] of Object.entries(proxyConfig)) {
      if (url.startsWith(prefix)) {
        // 代理目标可能有这么几种写法:
        // 1.http://192.168.xxx.xxx:dddd
        // 2.http://10.14.xxx.xx:dddd
        // 3.http://xx.xkeshi.so
        // 4.http://jenkins-name
        // 但是, 目前本地环境只有1，3两种写法
        // 为了解决多重nodejs代理的问题，如果代理目标是域名形式，则不替换前缀
        // 默认生产模式，不会设置代理为域名形式
        // 注意本地如果启动生产模式，并且代理目标如果是域名形式，那么仍然会有此问题，
        // 鉴于此种情况非常少见，就不在这里处理了
        // 只有本地开发模式，才会执行后面的域名判断
        if (!IS_DEBUG || !isDomainTarget(target)) {
          ctx.url = url.replace(prefix, '')
        }
        proxyTarget = target
        ctx._proxyTarget = proxyTarget
        console.log(`Proxy Found: '${prefix}' => '${proxyTarget}'`)
        break
      }
    }
    if (!proxyTarget) {
      console.log('Proxy NOT FOUND, skipped')
      return Promise.resolve()
    }
    console.log(`Request '${url}' will be proxied to '${proxyTarget + ctx.url}'`)
    return next()
  }

  return compose([
    preProxyMiddleware,
    koaHttpProxy('0', {
      // 不解析body，不限制body大小
      parseReqBody: false,
      /**
       * 发出代理请求前的回调
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
        if (IS_DEBUG) {
          delete proxyReqOpts.headers.Referer
          delete proxyReqOpts.headers.Origin
        }
        // 计时开始
        ctx._proxyStartTimestamp = Date.now()
        if (!needToken) {
          return proxyReqOpts
        }
        return await tokenManager.handleRequest(ctx)
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
        console.log('ProxyRes headers:', JSON.stringify(ctx.response.headers))
        const location = `${ctx._proxyTarget}${ctx.url}`
        console.log(
          `Proxy request '${location}' completed(${proxyRes.statusCode}), costing ${Date.now() - ctx._proxyStartTimestamp}ms.`)
        if (!needToken) {
          return proxyResData
        }
        return await tokenManager.handleResponse(ctx)
          .then(() => {
            return proxyResData
          })
      },
    }),
  ])
}
