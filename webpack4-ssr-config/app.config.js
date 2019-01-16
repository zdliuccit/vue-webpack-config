/**
 * 项目的一些定制化配置
 */
const path = require('path')
const constants = require('./constants')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // 主服务启动端口
  appPort: 8098,
  // 代理配置，可支持多个代理，key为前缀，命中后，会把前缀去掉，转发到代理服务器
  proxy: isProd ? constants.prodProxy : constants.proxy,
  // webpack的差异化配置
  webpack: {
    entry: {
      app: path.join(__dirname, 'client/index.js'), // 入口
    },
  },
}
