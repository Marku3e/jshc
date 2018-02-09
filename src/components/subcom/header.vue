<template>
    <div class="header">
      <div class="city">
        <i>武汉</i>
        <span class='iconfont icon-down1'></span>
      </div>
      <router-link class="search" :to="'search/new'">
        <span class='iconfont icon-search '></span>
        <i>想买什么车？</i>
      </router-link>
      <div class="option">
        <span label="undocked drawer" @click="toggle(true)" class='iconfont icon-bars'></span>
        <mu-drawer right :open="open" :docked="docked" @close="toggle()">
          <ul @itemClick="docked ? '' : toggle()">
            <li>
              <router-link :to="'/home'">首页</router-link>
            </li>
            <li>
              <router-link :to="'/newcar'">买新车</router-link>
            </li>
            <li>
              <router-link :to="'/usedcar'">买二手车</router-link>
            </li>
            <div class="bb"></div>
            <li>
              <router-link :to="'/demo'">优惠车型</router-link>
            </li>
            <li>
              <router-link :to="'/appointment'">我要提车</router-link>
            </li>
            <li>
              <router-link :to="'/aboutus'">关于九盛好车</router-link>
            </li>
            <div class="bb"></div>
          </ul>
        </mu-drawer>
      </div>
    </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        open: false,
        docked: true
      }
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "header";

</style>
