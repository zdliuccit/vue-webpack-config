const data = () => import('./data.vue')
const ajax = () => import('./ajax.vue')

export default [
  {
    path: 'data',
    component: data,
  },
  {
    path: 'ajax',
    component: ajax,
  }
]
