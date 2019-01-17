import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    fallback: false,
    // base: '/ssr',
    routes
  })

  router.beforeEach((to, from, next) => {
    /*todo
    * 做权限验证的时候，服务端和客户端状态同步的时候会执行一次
    * 建议vuex里用一个状态值控制，默认false，同步时直接next,因为服务端已经执行过。
    * */
    next()
  })

  router.afterEach((route) => {
    /*todo*/
  })
  return router
}