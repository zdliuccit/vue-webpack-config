/**
 * webpack dll 配置 分离第三方库 加速打包和 有利于缓存
 * Created by liuzhengdong on 2018/4/12.
 */
const webpack = require('webpack');
const path = require('path');
const appConfig = require(path.join(process.cwd(), 'app.config'))

const vendors = ['vue', 'vuex', 'vue-router'];
module.exports = {
  mode: 'production',
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    library: '[name]_[chunkhash:8]',
  },
  entry: {
    'vendors': vendors.concat(appConfig.webpackDLL || []),
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[chunkhash:8]',
      context: path.join(process.cwd()),
      path: path.join(process.cwd(), '[name]-manifest.json'),
    }),
  ],
};
