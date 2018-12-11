/**
 * Created by liuzhengdong on 2017/9/21.
 * 日志打印器 class
 */
import { IS_DEBUG } from './../env'

class Logger {
  /**
   * 构造函数
   * @param filename 调用的文件名
   */
  constructor (filename) {
    this.filename = filename
  }
}

/**
 * 定义方法
 * @type {{info: string, log: string, warn: string, error: string}}
 */
const methods = {
  log: 'color: green',
  info: 'color:#6495ED',
  warn: 'color: #cc33cc',
  error: 'color: red',
}
/**
 * 将方法绑定到原型上
 */
Object.entries(methods).forEach(([method, color]) => {
  Logger.prototype[method] = function (...args) {
    // 非生产环境
    if (!IS_DEBUG) {
      return
    }
    args.unshift(`%c[${this.filename}]:`, color)
    console[method](...args)
  }
})

/**
 * 定义 VueLogger class
 */
class VueLogger {
  constructor (filename) {
    const logger = new Logger(filename)
    Object.keys(methods).forEach(method => {
      this[method] = (vm, ...args) => {
        // 不存在vue实例时，简单打印
        if (!vm) {
          return
        }
        if (vm._isVue !== true) {
          logger[method].call(logger, vm, ...args)
          return
        }
        // 组件当前__file
        const filePath = vm.$options._parentVnode.componentOptions.Ctor.options.__file
        // 截取组件名称
        const componentName = filePath.slice(filePath.lastIndexOf('/') + 1) || '(unkonwn component name)'
        // 当前路由路径
        const fullPath = vm.$route.fullPath || '(unkonwn route fullPath)'
        logger[method].call(logger, ...args, `@${componentName}`, `#${fullPath}`)
      }
    })
  }
}

const vueLogger = new VueLogger('component')
const componentLogger = {}
/**
 * 暴露install钩子，供vue注册
 * @param {Vue} Vue - Vue构造器类
 */
componentLogger.install = function (Vue) { // 基础打印器
  Object.keys(methods).forEach((method) => {
    Vue.prototype[method] = function (...args) {
      vueLogger[method].call({}, this, ...args)
    }
  })
}

export default componentLogger