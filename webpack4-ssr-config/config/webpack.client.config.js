/**
 * webpack client配置
 * Created by zdliuccit on 2018/7/6.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')()
const isProd = process.env.NODE_ENV === 'production'

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = merge(base, {
  entry: {
    app: path.join(process.cwd(), 'client/entry-client.js'),
  },
  mode: isProd ? 'production' : 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

module.exports = config
