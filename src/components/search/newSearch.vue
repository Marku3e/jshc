<template>
  <div id="newSearch">
    <div class="header">
      <div class="searchIpt">
        <div id="openPopover" class="dropdown" @click="open()">
          <i>新车</i>
          <span class='iconfont icon-down'></span>
          <div class='dropdownList' v-if="show">
            <span class="jian"></span>
            <router-link :to="'/search/new'">新车</router-link>
            <div class="d-line"></div>
            <router-link :to="'/search/used'">二手车</router-link>
          </div>
        </div>
        <input type="search" placeholder='想买什么车？' @keyup="search($event)" v-model='searchKey'>
      </div>
      <div class="cancel" @click="back()">取消</div>
    </div>
    <div class="hot">
      <h3>热门搜索</h3>
      <div class="hotList">
        <div v-for="item in hotBrand" @click="hotbrand(item.car_brand_id)">{{item.brand_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "newSearch",
    data() {
      return {
        searchKey: '',
        show: false,
        hotBrand: [],
      }
    },
    created() {
      this.getHotBrand()
    },
    methods: {
      open() {
        this.show = !this.show;
      },
      back() {
        this.$router.push('/home')
      },

      getHotBrand: function () {
        var that = this;
        var url = this.$common.baseUrl + '/car/basic/getHotBrand';
        this.$axios.post(url).then(function(res) {
          that.hotBrand = res.data.data
          console.log(that.hotBrand);
        })
      },
      search: function (e) {
        if (e.keyCode == 13) {
          this.$router.push({
            path: '/newcar',
            query: {
              "isNewCar": true,
              "size": '10',
              "page": '1',
              "searchKey": this.searchKey,
              "orderType": '1',
            }
          })
          console.log(this.searchKey);
        }
      },
      hotbrand: function (id) {
        this.$router.push({
          path: '/newcar',
          query: {
            "isNewCar": true,
            "size": '10',
            "page": '1',
            "carBrandId": id,
            "orderType": '1',
          }
        })
        console.log(id);
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "search";

</style>
