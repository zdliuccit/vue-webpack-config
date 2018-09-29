/**
 * webpack server配置
 * Created by zdliuccit on 2018/7/6.
 */
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const config = require('./webpack.base.config')('dev')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(config, {
  // 指定生成后的运行环境在node
  target: 'node',
  // 设置代码调试map
  devtool: '#cheap-module-source-map',
  mode: 'production',
  // 配置编译的入口文件
  entry: path.join(process.cwd(), 'client/entry-server.js'),
  // 设置输出文件名，并设置模块导出为commonjs2类型
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: [/\.vue$/, /\.css$/]
  }),
  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
