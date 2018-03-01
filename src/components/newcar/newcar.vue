<template>
  <div id="carlist" ref='carlist'>
    <subHeader></subHeader>
    <!---->
    <div class="body">
      <div class="filter">
        <div class="def" @click=openDef>
          <i>默认排序</i>
          <span class='iconfont icon-down'></span>
          <mt-popup
            position='top'
            v-model="popupVisible"
            popup-transition="popup-fade">
            <ul class='deflist' v-show=!scroll>
              <li class='active'>默认排序<span class='iconfont icon-duigou'></span></li>
              <li>首付最低<span class='iconfont icon-duigou'></span></li>
              <li>首付最高<span class='iconfont icon-duigou'></span></li>
              <li>月供最低<span class='iconfont icon-duigou'></span></li>
              <li>月供最高<span class='iconfont icon-duigou'></span></li>
              <li>车价最低<span class='iconfont icon-duigou'></span></li>
              <li>车价最高<span class='iconfont icon-duigou'></span></li>
            </ul>
          </mt-popup>
          <!--<ul class='deflist' v-show=!scroll>-->
          <!--<li class='active'>默认排序<span class='iconfont icon-duigou'></span></li>-->
          <!--<li>首付最低<span class='iconfont icon-duigou'></span></li>-->
          <!--<li>首付最高<span class='iconfont icon-duigou'></span></li>-->
          <!--<li>月供最低<span class='iconfont icon-duigou'></span></li>-->
          <!--<li>月供最高<span class='iconfont icon-duigou'></span></li>-->
          <!--<li>车价最低<span class='iconfont icon-duigou'></span></li>-->
          <!--<li>车价最高<span class='iconfont icon-duigou'></span></li>-->
          <!--</ul>-->
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
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                  @bottom-status-change='handleBottomChange'>
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
      </v-loadmore>

      <!--<div class="layout" v-show=!scroll @click='scroll=true'></div>-->
    </div>
  </div>
</template>

<script>
  import subHeader from '../subcom/header'
  import {Loadmore} from 'mint-ui';

  export default {
    name: "newcar",
    components: {
      "subHeader": subHeader,
      'v-loadmore': Loadmore,
    },
    data() {
      return {
        popupVisible: false,
        scroll: true,
        newCarlist: [],
        carInfo: {
          isNewCar: null,
          size: null,
          page: null,
          orderType: null,
        },
        allLoaded: false,
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        totalpage: 0,
        value: 1,
        autoFill: false,
        bottomAllLoaded: false,
      }
    },
    watch: {
      '$route.query': function () {
        location.reload()
      }
    },
    mounted() {

    },
    created() {
      //console.log(this.$route.query);
      this.carInfo = this.$route.query;
      console.log(this.carInfo);
      this.getNewcar();
    },
    methods: {
      handleBottomChange() {
        this.bottomAllLoaded = false
        // this.$refs.loadmore.onBottomLoaded();
      },
      loadBottom() {
        // 上拉加载
        this.more();// 上拉触发的分页查询
        // this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        this.$refs.loadmore.onBottomLoaded();

      },
      getNewcar() {
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        let that = this
        // let param = url + '?isNewCar=' + this.carInfo.isNewCar + '&size=' + this.carInfo.size + '&page=' + this.carInfo.page + '&orderType=' + this.carInfo.orderType
        // let param = this.carInfo
        let param = new URLSearchParams();
        param.append("isNewCar", this.carInfo.isNewCar);
        param.append("size", this.carInfo.size);
        param.append("page", this.carInfo.page);
        param.append("orderType", this.carInfo.orderType);
        param.append("provId", this.carInfo.provId);
        console.log(param);
        this.$axios.post(url, param)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.newCarlist = res.data.data.list;
              that.totalpage = res.data.data.totalPage;
              // if (that.totalpage == 1) {
              //   that.allLoaded = true;
              // }
              that.$nextTick(function () {
                // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                that.scrollMode = "touch";
                // this.isHaveMore();
              });
            }
          })
      },
      more: function () {
        // 分页查询
        // if (this.totalpage == 1) {
        //   this.page = 1;
        //   this.allLoaded = true;
        // } else {
        this.carInfo.page = this.carInfo.page - 0 + 1;
        console.log(this.carInfo.page);
        this.allLoaded = false;
        // }
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        let that = this
        let param = url + '?isNewCar=' + this.carInfo.isNewCar + '&size=' + this.carInfo.size + '&page=' + this.carInfo.page + '&orderType=' + this.carInfo.orderType

        this.$axios.post(url, param).then(res => {
          that.newCarlist = that.newCarlist.concat(res.data.data.list);
          console.log(that.newCarlist);
          // this.isHaveMore();
        });
      },
      // isHaveMore: function () {
      //   // 是否还有下一页，如果没有就禁止上拉刷新
      //   //this.allLoaded = false; //true是禁止上拉加载
      //
      //   if (this.page == this.totalpage) {
      //     this.allLoaded = true;
      //   }
      //},
      openDef() {

      },

    }
  }
</script>

<style scoped lang='less'>
  @import "./carlist";
</style>
