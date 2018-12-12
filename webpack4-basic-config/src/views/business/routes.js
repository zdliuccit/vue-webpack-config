import businessList from './business-list.vue'
import businessDetail from './bus-detial.vue'
import businessAddEdit from './bus-add-edit.vue'

const routes = [
  {
    path: '/',
    name: 'businessList',
    component: businessList,
    meta: {
      title: '商家列表',
      sidebarLink: '/business/list'
    },
  },
  {
    path: 'add',
    name: 'businessAdd',
    component: businessAddEdit,
    meta: {
      title: '添加商家',
      sidebarLink: '/business/list'
    },
  },
  {
    path: 'edit/:id',
    name: 'businessEdit',
    component: businessAddEdit,
    meta: {
      title: '修改商家',
      sidebarLink: '/business/list'
    },
  },
  {
    path: 'detail/:id',
    name: 'businessDetail',
    component: businessDetail,
    meta: {
      title: '商家详情',
      sidebarLink: '/business/list'
    },
  },
]

export default routes
