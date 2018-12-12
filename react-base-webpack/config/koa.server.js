/**
 * koa2 server 入口
 * Created by zdliuccit on 2018/11/1.
 */
const Koa = require('koa')
const convert = require('koa-convert')
const webpack = require('webpack')
const merge = require('webpack-merge')

const KoaRouter = require('koa-router')()
const koaCompress = require('koa-compress')()
const loggerMiddleware = require('koa-logger')()
const errorMiddleware = require('./middle/errorMiddleWare')
const proxyMiddleware = require('./middle/proxyMiddleWare')
const spaMiddleWare = require('./middle/spaMiddleWare')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const opn = require('opn')
const config = merge(require('./webpack.config.dev'))
const appConfig = require('./../app.config')
const currentIP = require('ip').address()
const uri = `http://${currentIP}:${appConfig.appPort}`
const clientCompiler = webpack(config)
const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    modules: false,
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
  if (!middleware) return
  app.use(middleware)
})

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // opn(uri)
})

// 错误处理
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appConfig.appPort)

