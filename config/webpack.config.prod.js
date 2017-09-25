/**
 * Created by liuzhengdong on 2017/7/6.
 */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const config = require('./webpack.config.base')('prod')
const postcss = require('./postcss.conf')()

config.output.filename = '[name].[chunkhash:7].js'
config.output.chunkFilename = '[id].[chunkhash:7].js'

config.devtool = false

config.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader', { loader: 'postcss-loader', options: { plugins: postcss } }],
      fallback: 'vue-style-loader',
    }),
  },
  {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader', 'stylus-loader', { loader: 'postcss-loader', options: { plugins: postcss } }],
      fallback: 'vue-style-loader',
    }),
  }
)

config.plugins = (config.plugins || []).concat([
  // 定义全局常量
  new webpack.DefinePlugin({
    'process.env': {
      //注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面
      NODE_ENV: JSON.stringify("production"),
      VUE_ENV: JSON.stringify("client"),
    },
  }),
  // 合并公共模块为单独文件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].min.js',
  }),
  // js压缩
  new webpack.optimize.UglifyJsPlugin({
    comments: false,        // 去掉注释
    compress: {
      warnings: false, // 不显示警告
      drop_console: false,
    },
  }),
  // 分离css文件
  new ExtractTextPlugin('[name].[contenthash:8].css'),

  // optimize \ minimize CSS assets
  new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true,
      // postcss那边已经处理过autoprefixer了，这里把它关掉，否则会导致浏览器前缀兼容范围问题
      autoprefixer: false,
    },
  }),
])

module.exports = config
