<template>
  <div class="test">
    <div class="cc_test" @click="sendGet">demo{{ss}}</div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        ss: 11112222222
      }
    },
    created () {
    },
    methods: {
      sendGet() {
        this.http.post('/member/api/goods/account/config', { ss: 11 })
          .then((resp) => {
            console.log(resp)
          })
          .catch(() => {
            console.log('error............')
          })
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
