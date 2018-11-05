/**
 * webpack dev配置
 * Created by zdliuccit on 2018/11/1.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')()
const appWebpack = require('./../app.config').webpack

Object.keys(appWebpack.entry).forEach(function (name) {
  appWebpack.entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'].concat(appWebpack.entry[name])
})
const config = merge(base, {
  mode: 'development',
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        REACT_ENV: '"client"',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}, appWebpack)

module.exports = config
