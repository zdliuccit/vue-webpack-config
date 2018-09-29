const postcss = require('./postcss.conf')()
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * 组装vue-loader配置
 * @param {string} env 环境，可能的值prod|dev
 * @return {object} 配置
 **/
module.exports = function (env) {
  const config = {
    loader: 'vue-loader',
    options: {
      // 去除模板中的空格
      preserveWhitespace: false,
      // postcss配置,把vue文件中的样式部分,做后续处理
      postcss,
    },
  }
  // webpack打包时，提取css
  if (env === 'prod') {
    // 生产环境
    config.options.loaders = {
      css: ExtractTextPlugin.extract({
        use: ['css-loader'],
        fallback: 'vue-style-loader',
      }),
      stylus: ExtractTextPlugin.extract({
        use: ['css-loader', 'stylus-loader'],
        fallback: 'vue-style-loader',
      }),
    }
  } else {
    // 开发环境
    config.options.loaders = {
      css: ['vue-style-loader', 'css-loader'],
      stylus: ['vue-style-loader', 'css-loader', 'stylus-loader',],
    }
  }
  return config
}
