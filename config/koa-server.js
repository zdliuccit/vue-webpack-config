/**
 * Created by liuzhengdong on 2017/7/13.
 */
const Koa = require('koa')
const webpack = require('webpack')
const currentIP = require('ip').address()
const opn = require('opn')

const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const appConfig = require('./../app.config')
const config = require('./webpack.config.dev')
const clientCompiler = webpack(config)

const app = new Koa()

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  noInfo: true,
  publicPath: config.output.publicPath
})

app.use(devMiddleware)
app.use(webpackHotMiddleware(clientCompiler))

const uri = 'http://' + currentIP + ':' + appConfig.appPort

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})
app.on('error', (err) => {
  logger.error('Server error: \n%s\n%s ', err.stack || '')
})
const server = app.listen(appConfig.appPort)

module.exports = {
  close: () => {
    server.close()
  }
}
