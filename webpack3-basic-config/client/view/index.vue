<template>
  <div class="test">
    <div><img src="./../assets/images/logo.png"/></div>
    <h1>{{msg}}</h1>
    <div class="cc-test">
      <div>代理配置: http://restapi.amap.com/v3/</div>
      <div>测试接口: {{testUrl}}</div>
      <div>
        <button class="cs-btn" @click="sendGet">测试</button>
        <button class="cs-btn">跳转</button>
      </div>
      <div>返回结果: {{result}}</div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        ss: 333,
        testUrl: '/v3/assistant/coordinate/convert?key=ff0bcf778c5eeb93bd8b068b6e3f7781&locations=116.481499,39.990475|116.481499,39.990375',
        result: '',
      }
    },
    methods: {
      /**
       * 测试
       */
      sendGet () {
        this.log('开始请求')
        this.info('开始请求')
        this.warn('开始请求')
        this.error('开始请求')
        this.result = ''
        this.http.get(this.testUrl)
          .then((resp) => {
            this.result = resp
          })
          .catch(() => {
            this.error('出错了')
          })
      },
    },
  }
</script>
<style lang="stylus" ref="stylesheet/stylus" scoped>
  .test {
    padding: 20px;
    color: #2c3e50;
    div {
      padding: 5px 0;
    }
    h1 {
      font-size: 24px;
    }
    .cc-test {
      width: 860px;
      margin: 0 auto;
      text-align: left;
    }
    .cs-btn {
      padding: 3px 10px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-right: 30px;
      border-radius: 6px;
    }
  }
</style>
<style lang="stylus" ref="stylesheet/stylus">
  @import './test-styl.styl';
  @import './test.css';
  .test {
    text-align: center;
  }
</style>
