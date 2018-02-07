<template>
  <div id="usedSearch">
    <div class="header">
      <div class="searchIpt">
        <div id="openPopover" class="dropdown" @click="open()">
          <i>二手车</i>
          <span class='iconfont icon-down'></span>
          <div class='dropdownList' v-if="show">
            <span class="jian"></span>
            <router-link :to="'/search/new'">新车</router-link>
            <div class="d-line"></div>
            <router-link :to="'/search/used'">二手车</router-link>
          </div>
        </div>
        <input type="text" placeholder='想买什么车？'>
      </div>
      <div class="cancel" @click="back()">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "usedSearch",
    data() {
      return {
        show: false,
      }
    },
    methods: {
      open() {
        this.show = !this.show;
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "search";

</style>
