// 子工程的一些个性化配置, sdk会读取本模块,不可随意重命名
const path = require('path')
const serverConfig = require('./server.config')

module.exports = {
  // 主服务启动端口,不同的环境不一样,不能在这里写死
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
    enablePx2Rem: false,
    // 待合并子工程特殊别名,sdk中内置别名，请到/node_modules/@xkeshi/koa2-vue2-sdk/config/webpack.base.conf.js
    // 查看defaultResolveAlias变量
    resolveAlias: {},
    // 扩展rules
    rules: [],
    // 扩展css postcss
    postcss: [],
  },
  // 自定义中间件 推荐async函数写法
  middleWares: []
}
