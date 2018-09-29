<template>
  <div class="demo-home">
    <h1>Webpack4 + Vue2 + Koa2 构建SSR应用脚手架</h1>
    <div class="demo-warp">
      <div class="img-logo"></div>
      <div class="demo-js">
        <p><a href="https://koa.bootcss.com" target="_blank" title="Koa 2.5.2">Koa 2.5.2</a></p>
        <p><a href="https://vuejs.org" target="_blank" title="Vue 2.5.17">Vue 2.5.17</a></p>
        <p><a href="https://webpack.github.io" target="_blank" title="Webpack 4.16.5">Webpack 4.16.5</a></p>
      </div>
      <ul class="func-ul">
        <li><a @click="$router.push('/test/data')" href="javascrip:void(0);">Vuex数据处理</a></li>
        <li><a @click="$router.push('/test/ajax')" href="javascrip:void(0);">Axios ajax数据接口请求</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    title: 'Webpack4 + Vue2 + Koa2 构建SSR应用脚手架',
  }
</script>
<style lang="stylus" scoped>
  .demo-home {
    padding: 60px 0;
    h1 {
      text-align: center;
      font-size: 33px;
      color: #333;
    }
  }

  .demo-warp {
    width: 680px;
    margin: 0 auto;
    min-height: 330px;
    padding: 30px 0;
    .img-logo {
      float: left;
      width: 160px;
      height: 160px;
      background: url('./../assets/images/logo.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 30px;
    }
    .demo-js {
      padding: 2px;
      float: left
      width: 220px;
      a {
        color: #4fc08d;
      }
    }
    .func-ul {
      padding: 2px;
      float: left;
    }

    a {
      font-size: 22px;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }

  .demo-warp:after {
    display: block;
    content: '';
    clear: both;
  }

</style>