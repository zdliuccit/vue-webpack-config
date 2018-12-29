/**
 * webpack base配置
 * Created by zdliu on 2018/7/6.
 */
const appConfig = require('./../app.config')
const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const merge = require('webpack-merge')
const vendorsManifest = require(path.join(process.cwd(), 'vendors-manifest.json'))

const isProd = process.env.NODE_ENV === 'production'

// 版本号
const appVersion = new Date().getTime()

function resolve(dir) {
  return path.resolve(process.cwd(), dir)
}

// 网站图标
const favicon = path.join(process.cwd(), 'favicon.ico')

module.exports = function () {
  const config = merge(appConfig.webpack, {
    // 输出模块配置
    output: {
      // 输出到这个目录下
      path: resolve('dist'),
      // 生成的文件名, [name] 即为entry配置中的key
      filename: `[name].[${isProd ? 'chunkhash' : 'hash'}:8].js`,
      // 异步模块文件名
      chunkFilename: '[id].js',
      publicPath: '/'
    },
    // 寻找模块时的一些缺省设置
    resolve: {
      // 补充扩展名
      extensions: ['.js', '.vue', '.json'],
      // 别名，可以直接使用别名来代表设定的路径以及其他
      alias: {
        'vue': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@config': resolve('config'),
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader', 'eslint-loader']
        },
        // js,jsx 转译
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [isProd ? ExtractCssChunks.loader : 'vue-style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(styl|stylus)$/,
          use: [isProd ? ExtractCssChunks.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
            {
              loader: 'stylus-loader',
              options: isProd ? {} : {sourceMap: 'inline'}
            }
          ]
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        // 图片资源 gif|jpg|jpeg|png|bmp|svg|ico
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
        // 字体文件 woff|woff2|eot|ttf
        {
          test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              // 小于8912字节的文件,返回dataurl
              limit: 8912,
              // 生成的文件名,[name]为原始文件名,[hash:8]为根据文件内容生成8位md5值,[ext]为原始文件扩展名
              name: 'assets/font/[name].[hash:8].[ext]',
            },
          }],
        },
      ],
    },
    performance: {
      maxEntrypointSize: 300000,
      hints: false
    },
    plugins: [
      // 由于mac不区分大小写，linux区分大小写，可能导致mac上正常，在部署时出错，所以强制区分大小写
      new CaseSensitivePathsPlugin(),
      // // 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中
      new HtmlWebpackPlugin({
        appVersion,
        favicon,
        filename: 'index.html',
        dllSrc: `/${vendorsManifest.name}.dll.js`,
        template: path.join(process.cwd(), 'index.template.ejs'),
        inject: true,
        // minify: {
        //   removeComments: true,        //去注释
        //   collapseWhitespace: true,    //压缩空格
        // },
      }),
      new webpack.DllReferencePlugin({
        context: path.join(process.cwd()),
        manifest: path.join(process.cwd(), 'vendors-manifest.json'),
      }),
      new vueLoaderPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
  })
  return config
}