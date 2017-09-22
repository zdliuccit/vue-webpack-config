/**
 * 项目的一些定制化配置
 */
const path = require('path')
const serverConfig = require('./server.config')

module.exports = {
  // 主服务启动端口
  appPort: serverConfig.appPort,
  // 代理配置，可支持多个代理，key为前缀，命中后，会把前缀去掉，转发到代理服务器
  proxy: serverConfig.proxy,
  // webpack服务端口,分离模式启动时用到
  webpackDevServerPort: 9002,
  // webpack的差异化配置
  webpack: {
    entry: {
      app: path.join(__dirname, 'client/index.js'), // 入口
      vendor: ['vue', 'vue-router', 'vue-template-compiler'] // 拆分框架代码
    },
    // 是否对样式启用px到rem的转换， 默认不开启
    enablePx2Rem: true,
    // 自定义Alias设置
    resolveAlias: {},
    // 扩展rules
    rules: [],
    // 扩展css postcss
    postcss: [],
  },
  // 自定义中间件 async await函数写法
  middleWares: []
}
