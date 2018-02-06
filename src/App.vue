<template>
  <div id="app">
    <router-view></router-view>
    <router-link :to="'newcar'">新车</router-link>
    <router-link :to="'usedcar'">二手车</router-link>
    <router-link :to="'home'">首页</router-link>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>

</style>
