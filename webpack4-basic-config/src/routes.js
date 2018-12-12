import businessRoute from './views/business/routes'
import empty from './app.vue'

const routes = [
  {
    path: '/',
    component: empty,
    children: businessRoute
  },
]

export default routes
