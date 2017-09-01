/**
 * http中间件
 */
const axios = require('axios')
// const beautifyJSON = require('../utils/beautify-json')
// const logger = require('../utils/log')('koa2-vue2-sdk:http')

const methods = ['get', 'post', 'put', 'delete']

/**
 * 默认请求头
 */
const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}

const axiosInstance = axios.create({
  timeout: 20 * 1000,
  headers: defaultHeaders,
})

axiosInstance.interceptors.request.use(
  (config) => {
    config._reqeustStartTimestamp = Date.now()
    // 与下面的<-- Server response for 保持队形整齐
    // logger.debug(`--> Remote server request:     '${config.method.toUpperCase()} ${config.url}'`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    const config = response.config
    /* eslint-disable max-len */
    // logger.debug(`<-- Remote server response(${response.status}) costing ${Date.now() - config._reqeustStartTimestamp}ms for '${config.method.toUpperCase()} ${config.url}': ${beautifyJSON(response.data)}`)
    /* eslint-enable */
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 为ctx添加http方法, 然后在后续的路由中, ctx.http.get(url: '/someUrl') 即可
 * @returns {Function} ctx function
 */
module.exports = function () {
  return function httpMiddelware(ctx, next) {
    const http = {}
    methods.forEach(method => {
      http[method] = (...args) => {
        let config
        const emptyConfig = { headers: {} }
        // axios的get和delete方法木有body，只能接受两个参数
        if (method === 'get' || method === 'delete') {
          config = args[1] = args[1] || emptyConfig
        } else {
          config = args[2] = args[2] || emptyConfig
        }
        // 把浏览器的cookie的带上
        config.headers.cookie = ctx.req.headers.cookie || ''
        return axiosInstance[method](...args)
      }
    })
    ctx.http = http
    return next()
  }
}
