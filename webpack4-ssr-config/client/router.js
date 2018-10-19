import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    fallback: false,
    routes
  })

  router.beforeEach((to, from, next) => {
    /*todo*/
    next()
  })

  router.afterEach((route) => {
    /*todo*/
  })
  return router
}