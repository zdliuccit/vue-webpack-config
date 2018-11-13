import Vue from 'vue'
// 引入http请求插件
import http from './../config/http'
// 引入log日志插件
import { addRequestInterceptor, addResponseInterceptor } from './../config/http/http'
import titleMixin from './utils/title'
// 引入log日志插件
import vueLogger from './../config/logger/vue-logger'
// 注册插件
Vue.use(http)
Vue.use(vueLogger)

//  title
Vue.mixin(titleMixin)

// request前自动添加api配置
addRequestInterceptor(
  (config) => {
    /*统一加/api前缀*/
    config.url = `/api${config.url}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回response前处理
addResponseInterceptor(
  (response) => {
    // 在这里统一前置处理请求响应
    if (Number(response.status) !== 200) {
      // 全局notify有问题，还是自己处理吧
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    /*
   * todo 统一处理500、400等错误状态
   * 全局catch处理，这样其他地方就不需要写catch了
   * 以防个别地方还是需要用到catch做一些特殊处理 return Promise.reject(error)
   * */
    const { response } = error
    if ([500, 400].findIndex(val => val === response.status) > -1) {
      /*todo*/
    }
    return Promise.reject(error || '出错了')
  }
)
