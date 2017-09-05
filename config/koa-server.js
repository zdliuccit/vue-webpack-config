/**
 * Created by liuzhengdong on 2017/7/13.
 */
const Koa = require('koa')
const KoaRouter = require('koa-router')()
const webpack = require('webpack')
const currentIP = require('ip').address()
const opn = require('opn')
const convert = require('koa-convert')
const proxyMiddleware = require('koa-better-http-proxy')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const historyApiFallback = require('koa-connect-history-api-fallback')

const httpMiddleware = require('./utils/http')
const appConfig = require('./../app.config')
const config = require('./webpack.config.dev')
const clientCompiler = webpack(config)
const proxyTable = appConfig.proxy

const app = new Koa()

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
  },
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
})
app.use(convert(devMiddleware))
app.use(convert(webpackHotMiddleware(clientCompiler)))

app.use(convert(historyApiFallback({
  // logger: console.log.bind(console),
  verbose: false
})))

app.use(httpMiddleware())
app.use(KoaRouter.middleware())

// // proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

console.log('> Starting dev server...')
const uri = 'http://' + currentIP + ':' + appConfig.appPort
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})

app.on('error', (err) => {
  logger.error('Server error: \n%s\n%s ', err.stack || '')
})

const server = app.listen(appConfig.appPort)

process.on('SIGTERM', () => {
  console.log('Stopping dev server')
  devMiddleware.close()
  server.close(() => {
    process.exit(0)
  })
})