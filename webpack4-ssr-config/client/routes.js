import testRoutes from './views/test/routes'
import entry from './app.vue'

const home = () => import('./views/home.vue')
const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/test',
    component: entry,
    children: testRoutes
  },
]

export default routes
