import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '@config/utils/http'
import vueLogger from '@config/utils/logger/vue-logger'
import {addRequestInterceptor, addResponseInterceptor} from '@config/utils/http/http'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义业务组件
import components from './components'
// 注册插件
Vue.use(http)
Vue.use(vueLogger)
Vue.use(VueRouter)
Vue.use(elementUI)

components.forEach(comp => {
  Vue.component(`ml-${comp.name}`, comp)
})

// request前自动添加api配置
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
