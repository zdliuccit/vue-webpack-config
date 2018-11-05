/**
 * webpack prod配置
 * Created by zdliuccit on 2018/11/1.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')()
const appWebpack = require('./../app.config').webpack
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ExtractCssChunks.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [ExtractCssChunks.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ]
  },
  plugins: [
    // 分离css文件
    new ExtractCssChunks({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[id].[chunkhash:8].css',
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
          discardComments: { removeAll: true }
        },
      }
    ),
  ],
//   production模式下，将侧重于模块体积优化和线上部署，包含如下内容：
// 开启所有的优化代码
// 更小的bundle大小
// 去除掉只在开发阶段运行的代码
// Scope hoisting和Tree-shaking
// 自动启用uglifyjs对代码进行压缩
  optimization: {
    minimize: true, //取代 new UglifyJsPlugin(/* ... */)
    providedExports: true,
    usedExports: true,
    //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
    //依赖于optimization.providedExports和optimization.usedExports
    sideEffects: true,
    //取代 new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
    noEmitOnErrors: true
  },
  optimization: {
    minimize: env === 'production' ? true : false, //是否进行代码压缩
    splitChunks: {
      chunks: "async",
      minSize: 30000, //模块大于30k会被抽离到公共模块
      minChunks: 1, //模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, //入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
}, appWebpack)

module.exports = config
