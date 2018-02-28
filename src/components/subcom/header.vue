<template>
  <div class="header">
    <div class="city" @click="openCity()">
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
        <ul @itemClick="docked ? '' : toggle()" class='menu'>
          <li>
            <router-link :to="'/'">首页</router-link>
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
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">

        <div class="c-header">
          <span class="iconfont icon-back"></span>
          选择地区
        </div>
        <div class="c-body">
          <mt-index-list>
            <mt-index-section index="A">
              <mt-cell title="Aaron"></mt-cell>
              <mt-cell title="Alden"></mt-cell>
              <mt-cell title="Austin"></mt-cell>
            </mt-index-section>
            <mt-index-section index="B">
              <mt-cell title="Baldwin"></mt-cell>
              <mt-cell title="Braden"></mt-cell>
            </mt-index-section>
            ...
            <mt-index-section index="Z">
              <mt-cell title="Zack"></mt-cell>
              <mt-cell title="Zane"></mt-cell>
            </mt-index-section>
          </mt-index-list>
        </div>

      </mt-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        popupVisible: false,
        open: false,
        docked: true
      }
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      },
      openCity() {
        this.popupVisible = !this.popupVisible
        let url = this.$common.baseUrl + '/car/source/getAreaList'
        this.$axios.post(url)
          .then(res => {
            console.log(res);
          })
      },
    }
  }
</script>

<style scoped lang='less'>
  @import "header";

</style>
