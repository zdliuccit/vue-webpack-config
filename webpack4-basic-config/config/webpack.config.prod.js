/**
 * webpack server配置
 * Created by zdliuccit on 2018/7/6.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config.base')()
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = merge(config, {
  // 设置代码调试map
  devtool: false,
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'ml-node'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 5,
        },
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/,
          priority: -10,
          reuseExistingChunk: false,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new ExtractCssChunks({
      filename: 'assets/css/[name].[chunkhash:8].css',
      chunkFilename: 'assets/css/[id].[chunkhash:8].css',
    }),
    // 限制文件最小KB
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 20000
    }),
    new OptimizeCssAssetsPlugin(
      {
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          // postcss那边已经处理过autoprefixer了，这里把它关掉，否则会导致浏览器前缀兼容范围问题
          autoprefixer: false,
          discardComments: {removeAll: true}
        },
      }
    ),]
})
