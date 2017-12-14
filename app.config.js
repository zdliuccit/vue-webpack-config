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
  // webpack的差异化配置
  webpack: {
    entry: {
      app: path.join(__dirname, 'client/index.js'), // 入口
      vendor: ['vue', 'vue-router'] // 拆分框架代码
    },
    // 是否对样式启用px到rem的转换,配合config/utils/responsive-design.js适配移动端开发， 默认不开启
    enablePx2Rem: false,
    // 自定义Alias设置
    resolveAlias: {},
    // 扩展rules
    rules: [],
    // 扩展css postcss
    postcss: [],
    // 定义 autoprefixer 兼容 默认内部配置为 >0.1%
    browsers: ''
  },
  // 自定义中间件 async await函数写法
  middleWares: []
}
