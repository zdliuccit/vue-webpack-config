function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}

/**
 * 生产环境 server处理
 */
const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) this.$ssrContext.title = title || 'Vue Koa2 SSR'
  }
}

/**
 * 开发环境 正常处理
 */
const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    if (title) document.title = title || 'Vue Koa2 SSR'
  }
}

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin
