/**
 * 为vue实例添加logger方法
 * Vue.use(logger)
 */
import logger from './logger'

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
    Vue.prototype.logger = logger
  },
}
