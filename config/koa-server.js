/**
 * Created by liuzhengdong on 2017/7/13.
 */
const Koa = require('koa')
const KoaRouter = require('koa-router')()
const webpack = require('webpack')
const currentIP = require('ip').address()

const opn = require('opn')
const loggerMiddleware = require('koa-logger')()
const convert = require('koa-convert')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const appConfig = require('./../app.config')
const config = require('./webpack.config.dev')
const clientCompiler = webpack(config)

const setCookieMiddleware = require('./utils/setCookieMiddleWare')
const httpMiddleware = require('./utils/httpMiddleWare')
const proxyMiddleware = require('./utils/proxyMiddleWare')
const errorMiddleware = require('./utils/errorMiddleWare')

const app = new Koa()
const uri = 'http://' + currentIP + ':' + appConfig.appPort

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
  },
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
})
// 中间件,一组Generator函数
const middleWares = [
  // 日志记录
  loggerMiddleware,
  // 压缩响应
  require('koa-compress')(),
  // 错误处理
  errorMiddleware,
  // webpack开发中间件
  convert(devMiddleware),
  // webpack热替换中间件
  convert(webpackHotMiddleware(clientCompiler)),
  // 手动设置cookie方法
  setCookieMiddleware,
  // 路由
  KoaRouter.middleware(),
  // http中间件
  httpMiddleware(),
  // 插入自定义中间件
  ...appConfig.middleWares,
  // 代理
  proxyMiddleware(),
]

middleWares.forEach((middleware) => {
  if (!middleware) {
    return
  }
  app.use(middleware)
})

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})

app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

const server = app.listen(appConfig.appPort)

process.on('SIGTERM', () => {
  console.log('Stopping dev server')
  devMiddleware.close()
  server.close(() => {
    process.exit(0)
  })
})