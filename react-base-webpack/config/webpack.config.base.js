/**
 * webpack base配置
 * Created by zdliuccit on 2018/11/1.
 */
const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const appConfig = require('./../app.config')
const appVersion = new Date().getTime()

function resolve(dir) {
  return path.resolve(process.cwd(), dir)
}

const favicon = path.join(process.cwd(), 'favicon.ico')

module.exports = function () {
  const config = {
    output: {
      path: resolve('dist'),
      filename: `[name].[${isProd ? 'chunkhash' : 'hash'}:8].js`,
      chunkFilename: '[id].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss'],
      alias: {
        '@': resolve('client'),
      }
    },
    module: {
      rules: [
        // js,jsx 转译
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        {
          test: /\.(gif|jpg|jpeg|png|bmp|svg|ico)(\?.*)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1,
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8912,
              name: 'assets/font/[name].[hash:8].[ext]',
            },
          }],
        },
      ],
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        appVersion,
        favicon,
        filename: 'index.html',
        template: path.join(process.cwd(), 'index.template.ejs'),
      }),
      new FriendlyErrorsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
  }
  return config
}