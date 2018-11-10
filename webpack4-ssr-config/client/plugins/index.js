import Vue from 'vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

if (process.browser) {
  Vue.use(require('vue-quill-editor/dist/ssr'))
}