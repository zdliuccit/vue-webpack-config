import main from './views/index.vue'
import test from './views/test.vue'
import empty from './app.vue'

const routes = [
  {
    path: '/',
    component: main,
    meta: {title: '测试首页'}
  },
  {
    path: '/test',
    component: test,
    meta: {title: '测试'}
  },
  {
    path: '*',
    component: empty,
    meta: {
      title: '出错了！！！'
    }
  },
]

export default routes
