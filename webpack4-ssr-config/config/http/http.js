/**
 * Created by zdliuccit on 2019/1/14.
 * @file axios封装
 * export default http 接口请求
 * export addRequestInterceptor 请求前拦截器
 * export addResponseInterceptor 请求后拦截器
 * export setCookies 同步cookie
 */
import axios from 'axios'

const currentIP = require('ip').address()
const appConfig = require('./../../app.config')

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}
Object.assign(axios.defaults.headers.common, defaultHeaders)

if (!process.browser) {
  axios.defaults.baseURL = `http://${currentIP}:${appConfig.appPort}`
}
const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'request', 'head']

const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})

export const addRequestInterceptor = (resolve, reject) => {
  if (axios.interceptors.request.handlers.length === 0) axios.interceptors.request.use(resolve, reject)
}
export const addResponseInterceptor = (resolve, reject) => {
  if (axios.interceptors.response.handlers.length === 0) axios.interceptors.response.use(resolve, reject)
}
export const setCookies = Cookies => axios.defaults.headers.cookie = Cookies

export default http
