/**
 * Created by liuzhengdong on 2017/7/6.
 */
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('./webpack.config.base')('dev')
const postcss = require('./postcss.conf')()

config.devtool = '#cheap-module-eval-source-map'
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['./config/dev-client'].concat(config.entry[name])
})
config.module.rules.push(
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', { loader: 'postcss-loader', options: { plugins: postcss } }],
  },
  {
    test: /\.(styl|stylus)$/,
    use: ['style-loader', 'css-loader', 'stylus-loader', { loader: 'postcss-loader', options: { plugins: postcss } }],
  }
)
config.plugins = (config.plugins || []).concat([
  //你可以理解为，通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      VUE_ENV: '"client"',
    },
  }),
  // 全局开启代码热替换
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),

  new FriendlyErrorsPlugin(),
])

module.exports = config
