<template>
  <div class="car_msg" v-for='item in newCarlist'>
    <div class="carImg">
      <img :src="item.image">
    </div>
    <div class="car_detailed">
      <h4>{{item.fullSeriesName}}</h4>
      <p>{{item.modelName}}</p>
      <span>厂商指导价：{{item.price}}万</span>
      <i>首付{{item.firstPay}}万 月供{{item.monthRepay}}元</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "carlist",
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
        let url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";
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

</style>
