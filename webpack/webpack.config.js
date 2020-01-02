const path = require('path')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const mlPlugin = require('./loaders/ms-plugin');

function resolve(dir) {
  return path.resolve(process.cwd(), dir)
}

module.exports = {
  mode: 'development',
  devtool: '#cheap-module-source-map',
  // 入口模块配置
  entry: resolve('src/index.js'),
  // 输出模块配置
  output: {
    // 输出到这个目录下
    path: resolve('dist'),
    // 生成的文件名, [name] 即为entry配置中的key
    filename: '[name].js',
    // 异步模块文件名
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  // 寻找模块时的一些缺省设置
  resolveLoader: {
    modules: ['node_modules', resolve('loaders')],
  },
  resolve: {
    // 补充扩展名
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'ml-loader',
          options: {
            name: 'ml',
            test: '123213',
          }
        }],
      },
      {
        test: /\.css$/,
        use: [ExtractCssChunks.loader, 'css-loader'],
      },
    ]
  },
  plugins: [
    new ExtractCssChunks({
      filename: 'assets/css/[name].[chunkhash:8].css',
      chunkFilename: 'assets/css/[id].[chunkhash:8].css',
    }),
    new mlPlugin({ tip: '参数' })
  ]
}
