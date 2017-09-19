/**
 * Created by liuzhengdong on 2017/7/6.
 */
const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appConfig = require('./../app.config')
const getVueLoaderConfig = require('./vue-loader.conf')

// 加载应用工程的webpack配置,例如entry、alias等
const webpackAppConfig = appConfig.webpack

// 版本号
const appVersion = new Date().getTime()
function resolve (dir) {
  return path.resolve(process.cwd(), dir)
}
// 网站图标
const favicon = path.join(process.cwd(), 'favicon.ico')

module.exports = function (env) {
  const vueLoaderConfig = getVueLoaderConfig(env)
  const config = {
    // 入口模块配置
    entry: appConfig.webpack.entry,
    // 输出模块配置
    output: {
      // 输出到这个目录下
      path: resolve('public'),
      // 生成的文件名, [name] 即为entry配置中的key
      filename: '[name].js',
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
        '@config': resolve('config'),
        '@': resolve('client'),
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: [resolve('client')],
          use: [vueLoaderConfig, 'eslint-loader'],
        },
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
          exclude: /node_modules/,
        },
        // 加载json文件
        {
          test: /\.json$/,
          use: ['json-loader'],
        },
        {
          test: /\.ico$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1,
              name: 'resources/[path][name].[hash:8].[ext]',
            },
          }],
        },
        // gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf这些模块使用url-loader加载
        {
          test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)(\?.*)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              // 小于8912字节的文件,返回dataurl
              limit: 8912,
              // 生成的文件名,[name]为原始文件名,[hash:8]为根据文件内容生成8位md5值,[ext]为原始文件扩展名
              name: 'resources/[path][name].[hash:8].[ext]',
            },
          }],
        },
      ].concat(webpackAppConfig.rules || []),
    },
    plugins: [
      // 由于mac不区分大小写，linux区分大小写，可能导致mac上正常，在部署时出错，所以强制区分大小写
      new CaseSensitivePathsPlugin(),
      // 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中
      new HtmlWebpackPlugin({
        appVersion,
        favicon,
        filename: 'index.html',
        template: path.join(process.cwd(), 'index.template.ejs'),
        inject: true,
        minify: {
          removeComments: true,        //去注释
          collapseWhitespace: true,    //压缩空格
          removeAttributeQuotes: true  //去除属性引用
        },
      }),
    ],
  }
  return config
}