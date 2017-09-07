/**
 * 为vue实例添加http方法
 * Vue.use(http)
 */
import http from './http'

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
    Vue.prototype.http = http
  },
}
