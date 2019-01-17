/**
 * @file 运行于浏览器
 * Created by zdliuccit on 2018/7/6.
 * */
import Vue from 'vue'

import { createApp } from './index'
import ProgressBar from './components/ProgressBar.vue'
// 引入http请求
import http from './../config/http/http'
// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({ store: this.$store, route: to })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
  // 客户端和服务端保持一致
  store.state.$http = http
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, router, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})