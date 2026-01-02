<template>
  <div>
    <!-- 二级路由的出口   -->
    <router-view></router-view>
    <van-tabbar v-model="activePath"  active-color = "#ee0a24" inactive-color="#000" route>
      <van-tabbar-item to="/home" icon = "wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon = "apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon = "shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activePath: '/home'
    }
  },
  watch: {
    '$route.path' (newPath) {
      this.activePath = newPath
    }
  },
  methods: {
    handleTabChange (targetPath) {
      this.$router.push(targetPath)
    }
  },
  mounten () {
    this.activePath = this.$route.path
  }
}
</script>
<style scoped>

</style>
