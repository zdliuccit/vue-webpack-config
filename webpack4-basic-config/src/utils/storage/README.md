# x-vuex-storage

基于 vuex 的数据存储栈

## GET STARTED

安装所依赖的包
```bash
npm i
```

启动服务用于查看 demo
```bash
npm start
```

## USAGE

在最开始的时候请用以下方式实例化此方法
```javascript
import VuexStorage from '@xkeshi/x-vuex-storage'
import Vue from 'vue'
import VueRouter from 'vue-router'

const router = new VueRouter(...)

/**
 * @param {Object} Vue Vue
 * @param {router} [router=undefined] VueRouter 实例化对象
 * @param {array} [whiteList=[]] 路由白名单
 * @param {Function} cb 回调函数 函数内返回 Promise
 * 函数的返回参数有:
 * $storage -- VuexStorage 的对象
 * to -- router beforeEach 的 to
 * from -- router beforeEach 的 from
 */
const store = VuexStorage(Vue, router, whiteList, ($storage, to, from) => Promise.resolve())

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

暴露在原型链上的对象为
```javascript
this.$storage
```

此对象的属性为
```javascript
// 为路由白名单，传入一个数组
this.$storage.whiteList
```

# :warning:警告
### 每一个方法中注意 isTemp 这个参数
### 默认为 true 用于存放至临时仓库会在每次路由变更且不为白名单的路径时清空此仓库
### 如果将手动变为 false 将会存放至永久仓库，只会在页面物理刷新和新开页面时清空

此对象的方法分别为

```javascript
/**
 * 存储一项到仓库
 * @method setItem
 * @param {string|Array} key 需要存储的键
 * @param {any} value 需要存储的值
 * @param {boolean} [isTemp=true] 是否存储到临时的仓库
 */
this.$storage.setItem(key, value, isTemp)

/**
 * 用于快速增加 item 列表和更新白名单
 * 此方法在使用时会自动将对象和数组自动赋值给· items 的 value
 * 但是用值类型的变量需要在手动使用 getItem 获取
 * @method hyperChannel
 * @param {Array} [whiteList=[]] 路由白名单
 * @param {boolean} [isTemp=true] 是否存储到临时的仓库，默认为 true
 * @param {RestObejct} items rest 风格 item 列表
 */
this.$storage.hyperChannel(whiteList = [], isTemp = true, ...items)

/**
 * 删除指定的一项
 * @method removeItem
 * @param {string|Array} key 仓库中的键
 * @param {boolean} [isTemp=true] 是否删除临时的仓库
 */
this.$storage.removeItem(key, isTemp)

/**
 * 重置指定项
 * @method resetItem
 * @param {string|Array} key 仓库中的键
 * @param {boolean} [isTemp=true] 是否删除临时的仓库
 */
this.$storage.resetItem(key, isTemp)

/**
 * 清除所有
 * @method clear
 * @param {boolean} [isTemp=true] 是否清楚临时的仓库
 */
this.$storage.clear(isTemp)
/**
 * 更新指定项
 * @method updateItem
 * @param {string|Array} key 仓库中的键
 * @param {any} value 需要修改的值
 * @param {boolean} [isTemp=true] 是否存储到临时的仓库
 */
this.$storage.updateItem(key, value, isTemp)

/**
 * 获取仓库中的指定值
 * @method getItem
 * @param {string|Array} key 仓库中的键
 * @param {boolean} [isTemp=true] 是否存储到临时的仓库
 * @return {any} 仓库中存储的值
 */
this.$storage.getItem(key, isTemp)
```