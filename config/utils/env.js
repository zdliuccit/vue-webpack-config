/**
 * Created by liuzhengdong on 2017/9/7.
 * 各种环境变量
 */
module.exports = {
  // 是否服务端渲染模式
  IS_SSR: process.env.RENDER_MODE === 'server',
  // 是否开发环境
  IS_DEBUG: process.env.NODE_ENV === 'development',
  // 是否生产环境，不能根据process.env.NODE_ENV === 'production'来判断
  // 我们设置所有服务器集成部署方式都是process.env.NODE_ENV === 'production'
  // SERVER_ENV是与运维约定的一个环境变量，表示服务器环境,值可能为dev,test,pre,product
  IS_SERVER_PRODUCTION: process.env.SERVER_ENV === 'production',
  // 是否webpack中间件模式
  IS_WEBPACK_MIDDLEWARE: process.env.WEBPACK_MODE === 'middleware',
}
