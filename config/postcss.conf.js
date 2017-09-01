const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const webpackAppConfig = require('./../app.config').webpack
/**
 * postcss  添加浏览器前缀插件
 * @return []
 */
module.exports = function () {
  const posts = [
    // 添加浏览器前缀 解决兼容问题
    autoprefixer({ browsers: '> 0.1%', }),
  ]
  // 是否对样式启用px到rem的转换， 默认不开启
  if (webpackAppConfig.enablePx2Rem) {
    const pxtoremOptions = Object.assign({}, {
      rootValue: 100,
      propWhiteList: [],
      replace: true,
    })
    posts.push(pxtorem(pxtoremOptions))
  }
  // 合并项目设置的插件
  return posts.concat(webpackAppConfig.postcss || [])
}
