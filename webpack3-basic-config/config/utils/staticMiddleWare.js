/**
 * 设置静态资源请求目录和设置缓存
 * @return {Promise.<void>}
 */
const path = require('path')
const serverStatic = require("koa-static")

module.exports = function () {
  return serverStatic(path.join(process.cwd(), 'public'), { maxAge: 30 * 24 * 60 * 60 * 1000, gzip: true })
}