/**
 * Created by liuzhengdong on 2017/7/6.
 */
const webpack = require('webpack')
const config = require('webpack.config.base')('prod')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

const upyunConfig = require(path.join(process.cwd(), 'upyun.config.js'))
if (!upyunConfig) {
  throw new Error('Upyun config DOES NOT exist!')
}

// 干掉bucket的  xkeshi-  前缀，就是子域名
const subDomain = upyunConfig.builtFilesBucket.replace(/^xkeshi-/, '')
config.output.publicPath = `//${subDomain}.xkeshi.cn${upyunConfig.options.remotePathPrefix}/`

// chunkhash是根据文件内容生成hash
config.output.filename = '[name].[chunkhash:7].js'
config.output.chunkFilename = '[id].[chunkhash:7].js'

// whether to generate source map for production files.
// disabling this can speed up the build.
const SOURCE_MAP = false

config.devtool = SOURCE_MAP ? 'source-map' : false

config.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader'],
      fallback: 'vue-style-loader',
    }),
  },
  {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader', 'postcss-loader', 'stylus-loader?resolve url'],
      fallback: 'vue-style-loader',
    }),
  }
)

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      VUE_ENV: '"client"',
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true,
      // postcss那边已经处理过autoprefixer了，这里把它关掉，否则会导致浏览器前缀兼容范围问题
      autoprefixer: false,
    },
  }),
])

module.exports = config
