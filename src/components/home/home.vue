<template>
  <div id="home">
    <!--通用头部-->
    <subHeader></subHeader>
    <div class="body">
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
        <mt-navbar v-model="selected">
          <mt-tab-item v-bind:id="1" ref='msg'>新车</mt-tab-item>
          <mt-tab-item v-bind:id="2">二手车</mt-tab-item>
        </mt-navbar>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
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
        </mt-loadmore>

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
        selected: 1,
        activeTab: "newcar",
        newCarlist: [],
        usedCarlist: [],
        size: 5,
        page: 1,
        orderType: 1,
        searchKey: '',
        totalpage: 0,
        allLoaded: false,
        scrollMode: "auto",
      }
    },
    created() {
      this.getNewcar();
      this.getUsedcar();
    },
    mounted() {

    },
    methods: {
      loadBottom: function () {
        // this.more();// 上拉触发的分页查询
        // this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      getNewcar() {
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        let that = this
        this.$axios.post(url + '?isNewCar=true&size=' + this.size + '&page=' + this.page + '&orderType=' + this.orderType + '')
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.newCarlist = res.data.data.list
              that.totalpage = res.data.data.totalPage;
              if (that.totalpage == 1) {
                that.allLoaded = true;
              }
              that.$nextTick(function () {
                // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                that.scrollMode = "touch";
                //this.isHaveMore();
              })
            }
          })
      },
      getUsedcar() {
        let url = this.$common.baseUrl + "/car/source/getOldCarList";
        let that = this
        this.$axios.post(url + '?isNewCar=false&size=' + this.size + '&page=' + this.page + '&orderType=' + this.orderType + '')
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
      more: function () {
        // 分页查询
        // if (this.totalpage == 1) {
        //   this.page = 1;
        //   this.allLoaded = true;
        // } else {
        //   this.page = this.page + 1;
        //   this.allLoaded = false;
        // }
        // let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        // let that = this
        // this.$axios.post(url + '?isNewCar=true&size=' + this.size + '&page=' + this.page + '&orderType=' + this.orderType + '').then(res => {
        //   that.newCarlist = that.newCarlist.concat(res.data.data.list);
        //   console.log(that.newCarlist);
        //   this.isHaveMore();
        // });
      },
      isHaveMore: function () {
        // 是否还有下一页，如果没有就禁止上拉刷新
        //this.allLoaded = false; //true是禁止上拉加载
        //
        // if (this.page == this.totalpage) {
        //   this.allLoaded = true;
        // }
      },
    }
  }
</script>

<style scoped lang='less'>

  @import "home";

</style>
