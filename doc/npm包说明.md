NPM包说明

* `koa`
* `koa-static`和`koa-view` 用于设置koa的静态文件目录和模板渲染
* `koa-webpack-dev-middleware`和`koa-webpack-hot-middleware` 开发和热加载模块
* `koa-convert` 将generator转成 async await异步中间件
* `koa-compose` koa2不需要再借助于co这种工具库了，所以有了koa-compose
* `koa-better-http-proxy` Koa中间件代理请求到另一个主机并通过响应
* `url` This module has utilities for URL resolution and parsing meant to have feature parity with node.js core url module.

* vue
* vue-router
* autoprefixer // css兼容性，对不同的浏览器加上前缀
* opn // 打开指定浏览器
* axios 用于浏览器和node.js的基于Promise的HTTP客户端
* ora 优雅的终端旋转器
* cross-env 运行跨平台设置和使用环境变量的脚本
* `Lodash`这是一个具有一致接口、模块化、高性能等特性的 JavaScript 工具库
  
* `babel-core`
---
如果你需要以编程的方式来使用 Babel，可以使用 babel-core 这个包。
babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，
如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。首先安装 babel-core。
还可以通过babel-register和babel-node使用Babel，但由于这两种用法不适合生产环境故省略。

* `babel-preset-es2015`  打包了 es6 的特性
* `babel-preset-latest`
latest是一个特殊的presets，包括了es2015，es2016，es2017的插件（目前为止，以后有es2018也会包括进去）。
即总是包含最新的编译插件。
* `babel-preset-env`
 上面提到的各种preset的问题就是: 它们都太”重”了, 即包含了过多在某些情况下不需要的功能. 比如,
 现代的浏览器大多支持ES6的generator, 但是如果你使用babel-preset-es2015,
 它会将generator函数编译为复杂的ES5代码, 这是没有必要的。但使用babel-preset-env, 我们可以声明环境, 然后该preset就会只编译包含我们所声明环境缺少的特性的代码，因此也是比较推荐的方式。
```json
{
  "presets": ["env"]
}

```
* `babel-preset-stage-0` 打包处于 strawman 阶段的语法 0、1、2、3总共4个阶段
* `babel-polyfill`  代码填充，也可译作兼容性补丁, 文件顶部引入就行，import "babel-polyfill";
* `babel-plugin-transform-runtime` 和 `babel-runtime` 功能和`babel-polyfill`一样
```js
// 你不介意污染全局变量 用 babel-polyfill
// 写模块，为了避免污染使用者的环境 只能用 babel-runtime + babel-plugin-transform-runtime。
```
* `babel-loader`
* `babel-eslint`


* `extract-text-webpack-plugin` 抽离js中的css样式
* `url-loader`、`file-loader`打包文件和图片 url-loader是对file-loader的上层封装，比如webpack中对图片的加载器配置
```js
{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
//一般限制小图片转 base64 可以用 url-loader，其他情况都用 file-loader。
```
* `json-loader`
* `vue-loader`
* `style-loader` 样式装载机 通过注入<style>标签将CSS添加到DOM
* `stylus-loader` 
* `stylus` stylus预处理

* `postcss-loader` webpack通过postcss-loader添加浏览器前缀
* `postcss-pxtorem` 用于从像素单元生成rem单位，移动端解决适配方案
* `chalk`  颜色插件
```js
const name = 'Sindre';
console.log(chalk.green('Hello %s'), name);
//=> 'Hello Sindre' 
```

* `ip` 获取ip地址
* `localforage` 离线数据缓存 替代localStorage
```js
/** localStorage 能够让你实现基本的数据存储，但它的速度慢，而且不能处理二进制数据。IndexedDB 和 WebSQL 是异步的，速度快，支持大数据集，但他们的API 使用起来有点复杂。不仅如此，IndexedDB 和 WebSQL 没有被所有的主流的浏览器厂商支持，这种情况最近也不太可能改变。

　　Mozilla 开发了一个叫 localForage 的库 ，使得离线数据存储在任何浏览器都是一项容易的任务。

　　localForage 是一个使用非常简单的 JavaScript 库的，提供了 get，set，remove，clear 和 length 等等 API，还具有以下特点：

支持回调的异步 API；
支持 IndexedDB，WebSQL 和 localStorage 三种存储模式（自动为你加载最佳的驱动程序）；
支持 BLOB 和任意类型的数据，让您可以存储图片，文件等等。
支持 ES6 Promises；
**/
```

* webpack
* `friendly-errors-webpack-plugin`  识别某些类别的Webpack错误并进行清理，聚合和优先排序，以提供更好的开发者体验
* `html-webpack-plugin` 优化Lodash。 这个插件用来简化创建服务于 webpack bundle 的 HTML 文件，尤其是对于在文件名中包含了 hash 值，

[其他详细文案可以参考WEBPACK](http://www.css88.com/doc/webpack/)
