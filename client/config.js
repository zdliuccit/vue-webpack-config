import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '@config/utils/http'
import { addRequestInterceptor, addResponseInterceptor } from '@config/utils/http/http'

Vue.use(http)
Vue.use(VueRouter)

// 接口前自动添加api配置
addRequestInterceptor(
  (config) => {
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
    if (Number(response.data.code) !== 0) {
      // 全局notify有问题，还是自己处理吧
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    // 401直接跳转到登陆页面
    if (!IS_DEBUG && Number(error.response.status) === 401) {
    }
    return Promise.reject(error || '出错了')
  }
)
