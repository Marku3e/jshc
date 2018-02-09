<template>
  <div id="carlist">
    <subHeader></subHeader>
    <!---->
    <div class="filter">
      <div class="def">
        <i>默认排序</i>
        <span class='iconfont icon-down'></span>
      </div>
      <div class="brand">
        <i>品牌</i>
        <span class='iconfont icon-down'></span>
      </div>
      <div class="f-pay">
        <i>首付</i>
        <span class='iconfont icon-down'></span>
      </div>
      <div class="all">
        <i>筛选</i>
        <span class='iconfont icon-filter '></span>
      </div>
    </div>
    <div class="car_list">
      <div class="car_msg" v-for='item in newCarlist'>
        <router-link v-bind="{to:'newcar/detail/'+item.modelId}" class="carImg">
          <img :src="item.image">
        </router-link>
        <div class="car_detailed">
          <h4>{{item.fullSeriesName}}</h4>
          <p>{{item.modelName}}</p>
          <span>厂商指导价：{{item.price}}万</span>
          <i>首付{{item.firstPay}}万 月供{{item.monthRepay}}元</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import subHeader from '../subcom/header'
  export default {
    name: "newcar",
    components: {
      "subHeader": subHeader,
    },
    data() {
      return {
        newCarlist: [],
        newData: {
          isNewCar: true,
          page: 1,
          size: 5,
          orderType: 1
        }
      }
    },
    created() {
      this.getNewcar();
    },
    methods: {
      getNewcar() {
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        let that = this
        this.$axios.post(url, that.newData)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.newCarlist = that.newCarlist.concat(res.data.data.list);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
    }
  }
</script>

<style scoped lang='less'>
  @import "./carlist";
</style>
