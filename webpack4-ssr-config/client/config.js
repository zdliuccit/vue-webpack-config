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

// http 返回response前处理
addResponseInterceptor(
  (response) => {
    /*todo 在这里统一前置处理请求响应 */
    return Promise.resolve(response.data)
  },
  (error) => {
    /*
    * todo 统一处理500、400等错误状态
    * 这里reject下，交给entry-server.js的处理
    */
    const { response, request } = error
    return Promise.reject({ code: response.status, data: response.data, method: request.method, path: request.path })
  }
)