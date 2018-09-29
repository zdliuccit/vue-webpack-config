/**
 * vue koa2 ssr中间件
 * Created by zdliuccit on 2018/7/6.
 */
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const proxyConfig = require('./../app.config').proxy
const setUpDevServer = require('./setup.dev.server')

module.exports = function (app, uri) {

  const renderData = (ctx, renderer) => {
    const context = { url: ctx.url, title: 'Vue Koa2 SSR' }
    return new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        if (err) {
          return reject(err)
        }
        resolve(html)
      })
    })
  }

  function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      basedir: resolve('dist'),
      runInNewContext: false
    }))
  }

  function resolve(dir) {
    return path.resolve(process.cwd(), dir)
  }

  let renderer
  if (isProd) {
    // prod mode
    const template = fs.readFileSync(resolve('dist/index.html'), 'utf-8')
    const bundle = require(resolve('dist/vue-ssr-server-bundle.json'))
    const clientManifest = require(resolve('dist/vue-ssr-client-manifest.json'))
    renderer = createRenderer(bundle, {
      template,
      clientManifest
    })
  } else {
    // dev mode
    setUpDevServer(app, uri, (bundle, options) => {
        try {
          renderer = createRenderer(bundle, options)
        } catch (e) {
          console.log('\nbundle error', e)
        }
      }
    )
  }
  app.use(async (ctx, next) => {
    if (!renderer) {
      ctx.type = 'html'
      return ctx.body = 'waiting for compilation... refresh in a moment.';
    }
    if (Object.keys(proxyConfig).findIndex(vl => ctx.url.startsWith(vl)) > -1) {
      return next()
    }
    let html, status
    try {
      status = 200
      html = await renderData(ctx, renderer)
    } catch (e) {
      console.log('\ne', e)
      if (e.code === 404) {
        status = 404
        html = '404 | Not Found'
      } else {
        status = 500
        html = '500 | Internal Server Error'
      }
    }
    ctx.type = 'html'
    ctx.status = status ? status : ctx.status
    ctx.body = html
  })
}