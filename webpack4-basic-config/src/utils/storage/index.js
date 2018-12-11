/* eslint-disable */
/**
 * Vuex 数据存储方法
 * @Author: Mess
 * @Date: 2017-04-17 10:03:52
 * @Last Modified by: Mess
 * @Last Modified time: 2017-05-24 13:31:51
 */
import Vuex from 'vuex'

/**
 * Vuex 数据存储类
 *
 * @class VuexStorage
 */
class VuexStorage {

  /**
   * VuexStorage 的构造函数
   * @constructor
   * @param {Array} whiteList 路由白名单
   * @param {Object} store Vuex store
   *
   * @memberOf VuexStorage
   */
  constructor(whiteList) {
    /**
     * @member {Array} whiteList clear 的白名单
     */
    this.whiteList = whiteList
    /**
     * @member {Object} $store vuex store
     */
    this.$store = undefined
    /**
     * @member {boolean} innerOperation 是否为内部操作
     */
    this.innerOperation = false
    /**
     * @member {string} UPDATE_ITEM 更新方法 key 值
     */
    this.UPDATE_ITEM = 'update item'
    /**
     * @member {boolean} 是否获取备用仓库
     */
    this.getBackUp = false
  }

  /**
   * 生成静态模块
   * @method generateVuexInstance
   * @return {Object} Vuex Modules 对象
   */
  generateVuexInstance() {
    const $this = this
    return {
      getters: {
        getItem: () => (key, isTemp) => {
          const { item } = $this.checkItem(key, isTemp)
          return item
        }
      },
      mutations: {
        [$this.UPDATE_ITEM]: (state, { key, value, isTemp }) => {
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
   * @param {any} value 需要存储的值
   * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
   *
   * @memberOf VuexStorage
   */
  setItem(key, value, isTemp = true) {
    if (!this.innerOperation) {
      const keys = [].concat(key)
      keys.pop()
      this.checkItem(keys, isTemp, true)
    }

    VuexStorage.loopCallBack((store, index) => {
      const setKey = store.concat(key)
      let setValue = index === 0 ? value : Object.assign({}, value)
      if (store.indexOf('backup') >= 0) {
        this.getBackUp = true
        const backupValue = this.getItem(key)
        this.getBackUp = false
        if (backupValue) {
          setValue = backupValue
        }
      }
      this.$store.registerModule(setKey, { state: setValue })
    }, isTemp)

    this.innerOperation = false
  }

  /**
   * 实例方法，用于快速增加 item 列表和更新白名单
   * @method hyperChannel
   * @param {Array} [whiteList=[]] 路由白名单
   * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
   * @param {RestObejct} items rest 风格 item 列表
   *
   * @memberOf VuexStorage
   */
  hyperChannel(whiteList = [], isTemp = true, ...items) {
    this.whiteList = whiteList
    for (let { key, value } of items) {
      const temp = this.getItem(key, isTemp)
      if (temp) {
        if (value instanceof Object) {
          Object.assign(value, temp)
        } else if (value instanceof Array) {
          value.splice(0, value.length, ...temp)
        } else {
          value = temp
        }
      }
      this.setItem(key, value, isTemp)
    }
  }

  /**
   * 删除指定的一项
   * @method removeItem
   * @param {string|Array} key 仓库中的键
   * @param {boolean} [isTemp=true] 是否删除临时的仓库，默认为 true
   *
   * @memberOf VuexStorage
   */
  removeItem(key, isTemp = true) {
    const { isPass } = this.checkItem(key, isTemp)

    if (isPass) {
      VuexStorage.loopCallBack(store => {
        this.$store.unregisterModule(store.concat(key))
      }, isTemp)
    }
  }

  /**
   * 重置指定项
   * @method resetItem
   * @param {string|Array} key 仓库中的键
   * @param {boolean} [isTemp=true] 是否删除临时的仓库，默认为 true
   *
   * @memberOf VuexStorage
   */
  resetItem(key, isTemp = true) {
    const { isPass } = this.checkItem(key, isTemp)

    if (isPass) {
      this.getBackUp = true
      const value = this.getItem(key, isTemp)
      this.setItem(key, JSON.parse(JSON.stringify(value)), isTemp)
      this.getBackUp = false
    }
  }

  /**
   * 清除所有
   * @method clear
   * @param {boolean} [isTemp=true] 是否清楚临时的仓库，默认为 true
   *
   * @memberOf VuexStorage
   */
  clear(isTemp = true) {
    this.removeItem([], isTemp)
    this.innerOperation = true
    this.setItem([], {}, isTemp)
  }

  /**
   * 更新指定项
   * @method updateItem
   * @param {string|Array} key 仓库中的键
   * @param {any} value 需要修改的值
   * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
   *
   * @memberOf VuexStorage
   */
  updateItem(key, value, isTemp = true) {
    this.$store.commit({
      type: this.UPDATE_ITEM,
      key,
      value,
      isTemp
    })
  }

  /**
   * 获取仓库中的指定值
   * @method getItem
   * @param {string|Array} key 仓库中的键
   * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
   * @return {any} 仓库中存储的值
   *
   * @memberOf VuexStorage
   */
  getItem(key, isTemp = true) {
    return this.$store.getters.getItem(key, isTemp)
  }

  /**
   * 检查项是否存在
   * @method checkItem
   * @param {string|Array} key 检查的项的键值
   * @param {boolean} [isTemp=true] 是否检查临时仓库
   * @param {boolean} [isWrite=false] 当项不存在是否自动创建
   * @param {Object} [updateItem=undefined] 更新项
   * @returns {boolean|Object} 返回
   *
   * TODO: 将此方法， 拆分成多个独立方法并只有一次循环
   *
   * @memberOf VuexStorage
   */
  checkItem(key, isTemp, isWrite = false, updateItem = undefined) {
    const keys = VuexStorage.getStorageRelation(isTemp)[this.getBackUp ? 1 : 0].concat(key)
    const itemRelation = []
    let parentItem = this.$store.state

    const isPass = !(keys.some(k => {
      let item = parentItem[k]

      if (!item) {
        itemRelation.push(k)
        if (!isWrite) {
          return true
        }
        this.innerOperation = true
        this.setItem(itemRelation, {}, isTemp)
        item = parentItem[k]
      }

      parentItem = item
      return false
    }))

    if (!isPass) {
      parentItem = undefined
    } else if (updateItem) {
      const { lastKey, value } = updateItem
      parentItem[lastKey] = value
    }

    return {
      isPass,
      item: parentItem
    }
  }

  /**
   * 检查路由白名单
   * @method checkWhiteList
   * @param {string} toPath 路径
   * @param {string} fromPath 路径
   *
   * @memberOf VuexStorage
   */
  checkWhiteList(toPath, fromPath) {
    const whiteList = this.whiteList
    if (whiteList.indexOf(toPath) < 0 && whiteList.indexOf(fromPath) < 0) {
      this.clear()
    }
  }

  /**
   * 循环调用回调函数
   * @static
   * @method loopCallBack
   * @param {Function} cb 每个仓库的回调使用方法
   * @param {boolean} isTemp 是否使用临时仓库
   *
   * @memberOf VuexStorage
   */
  static loopCallBack(cb, isTemp) {
    const stores = VuexStorage.getStorageRelation(isTemp)
    stores.forEach((store, index) => {
      cb(store, index)
    })
  }

  /**
   * 获取仓库基础关系
   * @static
   * @method getStorageRelation
   * @param {boolean} isTemp 是否取出临时仓库的基础关系
   * @return {Array} 仓库的基础关系
   * @memberOf VuexStorage
   */
  static getStorageRelation(isTemp) {
    const baseStore = isTemp ? 'stack' : 'heap'
    return [
      [baseStore, 'using'],
      [baseStore, 'backup']
    ]
  }

}

/**
 * 初始化方法，生成 Vuex 实例
 * @method init
 * @param {Object} Vue Vue 对象
 * @param {Object} router vue-router 路由实例化对象
 * @param {Array}  RouterWhiteList 路由白名单, 此名单内的路径，不删除数据
 * @param {Promise} cb 在路由 beforEach 中的回调函数。
 * 回调参数分别为 storage, to，from
 * @return {Object} Vuex 实例
 */
export default function init(Vue, router, RouterWhiteList = [], cb = () => Promise.resolve()) {
  Vue.use(Vuex)
  Vue.use(require('./storage-http'))

  const storage = new VuexStorage(RouterWhiteList)
  const store = new Vuex.Store(storage.generateVuexInstance())

  if (router) {
    // 工作台所在的工程也统一用跳转吧，毕竟小概率事件
    // router.addRoutes([
    //   {
    //     path: '*',
    //     redirect: (to) => {
    //       const target = '/gd/login'
    //       // 非common工程的本地环境会死循环，处理一下
    //       if (to.fullPath === target) {
    //         return to
    //       }
    //       global.location.href = `${global.location.origin}${target}`
    //     }
    //   }
    // ])
    router.beforeEach((to, from, next) => {
      const { matched: toMatched } = to
      const { matched: fromMatched } = from
      const { path: fromPath } = [].concat(fromMatched).pop() || {}
      const { path: toPath } = [].concat(toMatched).pop() || {}
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
