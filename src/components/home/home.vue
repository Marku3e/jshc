<template>
  <div id="home">
    <!--通用头部-->
    <subHeader></subHeader>
    <div class="filter">
      <ul class="filter_list">
        <li>5万以下</li>
        <li>5-10万</li>
        <li>10-20万</li>
        <li>20万以上</li>
        <li>首付1万</li>
        <li>超低月供</li>
        <li>起亚</li>
        <li>雪佛兰</li>
        <li>日产</li>
        <li>福特</li>
        <li>大众</li>
        <li>别克</li>
      </ul>
    </div>
    <div class="b-line"></div>
    <div class="car_list">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="newcar" title="新车"/>
        <mu-tab value="usedcar" title="二手车"/>
      </mu-tabs>
      <div v-if="activeTab === 'newcar'" class='newcarMsg' v-for='(item,index) in newCarlist'>
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
      <div v-if="activeTab === 'usedcar'" class='usedcarMsg' v-for='(item,index) in usedCarlist'>
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
        noData: '',
        activeTab: "newcar",
        newCarlist: [],
        usedCarlist: [],
        usedData: {
          size: 5,
          page: 4,
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
              that.newCarlist = that.newCarlist.concat(res.data.data.list);
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
              that.usedCarlist = that.usedCarlist.concat(res.data.data.list);
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

  @import "home";

</style>
