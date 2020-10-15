/**
 * @file limitFlow Node服务限制流量处理中间件
 * @desc 业务代码中的逻辑限流
 * @desc 常见的限流算法有：计数器、令牌桶、漏桶。这些都属于单机限流的范畴
 * @desc 另外为了限制某个资源被每个用户或者商户的访问次数，5s只能访问2次，或者一天只能调用1000次。这种需求，单机限流是无法实现的，这时就需要通过集群限流进行实现。
 * 如何实现？为了控制访问次数，肯定需要一个计数器，而且这个计数器只能保存在第三方服务，比如redis。
 */
import appConfig from './../../app.config'

const { enable, upperLimit, rate } = appConfig.currentLimitedConfig

export default () => {
  let bucket = 0
  const callback = () => {
    setTimeout(() => {
      if (bucket < upperLimit) {
        bucket += 1
      }
      callback()
    }, 1000 / rate)
  }
  callback()
  return async (ctx, next) => {
    // console.log('当前Token bucket  ', bucket)
    if (enable && bucket <= 0) {
      console.log('Token bucket 耗尽，开启限流')
      return ctx.body = { data: null, status: false, message: '亲～人太多，被挤爆了！' }
    }
    bucket -= 1;
    await next()
  }
}
