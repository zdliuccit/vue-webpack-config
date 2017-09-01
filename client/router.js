/* loading */
import VueRouter from 'vue-router'
import routes from './routes'

const router = new VueRouter({
  mode: 'history',
  // base: '/book',
  routes
})

const doc = global.document

// router.beforeEach((to, from, next) => {
// })

router.afterEach((route) => {
  // 设置标题
  doc.title = route.meta.title || '爱客仕-后台管理'
  // 页面pv&uv埋点
  // let dp = `${global.location.origin}/#${route.fullPath}`
  // window.XAnalytics.ga.sendSpaPv(dp, doc.title)
})

export default router
