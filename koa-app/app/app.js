import Koa from 'koa'
import Logger from 'koa-logger'
import Compress from 'koa-compress'
import Session from 'koa-session'
import KeyGrip from 'keygrip'
import appConfig from './../app.config'
import middles from './middleWares'
import router from './router'

const app = new Koa()
/** 设置签名cookie密钥。*/
app.keys = new KeyGrip(['zdliuccit', 'ml', 'app'], 'sha256');

/** session设置 */
const SESSION_CONFIG = {
  key: 'ml-app', /** cookie键 */
  maxAge: 60 * 60 * 24 * 1000, /** session过期时间 */
  renew: false, /** 当会话即将过期时续订会话，因此我们可以始终保持用户登录。*/
};
app.use(Session(SESSION_CONFIG, app));
app.use(Logger())
app.use(Compress())

/**
 * 启动自定义中间件
 */
middles(app)

/**
 * 启动路由
 */
router(app)

/**
 * app错误监听
 */
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appConfig.appPort)
