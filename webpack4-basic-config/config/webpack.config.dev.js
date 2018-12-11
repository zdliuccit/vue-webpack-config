/**
 * webpack client配置
 * Created by zdliuccit on 2018/7/6.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')()
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = merge(base, {
  devtool: '#cheap-module-source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    // 全局开启代码热替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ]
})
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'].concat(config.entry[name])
})

module.exports = config
