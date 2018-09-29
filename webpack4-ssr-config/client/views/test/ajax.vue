<template>
  <div class="demo">
    <p>proxy配置(项目目录constants.js文件中): { '/api': 'http://restapi.amap.com' }</p>
    <p>接口URL: {{requestUrl}}</p>
    <a @click="sendGet" href="javascript:void(0);">API接口测试</a>
    <p>result:{{result}}</p>
  </div>
</template>
<script>
  export default {
    title: 'Ajax数据请求',
    data() {
      return {
        result: '',
        requestUrl: '/api/v3/assistant/coordinate/convert?key=ff0bcf778c5eeb93bd8b068b6e3f7781&locations=116.481499,39.990475|116.481499,39.990375'
      }
    },
    methods: {
      /**
       * 测试
       */
      sendGet() {
        this.http.get(this.requestUrl)
          .then((resp) => {
            this.result = resp
          })
          .catch(() => {
            this.error('出错了')
          })
      },
    }
  }
</script>
<style lang="stylus" scoped>
  .demo {
    padding: 20px;
    font-size 14px;
    text-align: center;
  }
</style>