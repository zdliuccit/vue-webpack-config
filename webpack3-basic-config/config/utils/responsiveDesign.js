/**
 * rem响应式方案的实现
 * 启用px到rem的转换enablePx2Rem配置项才会执行
 */
import { throttle } from './StringUtils'
const enablePx2Rem = require('./../../app.config').webpack.enablePx2Rem
if (enablePx2Rem) {
  const win = global
  const doc = win.document
  const baseWidth = 750
  const documentHTML = doc.documentElement
  let pixelRatio = 2

  /**
   * 设置html根字体
   */
  function setRootFont () {
    const docWidth = documentHTML.getBoundingClientRect().width
    const scale = docWidth / baseWidth
    documentHTML.style.fontSize = `${scale * 100}px`
    pixelRatio = global.devicePixelRatio === 3 ? 3 : 2
    documentHTML.setAttribute('data-dpr', pixelRatio)
  }

  setRootFont()
  win.addEventListener('resize', throttle(setRootFont, 90, 100), false)
}

