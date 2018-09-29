/**
 * 基于 https://github.com/bripkens/connect-history-api-fallback 改造
 */
const path = require('path')
const fs = require('fs')
const logger = require('./logger/koa-logger')('spaMiddleWare')
const currentIP = require('ip').address()

const { IS_DEBUG } = require('../utils/env')
const appConfig = require('./../../app.config')

const defaultOptions = { include: /^\/(api|static|public|v3)/ }

/**
 * 读取构建过的文件，public目录下
 * @param {String} filename 文件名
 * @return {String} 文件内容
 */
function readBuiltFile (filename) {
  return fs.readFileSync(path.join(process.cwd(), 'public', filename), 'utf-8')
}

let indexHTML

// 生产模式
if (!IS_DEBUG) {
  indexHTML = readBuiltFile('index.html')
}

/**
 * 单页应用中间件
 * @param {Object} options 配置项
 * @return {function} 中间件
 */
module.exports = function (options) {
  options = Object.assign({}, defaultOptions, options)
  return async function spa (ctx, next) {
    if (!options.include.test(ctx.url)) {
      /**
       * 开发模式从koa2服务中获取index
       */
      await new Promise((resolve) => {
        if (indexHTML) {
          resolve()
        } else {
          require('http').get('http://' + currentIP + ':' + appConfig.appPort, (res) => {
            res.on('data', (chunk) => {
              logger.info('Fetching index.html succeed.')
              indexHTML = chunk.toString('utf-8')
              resolve()
            })
          }).on('error', (e) => {
            logger.error(`Fetching index.html error: ${e.message}`)
            process.exit(1)
          })
        }
      }).then(doRender)

      /**
       * 返回HTML
       */
      function doRender () {
        const res = ctx.res
        res.statusCode = 200
        // 这句很重要，否则会影响到weinre调试
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(`${indexHTML}`)
        logger.info('Page routing request')
        return
      }
    } else {
      return next()
    }
  }
}
