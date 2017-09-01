<template>
  <div v-show="loading">
    <!--新布局-->
    <xel-structure
      :nav-items="navItems"
      :sidebar-items="sidebarItems"
      :badgeNumber="badgeNumber"
      :notification-active-path="['/notice-center']"
      :person-active-path="['/personal-center/my-wallet', '/personal-center/setting-account']"
      :default-nav-index="defaultNavIndex"
      :default-sidebar-index="defaultSidebarIndex"
      v-if="!isOld"
      :isExist="isExist"
      @select-person="person"
      @select-logout="logout"
      @select-notification="notify"
      @nav-select="changeNavItems"
      @sidebar-select="changeSidebarItems"
    >
      <div class="center" ref="center">
        <xel-breadcrumb class="breadcrumb"></xel-breadcrumb>
        <div class="padding" v-fix-vertical-touch-scrolling="'.center'" >
          <router-view></router-view>
        </div>
      </div>
    </xel-structure>
    <!--老布局-->
    <div class="old-layout" v-if="isOld">
      <xel-old-top-bar></xel-old-top-bar>
      <div class="wrapper">
        <xel-old-menu :on-menu-click="onMenuClick"></xel-old-menu>
        <div class="main-content">
          <xel-breadcrumb class="breadcrumb"></xel-breadcrumb>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import NotificationMixin from '@xkeshi/x-element-ui-biz/mixins/structure-mixin.js'

  export default {
    mixins: [NotificationMixin],
    props: {
      onMenuClick: {
        type: Function,
        default: () => {
        },
      },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route(val) {
        this.init(val)
      },
    },
    data() {
      return {
        isShow: true,
        isOld: !!this.$route.query.isOld,
        loading: false,
        isFrist: false,
      }
    },
    created() {
      document.body.addEventListener('touchstart', () => {
      })
      this.init(this.$route)
    },
    methods: {
      /**
       * 初始化方法，判断新老模式，生成对应高亮
       * @param {object} val 路由对象
       */
      init(val) {
        // (this.$root.$children[0].$refs.center || global.document.body).scrollTop = 0
        (this.$root.$children[0].$root.$children[0].$children[0].$refs.center
        || global.document.body).scrollTop = 0
        const {
          meta: {
            sidebarActiveIndex,
            navActiveIndex,
          },
        } = val
        this.getOld()
        this.changeSidebarItems({
          index: sidebarActiveIndex,
        }, false)
        this.changeNavItems({
          index: navActiveIndex,
          customObj: {},
        }, false)
      },
      /**
       * 路由变化时获取参数
       * 路由指定为老版本时，做标记，指定为新版本时，去除标记
       */
      getOld() {
        if (this.$route.query.isNew) {
          this.clear()
          global.sessionStorage.removeItem('layoutOld')
          this.isOld = false
          global.location.href = `${global.location.origin}/common/work-bench/index?isNew=true`
        } else {
          const isOld = global.sessionStorage.getItem('layoutOld') || (!!this.$route.query.isOld)
          if (isOld) {
            global.sessionStorage.setItem('layoutOld', isOld)
          }
          this.isOld = isOld
          this.loading = true
        }
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .center {
    overflow: auto
    width: 100%
    background: #f8fafb
    .padding {
      padding: 20px
    }
  }

  .breadcrumb {
    border-bottom: 1px solid #dfe4e7
    background: #fff
  }

  .main-content .breadcrumb {
    margin-bottom: 10px;
  }

  /*老布局*/
  .wrapper {
    width: 100%
  }

  .main-content {
    margin-left: 310px
    min-height: 400px
    padding-bottom: 40px;
    position: relative;
  }

  @media (max-width: 1024px) {
    .main-content {
      margin-left: 240px
    }

    .wrapper {
      padding: 0 37px
    }
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    .main-content {
      margin-left: 257px
    }

    .wrapper {
      padding: 0 8px
    }
  }

  @media (min-width: 1440px) and (max-width: 1920px) {
    .main-content {
      margin-left: 335px
    }

    .wrapper {
      padding: 0 50px
    }
  }
</style>
