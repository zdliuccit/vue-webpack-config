/**
 * Created by liuzhengdong on 2017/9/22.
 * 存放公共方法
 */
module.exports = {
  /**
   * 函数节流
   * @param fn  函数
   * @param delay 多久执行一次
   * @param mustRunDelay 执行时间间隔
   * @return {Function}
   */
  throttle: function (fn, delay, mustRunDelay) {
    let timer = null
    let t_start
    return function () {
      let context = this, args = arguments, t_curr = +new Date()
      clearTimeout(timer)
      if (!t_start) {
        t_start = t_curr
      }
      if (t_curr - t_start >= mustRunDelay) {
        fn.apply(context, args)
        t_start = t_curr
      }
      else {
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }
  }
}