# vue + koa2 + webpack4 构建ssr项目

## 什么是服务器端渲染 (SSR)？为什么使用服务器端渲染 (SSR)？
 
看这 [Vue SSR 指南](https://ssr.vuejs.org/zh/)
  
## 技术栈
- vue、vue-router、vuex
- koa2
- webpack4
- axios
- babel、eslint
- css、stylus、postcss
- pm2

## 目录层次和说明
``` bash
webpack4-ssr-config
├── client # 项目代码目录
│   ├── assets # css、images等静态资源目录
│   ├── components # 项目自定义组件目录
│   ├── plugins # 第三方插件(只能在客户端运行)目录，比如 编辑器
│   ├── store # vuex数据存储目录
│   ├── utils # 通用Mixins目录
│   ├── views # 业务视图.vue和route路由目录
│   ├── app.vue # 
│   ├── config.js # vue组件、mixins注册，http拦截器配置等等
│   ├── entry-client.js # 仅运行于浏览器
│   ├── entry-server.js # 仅运行于服务器
│   ├── index.js # 通用 entry
│   ├── router.js # 路由配置和相关钩子配置
│   └── routes.js # 汇聚业务模块所有路由route配置
├── config # 配置文件目录
│   ├── http # axios封装的http请求
│   ├── logger # .vue里this.[log,warn,info,error]和koa2里 logger日志输出
│   ├── middle # koa2中间件目录
│   │   ├── errorMiddleWare.js # 错误处理中间件
│   │   ├── proxyMiddleWare.js # 接口代理中间件
│   │   └── staticMiddleWare.js # 静态资源中间件
│   ├── eslintrc.conf.js # eslint详细配置
│   ├── index.js # server入口
│   ├── koa.server.js # koa2服务详细配置
│   ├── setup.dev.server.js # koa2开发模式实现hot热更新
│   ├── vue.koa.ssr.js # vue ssr的koa2中间件。匹配路由、请求接口生成dom，实现SSR
│   ├── webpack.base.config.js # 基本配置 (base config) 
│   ├── webpack.client.config.js # 客户端配置 (client config)
│   └── webpack.server.config.js # 服务器配置 (server config)
├── dist # 代码打包目录
├── log # pm2日志输出目录
├── node_modules # node包
├── .babelrc # babel配置
├── .eslintrc.js # eslint配置
├── .gitignore # git配置
├── app.config.js # 端口、代理配置、webpack配置等等
├── constants.js # 存放常量
├── favicon.ico # ico图标
├── index.template.ejs # index模板
├── package.json # 
├── package-lock.json # 
├── pm2.config.js # 项目pm2配置
├── pm2.md # pm2的api文档
├── postcss.config.js # postcss配置文件
└── README.md # 文档
```

## 源码结构
包括了路由和代码分割、数据预取和状态、客户端激活 Head 管理


## koa服务























