import '@babel/polyfill'
import Vue from 'vue'
import App from './app.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

// reset 样式
import './assets/css/reset.css'

// config配置文件
import './config'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  // 创建 router 实例
  const router = createRouter()
  // 创建 store 实力
  const store = createStore()

  // sync the router with the vuex store.
  sync(store, router)

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}