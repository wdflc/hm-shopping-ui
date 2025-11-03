<template>
  <div>
    <!-- 二级路由的出口   -->
    <router-view></router-view>
    <van-tabbar active-color = "#ee0a24" inactive-color="#000">
      <van-tabbar-item icon = "wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon = "apps-o">分类页</van-tabbar-item>
      <van-tabbar-item icon = "shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped>

</style>
