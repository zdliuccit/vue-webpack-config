import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入http请求插件
import http from '@config/utils/http'
// 引入log日志插件
import vueLogger from '@config/utils/logger/vue-logger'
import { addRequestInterceptor, addResponseInterceptor } from '@config/utils/http/http'

// 注册插件
Vue.use(http)
Vue.use(vueLogger)
Vue.use(VueRouter)

// request前自动添加api配置
addRequestInterceptor(
  (config) => {
    // config.url = `/api${config.url}`
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
    return Promise.reject(error || '出错了')
  }
)
