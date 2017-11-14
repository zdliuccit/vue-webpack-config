/**
 * Created by liuzhengdong on 2017/7/13.
 */
const Koa = require('koa')
const KoaRouter = require('koa-router')()
const currentIP = require('ip').address()

const appConfig = require('./../app.config')

const loggerMiddleware = require('koa-logger')()
const errorMiddleware = require('./utils/errorMiddleWare')
const staticMiddleWare = require('./utils/staticMiddleWare')
const setCookieMiddleware = require('./utils/setCookieMiddleWare')
const httpMiddleware = require('./utils/httpMiddleWare')
const spaMiddleWare = require('./utils/spaMiddleWare')
const proxyMiddleware = require('./utils/proxyMiddleWare')

const app = new Koa()
const uri = 'http://' + currentIP + ':' + appConfig.appPort

// 中间件,一组async函数，generator函数需要convert转换
const middleWares = [
  // 打印请求与响应 日志
  loggerMiddleware,
  // 静态资源中间件
  staticMiddleWare(),
  // 压缩响应
  require('koa-compress')(),
  // 错误处理
  errorMiddleware,
  // 手动设置cookie方法
  setCookieMiddleware,
  // http中间件
  httpMiddleware(),
  // spa单页应用处理,非api后段请求返回index.html
  spaMiddleWare(),
  // 插入自定义中间件
  ...appConfig.middleWares,
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

console.log('> Starting production server address >>>  ' + uri)
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