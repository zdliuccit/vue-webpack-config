/**
 * Created by liuzhengdong on 2017/9/6.
 *  * app入口,使整个应用基于es6开发
 */
console.log(process.env.NODE_ENV)
require('babel-core/register')
require('babel-polyfill')
if (process.env.NODE_ENV === 'development') {
  require('./koa-dev-server')
} else {
  require('./koa-prod-server')
}
