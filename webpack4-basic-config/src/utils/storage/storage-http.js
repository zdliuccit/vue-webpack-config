/**
 * 注册方法
 * @export {Function} install
 * @param {Object} Vue Vue 对象
 */
export function install(Vue) {
  Vue.prototype.getSOH = function getStorageOrHttp (key, url, param, type = 'get') {
    const storageKey = ['http', key]

    return new Promise((resolve, reject) => {
      const storage = this.$storage
      let response = storage.getItem(storageKey, false)

      if (!response) {
        reject(storage)
      }

      resolve(response)
    })
    .catch(storage => {
      return this.http[type](url, param)
      .then(res => {
        storage.setItem(storageKey, res, false)
        return storage.getItem(storageKey, false)
      })
    })
  }
}