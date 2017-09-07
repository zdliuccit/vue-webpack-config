/**
 * Created by liuzhengdong on 2017/9/6.
 */
import axios from 'axios'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}
/**
 * 后端手动在浏览器中设置localStorage
 * 提前获取proxyconfig, 缓存住,最好还是用同步方式,异步代码太复杂
 */
const API_HOST_KEY = 'proxyconfig'
let API_HOST_VALUE
// 服务端渲染时，localStorage不可用
if (global.localStorage) {
  API_HOST_VALUE = global.localStorage.getItem(API_HOST_KEY)
}

if (API_HOST_VALUE) {
  defaultHeaders[API_HOST_KEY] = API_HOST_VALUE
}

// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders)

const methods = ['get', 'post', 'put', 'delete']

const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})

export default http

export const addRequestInterceptor =
  axios.interceptors.request.use.bind(axios.interceptors.request)

export const addResponseInterceptor =
  axios.interceptors.response.use.bind(axios.interceptors.response)
