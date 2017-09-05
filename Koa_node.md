koa服务用到的node包
```html
安装koa-static和koa-views用于设置koa的静态文件目录和模板渲染




# 安装热加载模块
cnpm install koa-webpack-middleware -d
# koa2中使用的是async await异步中间件，
# koa-webpack-middleware返回的仍然是generator，需要用koa-convert转换下
cnpm install koa-convert -d

