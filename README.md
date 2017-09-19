# Webpack3 + Vue2 + Koa2 构建环境

Node.js服务端的基础设施

只需调用一个方法，并传入相应的配置，即可创建一个koa服务，内置如下这些东东：
中间件

1. koa-logger

被动功能，打印请求与响应
2. koa-compress

被动功能，对过大的响应内容进行压缩
3. webpack-dev-middleware

被动功能，开发模式使用，webpack开发中间件
4. webpack-hot-middleware

被动功能，开发模式使用，webpack热替换中间件
5. set-cookie

主动功能，开发模式使用，针对一些对登陆操作有特殊需求的项目开放的快速设置cookie的中间件。 提供了一个同步请求，主要在浏览器里手动拼接一个url即可，比如希望设置名为aaa，值为bbb的cookie，可以这样：
http://<ip>:<port>/set-cookie?name=aaa&value=bbb
6. routes

主动功能，Node.js为前端提供接口，由应用工程传入。
// routes/index.js
module.exports = function (router) {
  router.get('/user', (ctx, next) => {
    ctx.body = {
      aa: 'bbb',
    }
  })
}
const createApp = require('@sdk/server')

createApp({
  // 传入路由
  routes: require('./routes/index'),
}, () => {
  // do something
})
7. authMiddleware

可选，授权中间件坑位
8. spa

被动功能，单页应用中间件，用于页面的html5路由内置微信检业务安全域名的探测，防止点击文本框出现安全提示。
9. http

主动功能，提供http接口，用于服务器与服务器之间的通信，基于axios。
在你传入的任意中间件(包括路由handler)里，都可以使用：
module.exports = async function (ctx, next) {
  const result = await ctx.http.get('/url').then((res) => {
    return res.something
  })
  // something
}
ctx.http上挂载了get，post，put和delete四个方法，参数与axios相应方法一致，但是继承了客户端请求的cookie。
10. api接口代理

主动功能，api请求通过Node.js服务代理到具体的后端服务，支持多api代理。比如：
// server.config.js
module.exports = {
  appPort: 9001,
  proxy: {
    // /marketing/api/goods/path/aaa
    // 匹配前缀后，去掉这里的key，然后会被代理到 =>
    // http://a.com/path/aaa
    '/marketing/api/goods': 'http://a.com',
    // /marketing/api/common-service/path/bbb
    // 匹配前缀后，去掉这里的key，然后会被代理到 =>
    // http://192.168.xxx.yyy/path/bbb
    '/marketing/api/common-service': 'http://192.168.xxx.yyy',
  }
}  
11. sso单点登录

如果你的项目需要集成单点登陆，在开发阶段登陆、切换账号等操作是比较麻烦的，通过此中间件可以快速实现。 使用方式：
// server/app.js
const createApp = require('@sdk/server')

const middlewares = []
if (IS_DEBUG) {
  middlewares.push(
    require('@sdk/server/middlewares/dev-helper-sso-login')({
      // 可选，请求地址
      path: '/api/dev-helper/sso', // 此为默认值
    }))
}
createApp({
  middlewares,
})
// server.config.js
module.exports = {
  proxy: {

  },
  // 这里的配置与proxy一样可以实现热加载，即修改后，不需要重启服务，再次请求就能生效
  sso: {
    // 单点登陆主机
    ssoHost: 'https://sso-test.xkeshi.net',
    // 这里要填写完整的业务认证请求url，一般以/cas结尾
    apiCasUrl: 'http://goods.vip.test.xkeshi.so:8082/api/goods/cas',
  }
}
前端发起请求：
POST /api/dev-helper/sso
body:
{
  "username": "${username}",
  "password": "${password}"
}
path与传入上述koa中间件的path参数相对应，done.
你可以直接使用sdk提供的前端单点登陆插件
另外，如果你不需要单点登录中间件，只需要获取业务服务的cookie，进行后续的http操作，可以仅调用其中的工具方法：
const fetchBusinessCookies = require('@sdk/utils/fetch-sso-business-cookies')
fetchBusinessCookies({
  ssoHost: 'https://sso-test.xkeshi.net',
  apiCasUrl: 'http://goods.vip.test.xkeshi.so:8082/api/goods/cas',
  username: 'tjfx',
  password: '123456a',
})
  .then((cookies) => {
    // cookies即为业务后端返回的cookie数组
  })
gulp任务

服务端代码lint
nodemon方式启动Node.js服务
iconfont
Node.js端基础设施

1. 获取当前环境：

const { IS_DEBUG } = require('server/utils/env')
2. 日志

const logger = require('@sdk/server/utils/log')('namespace')

logger.debug('debug')
logger.warn('warn')
logger.error('error')
3.http方法

SDK集成的http方法，会把ctx中的cookie赋值给新的http请求，方便调用。
如果要向第三方服务发起请求，请不要用这个方法。
// 中间件
module.exports = async (ctx, next) => {
  // ctx.http.get
  // ctx.http.post
  // ctx.http.put
  // ctx.http.delete
  const result = await ctx.http.get('http://xxx.com').then((response) => {
    console.log(response.config)
    return response.data
  })

  ctx.body = result
}
webpack-dev-server

当需要开发Node.js服务端接口时，可能需要经常改代码并重启服务器，同时又想看到页面效果。那么可以使用分离模式启动两个服务来开发。这个就是webpack的打包服务，一般情况不需要关心这个模块，脚手架已经写好启动webpack打包服务的脚本，即：
npm run webpack-server
前端基础设施

工具类

1. env 环境变量

import IS_DEBUG from '@sdk/utils/env'
// IS_DEBUG 本地开发环境为true，打包出来的代码为false，可用于一些调试代码的执行条件
2. 浏览器存储工具方法

// localStorage，基于[localforage](https://github.com/localForage/localForage)，存储设置，均为异步方法，返回promise
import ls from '@sdk/utils/localstorage'

// sessionStorage
import ss from '@sdk/utils/sessionstorage'

ls.setItem('aa', 111)
//...
ls.getItem('aa').then((value) => {
  // value => 111
})

ss.setItem('bb', 222)
// ...
ss.getItem('bb').then((value) => {
  // value => 222
})
3. http(基于axios)

对于在vue组件中使用：
// 在某全局模块下，比如config.js
import Vue from 'vue'
import http from '@sdk/plugins/http'

Vue.use(http)
// 在某vue组件中，options可选
this.http.get(url, options)
this.http.delete(url, options)
this.http.post(url, data, options)
this.http.put(url, data, options)
对于非vue组件中使用：
import http from '@sdk/http'

http.get(url, options)
http.delete(url, options)
http.post(url, data, options)
http.put(url, data, options)
注意：对于get和delete方法(head和options方法其实也一样，我们不使用)，axios不会添加Content-Type头字段，因为没必要，Content-Type是对请求体(body)的类型描述，而get请求是不能携带请求体的.
对于post和put方法(patch方法其实也一样，我们不使用)，必须提供第二个data参数，才会添加Content-Type头字段，原因同上。如果实在没有数据提供，也请提供一个空对象，比如：
this.http.post(url, {})
4. log

对于在vue组件中使用：
// 在某全局模块下，比如config.js
import Vue from 'vue'
import log from '@sdk/plugins/log'

Vue.use(log)
// 在某vue组件中，namespace为component
this.log('xxx')
this.warn('yyy')
对于在非vue组件中：
import log from '@sdk/utils/log'

// namespace为log的命名空间，在浏览器控制台，可以看到前缀
const logger = log('namespace')

logger.log('aaa', 'ccc')
logger.warn('bbb', 'ddd')
注意：在开发模式下，默认会打印所有log日志，如果希望过滤某些日志，可以在浏览器的localStorage中，手动写入key为LOG，值为正则*的一条记录。
SDK会读取此记录，匹配它的命名空间的log才会打印，比如：
LOG => http-.*
只会打印以http-开头的log日志。
在打包模式下，默认不打印。
所有日志，如果需要打印某些日志，用法同上。如果希望打印所有日志，则可以在localStorage中写入：
LOG => .*
5.url

提供url相关方法，建议url统一放在集中的模块维护。
5.1 replaceVars

替换url中的『变量』，约定变量形式为{var}，var为变量名：
// vue组件中
import urls from 'urls'
import { replaceVars, isLocalAreaNet } from '@sdk/utils/url'

// 假设urls.users的值为 `/users/{uid}/credit/{cid}`
const reqUrl = replaceVars(urls.users, {
  uid: 22,
  cid: 33,
})

this.get(reqUrl, {
  // query参数放在这里
  params: {
    a: 1,
    b: 2,
  }
}).then((ret) => {
  // do something
})
// => /users/22/credit/33?a=1&b=2
5.2 isLocalAreaNet

判断给定url是否是局域网地址
import { isLocalAreaNet } from '@sdk/utils/url'

isLocalAreaNet('http://192.168.100.100/admin') // true
isLocalAreaNet('http://example.com/admin') // false
6. browser

判断当前浏览器厂商
import browser from '@sdk/util/browser'

browser.is('mobile')  // 是否移动设备
browser.is('ios')     // 是否iOS
browser.is('ios7')    // 是否iOS 7
browser.is('android') // 是否安卓
browser.is('wechat')  // 是否微信
browser.is('ie')      // 是否IE
7. Vue单点登陆插件

此组件属于开发环境的工具插件，用于快速SSO单点登陆。在集成环境，是通过正式的SSO系统间跳转完成单点登陆的，而本地开发时，无法通过这种方式完成单点登陆，因此本sdk提供了一个接口。
本组件只是提供一个默认的前端vue组件，如果你觉得UI不满意，完全可以自己开发一个你喜欢的UI，只要根据接口传递相应参数即可。
本组件使用后，会在页面左下角生成一个小trigger，点击（或F9）会弹出一个小弹窗，用于快速登陆你需要用户名/密码，登陆成功后自动刷新页面。
使用方法

前端

在一个比较全局的模块(比如config.js):
import { IS_DEBUG } from '@sdk/utils/env'
import Vue from 'vue'

// 开发环境引入单点登陆插件
if (IS_DEBUG) {
  require(['@sdk/plugins/sso'], (sso) => {
    Vue.use(sso, {
      // 是否隐藏账号信息，默认false
      hideAccountInfo: false,
      // 组件内默认有少量通用账号，这里可以追加账号
      accounts: [
        {
          username: 'xxx',
          env: 'test',
          rule: 'shop', // 可能的值：merchant: 集团 | shop: 商户 | sub-merchant: 子商户 | all: 所有
        }
      ]
    })
  })
}
Nodejs后端

请移步 sso单点登录
promise扩展

增加了finally方法, 无论当前promise被resolve或reject都会执行finally的回调
引入：
import '@sdk/utils/promise-extend'
使用：
Promise.resolve()
  .then(() => {
    console.log('ok')
  })
  .finally(() => {
    console.log('finally')
  })
// =>输出
// ok
// finally
Promise.reject()
  .finally(() => {
    console.log('finally')
  })
// =>输出
// finally
favicon

只需在你的工程根目录下，添加favicon.ico，即可在生成的index.html中带上favicon.
全局配置

eslint统一规则配置
nodemon配置
webpack统一配置，包括开发模式与生产模式
git提交钩子，验证eslint是否通过与提交信息是否符合规范
需要说明一下，webpack配置中对lodash打包做了优化，加入了lodash-webpack-plugin插件
需要在.babelrc中plugins数组中添加lodash：
{
  "plugins": ["lodash"]
}
然后在每个你需要使用 lodash 函数的模块中只需要引用一次 lodash，即可调用任意函数而不会造成完全打包：
import _ from 'lodash'

// ...
_.add(1, 2) // 打包时只会引入这一个函数模块
构建

在部署服务器，通过调用NODE_ENV=xxx npm run build命令进行构建
Node.js构建脚本读取应用工程的package.json中的disconf配置，并从配置中心拉取相应配置文件，目前至少包含api代理配置以及又拍云配置。
静态资源上传至又拍云CDN。
脚手架自动生成pm2配置文件，生产环境使用docker部署。
应用工程app.config.js配置

const path = require('path')
const serverConfig = require('./server.config')

module.exports = {
  // eslint中验证jsdoc的级别
  jsdocLevel: 1, // 0为关闭，1为警告，2为错误(不推荐)，以后等所有项目都使用此新SDK后，将默认强制开启，无法关闭

  // 主服务启动端口，不同的环境不一样，不能在这里写死
  appPort: serverConfig.appPort,

  // 代理配置，可支持多个代理，key为前缀，命中后，会把前缀去掉，转发到代理服务器
  proxy: serverConfig.proxy,

  // webpack服务端口，分离模式启动时用到
  webpackDevServerPort: 9002,

  // 可选，是否关闭spa中间件，用于纯Node项目，没有页面
  disableSPA: false, // 默认false

  // 可选，单页应用中间件选项
  spaOptions: {
    // 可选，需要被排除的url正则，如果匹配了这个正则，则不渲染单页应用页面，而且是进入下一个中间件
    exclude: /^\/(api|static|public)/, // 默认此值
  },

  // 可选，如果设置了trackId，将为构建出来的index.html添加ga脚本
  // 需要在应用工程的index.template.ejs中合适位置加入<%= htmlWebpackPlugin.options.gaScripts %>
  ga: {
    trackId: 'UA-XXXXX-Y',
  },

  // webpack的差异化配置
  webpack: {
    entry: {
      app: path.join(__dirname, 'client/index.js'),
    },
    // 出错时，是否弹出遮罩层
    overlay: true,
    // 是否对样式启用px到rem的转换
    enablePx2Rem: false,
    // 待合并子工程特殊别名，SDK中内置别名，请到/node_modules/@xkeshi/koa2-vue2-sdk/config/webpack.base.conf.js
    // 查看defaultResolveAlias变量
    resolveAlias: {
      common: path.join(__dirname, 'client/common'),
    },
    // 可选，可添加自定义loader,追加到内置loader之后
    rules: [
      {
        test: /\.xxx/,
        use: [{
          loader: 'xxx-loader',
          options: {
            limit: 1,
            name: 'resources/[path][name].[hash:8].[ext]',
          },
        }],
      },
    ],
  },

  // 可选，gulp相关任务配置
  gulp: {
    // 根据svg生成icon字体
    // 注意！！！
    // 如需执行此任务，需额外安装`gulp-iconfont` 与 `gulp-iconfont-css`这两个包
    // 此任务不会在集成环境执行，请管理字体的童鞋手动执行`gulp iconfont`
    iconfont: {
      svgGlob: 'client/assets/svgs/*.svg',
      iconfontCssOptions: {
        // 字体名字
        fontName: 'demo-icon',

        // 字体class前缀
        cssClass: 'demo-icon',

        // 输出路径，相对于dest路径值
        targetPath: '../iconfont.styl',

        // css中字体的路径字符串，比如：src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot')
        fontPath: 'fonts/',
      },

      iconfontOptions: {
        // 字体名字
        fontName: 'demo-icon',

        // 是否修正
        normalize: true,

        // 字体类型
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      },

      dest: 'client/assets/styles/fonts',
    },
  },
}
中间件

文件上传

Node.js端

在server/app.js中添加中间件即可：
// @sdk别名在server/index.js中定义
// options整个可选，里面的每一项都是可选，给出的是默认值
const options = {
  // 上传请求的路由
  path: '/api/upload',

  // 表单中的文件字段名
  filename: 'upfile',

  // 对上传结果的解析回调，解析后的结果返回给浏览器
  parser: (result) => {
    const code = result.state === 'SUCCESS' ? '0' : '-1'
    const description = result.msg

    return {
      code,
      description,
      result,
    }
  },
}

createApp({
  middlewares: [
    require('@sdk/server/middlewares/upload')(options),
  ],
  // ...其他参数
})
前端

const formData = new FormData()

// refs只是一个例子
formData.append('upfile', this.$refs.file.files[0])

axios.post('/api/upload', formData).then((res) => {
  console.log(res.data.result.url)
})
关于jsdoc

JSDoc官方文档
演示一下jsdoc的标准写法：
/**
 * 解释这个function的作用，可以把处理的思路写下来
 * @param  {Array} param1 - 参数param1的解释
 * @param  {Object} param2 - 参数param2的解释
 * @param  {number} param3 - 参数param3的解释
 * @return {string} 对返回值的解释，如果没有返回值，则不需要添加这一项
 */
function jsdocExample(param1, param2, param3) {
  // ...
  return ''
}
提供给后端的调试功能

后端可以在浏览器localStorage中手动写入键值对：
key: proxyconfig
value: {"/api": "http://192.168.1.1:8080"}
然后，刷新页面，前端代码将会读取这个键值，将其附加在ajax请求头中，Node.js服务会将这个json解析并与服务器环境代理配置合并(Object.assign)，由此将Node.js转发地址改为指定地址(通常为后端本地服务)。
注：出于安全考虑，在生产环境此方法无效。
测试

在项目根目录下创建test文件夹，在里面创建karma.conf.js，包含如下代码：
module.exports = require('@xkeshi/koa2-vue2-sdk').config.karma
同时创建test.js作为webpack打包的入口文件，一般来说，这个入口文件是为了包含所有测试用例为目的的，比如：
const testsContext = require.context('./unit', true, /_test$/)
testsContext.keys().forEach(testsContext)
以此来包含所有unit目录下所有以*_test.js为文件名的文件，并执行他们。详细可以参考webpack的require.context。
另外建议创建.eslintrc.js文件来来加入以下测试代码常用的公共方法，比如describe：
module.exports = require('@xkeshi/koa2-vue2-sdk').config.eslintTest**



