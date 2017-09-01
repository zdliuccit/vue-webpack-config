import 'babel-polyfill'
// 第三方库
import Vue from 'vue'
import './view/test.css'
import './view/ss.styl'
import './config'
// 自己实现的方法
import router from './router'
// 组件入口
// import './config'
import App from './app.vue'

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
