<template>
  <div>
    <div title="基础信息">
      <div>
        <div slot="label">活动名称</div>
        <div slot="content">{{coupon.name}}</div>
      </div>
      <div>
        <div slot="label">活动时间</div>
        <div slot="content">{{coupon.startDate}} - {{coupon.endDate}}</div>
      </div>
    </div>
    <div title="用户信息" class="ml-last-area">
      <div>
        <div slot="label">活动名称</div>
        <div slot="content">{{coupon.name}}</div>
      </div>
      <div>
        <div slot="label">活动时间</div>
        <div slot="content">{{coupon.startDate}} - {{coupon.endDate}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        coupon: {}
      }
    },
    methods: {}
  }
</script>