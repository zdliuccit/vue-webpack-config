<template>
  <div class="test" style="border-color: aliceblue">
    <div class="cc_test" @click="sendGet">测试是试77711ss22227试{{ss}}</div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        ss: 2222
      }
    },
    created () {
    },
    methods: {
      sendGet() {
        console.log(11)
        this.$http.get('/api/goods/account/config')
          .then((resp) => {
            console.log(resp)
          })
          .catch(() => {
            console.log('error............')
          })
        console.log(2)
      },
    }
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
