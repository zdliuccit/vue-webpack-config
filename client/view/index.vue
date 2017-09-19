<template>
  <div class="test">
    <div class="cc_test" @click="sendGet">demo{{ss}}</div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        ss: 333,
        testUrl: '/v3/assistant/coordinate/convert?key=ff0bcf778c5eeb93bd8b068b6e3f7781&locations=116.481499,39.990475|116.481499,39.990375&output=JSON'
      }
    },
    methods: {
      sendGet() {
        this.http.get('/v3/assistant/coordinate/convert?key=ff0bcf778c5eeb93bd8b068b6e3f7781&locations=116.481499,39.990475|116.481499,39.990375&output=JSON')
          .then((resp) => {
            console.log(resp)
          })
          .catch(() => {
            console.log('error............')
          })
      },
    },
  }
</script>
<style lang="stylus" ref="stylesheet/stylus" scoped>
  .test {
    width: 680px;
    padding-bottom: 10px;
    display: flex
  }
</style>
<style lang="stylus" ref="stylesheet/stylus">
  .test {
    font-size: 50px;
    color: red;
  }
</style>
