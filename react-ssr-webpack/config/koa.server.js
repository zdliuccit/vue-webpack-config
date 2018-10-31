/**
 * koa2 server 入口
 * Created by zdliuccit on 2018/7/6.
 */
const Koa = require('koa')
const koaCompress = require('koa-compress')()
const KoaRouter = require('koa-router')()

const convert = require('koa-convert')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const loggerMiddleware = require('koa-logger')()
const errorMiddleware = require('./middle/errorMiddleWare')
const proxyMiddleware = require('./middle/proxyMiddleWare')
const spaMiddleWare = require('./middle/spaMiddleWare')
const currentIP = require('ip').address()
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = merge(require('./webpack.base.config')())
const opn = require('opn')

const clientCompiler = webpack(config)

const appConfig = require('./../app.config')
const uri = `http://${currentIP}:${appConfig.appPort}`

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
  },
  noInfo: false,
})
// koa server
const app = new Koa()

// 中间件,一组async函数，generator函数需要convert转换
const middleWares = [
  // 打印请求与响应 日志
  loggerMiddleware,
  // 压缩响应
  koaCompress,
  // 错误处理
  errorMiddleware,
  // webpack开发中间件
  convert(devMiddleware),
  // webpack热替换中间件
  convert(webpackHotMiddleware(clientCompiler)),
  // spa单页应用处理,非api后段请求返回index.html
  spaMiddleWare(),
  // 路由
  KoaRouter.middleware(),
  // 代理中间件
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

// 错误处理
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
