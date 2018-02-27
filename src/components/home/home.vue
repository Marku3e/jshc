<template>
  <div id="home">
    <!--通用头部-->
    <subHeader></subHeader>
    <div class="filter">
      <ul class="filter_list">
        <li @click="">5万以下</li>
        <li @click="">5-10万</li>
        <li @click="">10-20万</li>
        <li @click="">20万以上</li>
        <li @click="payOne()">首付1万</li>
        <li @click="low()">超低月供</li>
        <li @click='keyFilter("起亚")'>起亚</li>
        <li @click='keyFilter("雪佛兰")'>雪佛兰</li>
        <li @click='keyFilter("日产")'>日产</li>
        <li @click='keyFilter("福特")'>福特</li>
        <li @click='keyFilter("大众")'>大众</li>
        <li @click='keyFilter("别克")'>别克</li>
      </ul>
    </div>
    <div class="b-line"></div>
    <div class="car_list">
      <mt-navbar v-model="selected">
        <mt-tab-item v-bind:id="1" ref='msg'>新车</mt-tab-item>
        <mt-tab-item v-bind:id="2">二手车</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-bind:id="1">
          <div class='newcarMsg' v-for='(item,index) in newCarlist'>
            <router-link v-bind="{to:'/newcar/detail/'+item.modelId}" class="car_msg">
              <div class="carImg">
                <img :src="item.image">
              </div>
              <div class="car_detailed">
                <h4>{{item.fullSeriesName}}</h4>
                <p>{{item.modelName}}</p>
                <span>厂商指导价：{{item.price}}万</span>
                <i>首付{{item.firstPay}}万 月供{{item.monthRepay}}元</i>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item v-bind:id="2">
          <div class='usedcarMsg' v-for='(item,index) in usedCarlist'>
            <router-link v-bind="{to:'/usedcar/detail/'+item.modelId}" class="car_msg">
              <div class="carImg">
                <img :src="item.image">
              </div>
              <div class="car_detailed">
                <h4>{{item.fullSeriesName}}</h4>
                <p>{{item.modelName}}</p>
                <span>厂商指导价：{{item.price}}万</span>
                <i>首付{{item.firstPay}}万 月供{{item.monthRepay}}元</i>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>

  import subHeader from '../subcom/header'

  export default {
    name: "home",
    components: {
      "subHeader": subHeader

    },
    data() {
      return {
        selected: 1,
        noData: '',
        activeTab: "newcar",
        newCarlist: [],
        usedCarlist: [],
        usedData: {
          size: 5,
          page: 1,
          orderType: 1,
          isNewCar: false
        },
        newData: {
          size: 5,
          page: 1,
          orderType: 1,
          isNewCar: true,
        },
      }
    },
    created() {
      this.getNewcar();
      this.getUsedcar();
      this.$watch("usedData", function () {
        console.log(this.usedData);
      }, {deep: true})
    },
    mounted() {
      this.scroller = this.$el
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val
      },
      getNewcar() {
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        let that = this
        this.$axios.post(url, that.newData)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.newCarlist = res.data.data.list
            }
          })
          .catch(function (err) {
            console.log(err);
          });

      },
      getUsedcar() {
        let url = this.$common.baseUrl + "/car/source/getOldCarList";
        let that = this
        this.$axios.post(url, that.usedData)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.usedCarlist = res.data.data.list
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      keyFilter(str) {
        const that = this;
        that.newData.searchKey = str;
        that.usedData.searchKey = str;
        console.log(that.usedData + "---" + that.newData);
        that.getNewcar();
        that.getUsedcar();
      },
      low() {
        this.newData.orderType = 3;
      },
      payOne() {

      },

    }

  }
</script>

<style scoped lang='less'>

  @import "home";

</style>
