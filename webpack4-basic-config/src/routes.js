import main from './views/index.vue'
import empty from './app.vue'

const routes = [
  {
    path: '/',
    component: main,
    meta: {title: '测试首页'}
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
