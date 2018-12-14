/*eslint-disable*/

class VuexStorage {

  constructor(whiteList) {
    /**
     * @member {Array} $whiteList 路由初始化时的白名单
     */
    this.$whiteList = whiteList
    /**
     * @member {Object} $store vuex的实例 store
     **/
    this.$store = null
    /**
     *
     * @type {String} $mutation mutation 常量
     */
    this.$mutation = 'CONSTANT'
  }

  /**
   * 生成静态模块
   * @method generateVuexInstance
   * @return {Object} Vuex Modules 对象
   */
  generateModel() {
    const $this = this
    return {
      getters: {
        getItem: () => (key, isTemp) => {
          const {item} = $this.checkItem(key, isTemp)
          return item
        }
      },
      mutations: {
        [$this.$mutation]: (state, {key, value, isTemp}) => {
          const lastKey = key.pop()
          $this.checkItem(key, isTemp, false, {
            lastKey,
            value
          })
        }
      },
      modules: {
        stack: {},
        heap: {}
      }
    }
  }

  /**
   * 存储一项到仓库
   * @method setItem
   * @param {string|Array} key 需要存储的键
   * @param {*} value 需要存储的值
   * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
   */
  setItem(key, value, isTemp = true) {
  }

  /**
   * 获取仓库中的指定值
   * @method getItem
   * @param {string|Array} key 仓库中的键
   * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
   *
   */
  getItem(key, isTemp = true) {
  }

  /**
   * 删除指定的一项
   * @method removeItem
   * @param {string|Array} key 仓库中的键
   * @param {boolean} [isTemp=true] 是否删除临时的仓库，默认为 true
   */
  deleteItem(key, isTemp = true) {
  }

  /**
   * 清除所有
   * @method clear
   */
  clear(isTemp = true) {
  }

  /**
   * 检查路由白名单
   * @method checkWhiteList
   * @param {string} toPath 路径
   * @param {string} fromPath 路径
   */
  checkWhiteList(toPath, fromPath) {
    const whiteList = this.whiteList
    if (whiteList.indexOf(toPath) < 0 && whiteList.indexOf(fromPath) < 0) {
      this.clear()
    }
  }
}

/**
 * 初始化方法，生成 Vuex 实例
 * @method init
 * @param {Object} Vue Vue 对象
 * @param {Object} Vuex Vuex 对象
 * @param {Object} router vue-router 路由实例化对象
 * @param {Array}  whiteList 路由白名单, 此名单内的路径，不删除数据
 * @param {Promise} cb 在路由 beforeEach 中的回调函数。
 * 回调参数分别为 storage, to，from
 * @return {Object} Vuex 实例 store
 */
export default function (Vue, Vuex, router, whiteList = [], cb = () => Promise.resolve()) {
  Vue.use(Vuex)
  const storage = new VuexStorage(whiteList)
  const store = new Vuex.Store(storage.generateModel())
  if (router) {
    router.beforeEach((to, from, next) => {
      const {matched: toMatched} = to
      const {matched: fromMatched} = from
      const {path: fromPath} = toMatched || {}
      const {path: toPath} = fromMatched || {}
      storage.checkWhiteList(toPath, fromPath)
      cb(storage, to, from).then(() => next())
    })
  }

  storage.$store = store

  storage.clear()
  storage.clear(false)

  Vue.prototype.$storage = storage

  return store
}