<template>
  <div id="home">
    <!--通用头部-->
    <subHeader></subHeader>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) in bannerImgs"><img :src="item.image" alt=""></mt-swipe-item>
    </mt-swipe>
    <div class="b-line"></div>
    <div class="body">
      <div class="filter">
        <ul class="filter_list">
          <li :class='pflag == 1?"color":""' @click=pClick(null,5,1)>5万以下</li>
          <li :class='pflag == 2?"color":""' @click=pClick(5,10,2)>5-10万</li>
          <li :class='pflag == 3?"color":""' @click=pClick(10,20,3)>10-20万</li>
          <li :class='pflag == 4?"color":""' @click=pClick(20,null,4)>20万以上</li>
          <li :class='oflag == 1?"color":""' @click=oClick(1)>首付1万</li>
          <li :class='mflag == 1?"color":""' @click=mClick(1)>超低月供</li>

          <!--<li :class='bflag == 2499972752082944?"color":""' @click=fBrand(2499972752082944)><img-->
          <!--src="../../assets/images/qiya@3x.png" alt="">起亚-->
          <!--</li>-->
          <!--<li :class='bflag == 2499972753688576?"color":""' @click=fBrand(2499972753688576)><img-->
          <!--src="../../assets/images/xue@3x.png"-->
          <!--alt="" class='nomargin'>雪佛兰-->
          <!--</li>-->
          <!--<li :class='bflag == 2499972752148480?"color":""' @click=fBrand(2499972752148480)><img-->
          <!--src="../../assets/images/nissan@3x.png" alt="">日产-->
          <!--</li>-->
          <!--<li :class='bflag == 2499972747724800?"color":""' @click=fBrand(2499972747724800)><img-->
          <!--src="../../assets/images/ford@3x.png" alt="">福特-->
          <!--</li>-->
          <!--<li :class='bflag == 2499972747413504?"color":""' @click=fBrand(2499972747413504)><img-->
          <!--src="../../assets/images/dazhong@3x.png" alt="">大众-->
          <!--</li>-->
          <!--<li :class='bflag == 2499972745119744?"color":""' @click=fBrand(2499972745119744)><img-->
          <!--src="../../assets/images/bieke@3x.png" alt="">别克-->
          <!--</li>-->


          <li :class='bflag == 2518477397608448?"color":""' @click=fBrand(2518477397608448)><img
            src="../../assets/images/qiya@3x.png" alt="">起亚
          </li>
          <li :class='bflag == 2518477398738944?"color":""' @click=fBrand(2518477398738944)><img
            src="../../assets/images/xue@3x.png"
            alt="" class='nomargin'>雪佛兰
          </li>
          <li :class='bflag == 2518477397641216?"color":""' @click=fBrand(2518477397641216)><img
            src="../../assets/images/nissan@3x.png" alt="">日产
          </li>
          <li :class='bflag == 2518477394036736?"color":""' @click=fBrand(2518477394036736)><img
            src="../../assets/images/ford@3x.png" alt="">福特
          </li>
          <li :class='bflag == 2518477393823744?"color":""' @click=fBrand(2518477393823744)><img
            src="../../assets/images/dazhong@3x.png" alt="">大众
          </li>
          <li :class='bflag == 2518477391775744?"color":""' @click=fBrand(2518477391775744)><img
            src="../../assets/images/bieke@3x.png" alt="">别克
          </li>


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
                <router-link v-bind="{to:'/newcar/detail/'+item.modelId+'&'+item.carSourceId+'&'+item.isPreferential}"
                             class="car_msg" :key="index">
                  <div class="carImg">
                    <img :src="item.image">
                    <span class='yhImg' v-if='item.isPreferential==1'></span>
                  </div>
                  <div class="car_detailed">
                    <h4>{{item.fullSeriesName}}</h4>
                    <p>{{item.modelName}}</p>
                    <span>厂商指导价：{{item.price}}万</span>
                    <i>首付{{item.firstPay}}万 月供{{item.monthRepay}}元</i>
                  </div>
                </router-link>
              </div>
              <div v-show='newCarlist.length === 0' class="noInfo">
                <img src="../../assets/images/info.png" alt="">
                暂无数据
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item v-bind:id="2">
              <div class='usedcarMsg' v-for='(item,index) in usedCarlist'>
                <router-link v-bind="{to:'/usedcar/detail/'+item.modelId+'&'+item.carSourceId+'&'+item.isPreferential}"
                             class="car_msg" :key="index">
                  <div class="carImg">
                    <img :src="item.image">
                    <span class='yhImg' v-if='item.isPreferential==1'></span>
                  </div>
                  <div class="car_detailed">
                    <h4>{{item.fullSeriesName}}</h4>
                    <p>{{item.modelName}}</p>
                    <span>{{item.cityName}} | {{item.updateTime|datefmt('YYYY年MM月')}} | {{item.mile?item.mile+'万公里':"暂无数据"}}</span>
                    <i>首付{{item.firstPay}}万 月供{{item.monthRepay}}元</i>
                  </div>
                </router-link>
              </div>
              <div v-show='usedCarlist.length === 0' class="noInfo">
                <img src="../../assets/images/info.png" alt="">
                暂无数据
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
        bannerImgs: [],
        isPreferential: null,
        selected: 1,
        activeTab: "newcar",
        newCarlist: [],
        usedCarlist: [],
        newcarInfo: {
          isNewCar: true,
          size: "10",
          page: "1",
          cityId: '',
          orderType: "1",
          minPrice: null,
          maxPrice: null,
          minFirstPay: null,
          maxFirstPay: null,
          minRepay: null,
          maxRepay: null,
          carBrandId: null,
        },
        usedcarInfo: {
          isNewCar: false,
          size: "10",
          page: "1",
          cityId: '',
          orderType: "1",
          minPrice: null,
          maxPrice: null,
          minFirstPay: null,
          maxFirstPay: null,
          minRepay: null,
          maxRepay: null,
          carBrandId: null,
        },
        totalpage: 0,
        allLoaded: false,
        scrollMode: "auto",
        pflag: null,
        oflag: null,
        bflag: null,
        mflag: null,
      }
    },
    created() {
      if (!localStorage.getItem("city")) {
        var cityinfo = {cityname: '武汉', id: 18}
        var city = JSON.stringify(cityinfo);
        localStorage.setItem('city', city)
      }
      var cid = JSON.parse(localStorage.getItem("city")).id
      if (cid) {
        this.usedcarInfo.cityId = cid
        this.newcarInfo.cityId = cid
      } else {
        if (JSON.parse(localStorage.getItem("city")).cityname == '全国') {
          this.usedcarInfo.cityId = cid
          this.newcarInfo.cityId = cid
        } else {
          this.usedcarInfo.cityId = 18
          this.newcarInfo.cityId = 18
        }
      }

      this.getNewcar();
      this.getUsedcar();
      this.getBannerImg();
    },
    mounted() {
    },
    methods: {
      oClick: function (str) {
        if (this.oflag == str) {
          this.oflag = null;
          this.newcarInfo.maxFirstPay = null;
          this.usedcarInfo.maxFirstPay = null;
        } else {
          this.newcarInfo.maxFirstPay = 1;
          this.usedcarInfo.maxFirstPay = 1;
          this.oflag = str;
        }
        this.newcarInfo.orderType = 3
        this.usedcarInfo.orderType = 3
        this.getNewcar();
        this.getUsedcar();
      },
      mClick(str) {
        if (this.mflag == str) {
          this.mflag = null;
          this.newcarInfo.orderType = null
          this.usedcarInfo.orderType = null
        } else {
          this.newcarInfo.orderType = 3
          this.usedcarInfo.orderType = 3
          this.mflag = str;
        }
        this.newcarInfo.orderType = 3
        this.usedcarInfo.orderType = 3
        this.getNewcar();
        this.getUsedcar();
      },
      pClick: function (min, max, id) {
        if (this.pflag == id) {
          this.pflag = null;
          this.newcarInfo.minPrice = null;
          this.usedcarInfo.minPrice = null;
          this.newcarInfo.maxPrice = null;
          this.usedcarInfo.maxPrice = null;
        } else {
          this.pflag = id;
          this.newcarInfo.minPrice = min;
          this.usedcarInfo.minPrice = min;
          this.newcarInfo.maxPrice = max;
          this.usedcarInfo.maxPrice = max;
        }
        this.getNewcar();
        this.getUsedcar();

      },
      fBrand: function (id) {
        if (this.bflag == id) {
          this.bflag = null;
          this.newcarInfo.carBrandId = null;
          this.usedcarInfo.carBrandId = null;
        } else {
          this.newcarInfo.carBrandId = id;
          this.usedcarInfo.carBrandId = id;
          this.bflag = id
        }
        this.getNewcar();
        this.getUsedcar();
      },
      loadBottom: function () {
        if (this.totalpage == 1) {
          this.newcarInfo.page = 1;
          this.usedcarInfo.page = 1;
          this.allLoaded = true;
        } else {
          this.usedcarInfo.page = this.usedcarInfo.page - 0 + 1;
          this.newcarInfo.page = this.newcarInfo.page - 0 + 1;
          this.allLoaded = false;
        }
        var burl = this.$common.baseUrl + "/car/source/wx/getOldCarList"
        // var bqs = require('qs');
        // var bdata = {}
        // bdata.isNewCar = this.usedcarInfo.isNewCar
        // bdata.size = this.usedcarInfo.size
        // bdata.page = this.usedcarInfo.page
        // bdata.orderType = this.usedcarInfo.orderType
        // this.usedcarInfo.cityId ? bdata.cityId = this.usedcarInfo.cityId : '';
        // this.usedcarInfo.minPrice ? bdata.minPrice = this.usedcarInfo.minPrice : '';
        // this.usedcarInfo.maxPrice ? bdata.maxPrice = this.usedcarInfo.maxPrice : '';
        // this.usedcarInfo.minFirstPay ? bdata.minFirstPay = this.usedcarInfo.minFirstPay : '';
        // this.usedcarInfo.maxFirstPay ? bdata.maxFirstPay = this.usedcarInfo.maxFirstPay : '';
        // this.usedcarInfo.minRepay ? bdata.minRepay = this.usedcarInfo.minRepay : '';
        // this.usedcarInfo.maxRepay ? bdata.maxRepay = this.usedcarInfo.maxRepay : '';
        // this.usedcarInfo.searchKey ? bdata.searchKey = this.usedcarInfo.searchKey : '';
        // this.usedcarInfo.carBrandId ? bdata.carBrandId = this.usedcarInfo.carBrandId : '';
        // var bparam = bqs.stringify(bdata);
        var bparam = new URLSearchParams();
        bparam.append("isNewCar", this.usedcarInfo.isNewCar);
        bparam.append("size", this.usedcarInfo.size);
        bparam.append("page", this.usedcarInfo.page);
        bparam.append("orderType", this.usedcarInfo.orderType);
        this.usedcarInfo.searchKey ? bparam.append("searchKey", this.usedcarInfo.searchKey) : '';
        this.usedcarInfo.cityId ? bparam.append("cityId", this.usedcarInfo.cityId) : '';
        this.usedcarInfo.minPrice ? bparam.append("minPrice", this.usedcarInfo.minPrice) : '';
        this.usedcarInfo.maxPrice ? bparam.append("maxPrice", this.usedcarInfo.maxPrice) : '';
        this.usedcarInfo.minFirstPay ? bparam.append("minFirstPay", this.usedcarInfo.minFirstPay) : '';
        this.usedcarInfo.maxFirstPay ? bparam.append("maxFirstPay", this.usedcarInfo.maxFirstPay) : '';
        this.usedcarInfo.minRepay ? bparam.append("minRepay", this.usedcarInfo.minRepay) : '';
        this.usedcarInfo.maxRepay ? bparam.append("maxRepay", this.usedcarInfo.maxRepay) : '';
        this.usedcarInfo.carBrandId ? bparam.append("carBrandId", this.usedcarInfo.carBrandId) : '';
        var that = this
        console.log(bparam);
        this.$axios.post(burl, bparam)
          .then(function (res) {
            if (res.status == 200) {
              that.totalpage = res.data.data.totalpage
              that.usedCarlist = that.usedCarlist.concat(res.data.data.list);
            }
            that.isHaveMore();
          }).catch(function (error) {
          console.log(error);
        });
        var url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";

        // var qs = require('qs');
        // var data = {}
        // data.isNewCar = this.newcarInfo.isNewCar
        // data.size = this.newcarInfo.size
        // data.page = this.newcarInfo.page
        // data.orderType = this.newcarInfo.orderType
        // this.newcarInfo.cityId ? data.cityId = this.newcarInfo.cityId : '';
        // this.newcarInfo.minPrice ? data.minPrice = this.newcarInfo.minPrice : '';
        // this.newcarInfo.maxPrice ? data.maxPrice = this.newcarInfo.maxPrice : '';
        // this.newcarInfo.minFirstPay ? data.minFirstPay = this.newcarInfo.minFirstPay : '';
        // this.newcarInfo.maxFirstPay ? data.maxFirstPay = this.newcarInfo.maxFirstPay : '';
        // this.newcarInfo.minRepay ? data.minRepay = this.newcarInfo.minRepay : '';
        // this.newcarInfo.maxRepay ? data.maxRepay = this.newcarInfo.maxRepay : '';
        // this.newcarInfo.searchKey ? data.searchKey = this.newcarInfo.searchKey : '';
        // this.newcarInfo.carBrandId ? data.carBrandId = this.newcarInfo.carBrandId : '';
        // var param = qs.stringify(data);

        var param = new URLSearchParams();
        param.append("isNewCar", this.newcarInfo.isNewCar);
        param.append("size", this.newcarInfo.size);
        param.append("page", this.newcarInfo.page);
        param.append("orderType", this.newcarInfo.orderType);
        this.newcarInfo.searchKey ? param.append("searchKey", this.newcarInfo.searchKey) : '';
        this.newcarInfo.cityId ? param.append("cityId", this.newcarInfo.cityId) : '';
        this.newcarInfo.minPrice ? param.append("minPrice", this.newcarInfo.minPrice) : '';
        this.newcarInfo.maxPrice ? param.append("maxPrice", this.newcarInfo.maxPrice) : '';
        this.newcarInfo.minFirstPay ? param.append("minFirstPay", this.newcarInfo.minFirstPay) : '';
        this.newcarInfo.maxFirstPay ? param.append("maxFirstPay", this.newcarInfo.maxFirstPay) : '';
        this.newcarInfo.minRepay ? param.append("minRepay", this.newcarInfo.minRepay) : '';
        this.newcarInfo.maxRepay ? param.append("maxRepay", this.newcarInfo.maxRepay) : '';
        this.newcarInfo.carBrandId ? param.append("carBrandId", this.newcarInfo.carBrandId) : '';
        var that = this
        this.$axios.post(url, param)
          .then(function (res) {
            console.log(res);
            that.totalpage = res.data.data.totalpage
            that.newCarlist = that.newCarlist.concat(res.data.data.list);
            that.isHaveMore();
          }).catch(function (error) {
          console.log(error);
        });


        this.$refs.loadmore.onBottomLoaded();

      },
      getNewcar() {
        // var url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";
        var url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";
        // console.log(this.newcarInfo);
        // var qs = require('qs');
        // var data = {}
        // data.isNewCar = this.newcarInfo.isNewCar
        // data.size = this.newcarInfo.size
        // data.page = this.newcarInfo.page
        // data.orderType = this.newcarInfo.orderType
        // this.newcarInfo.cityId ? data.cityId = this.newcarInfo.cityId : '';
        // this.newcarInfo.minPrice ? data.minPrice = this.newcarInfo.minPrice : '';
        // this.newcarInfo.maxPrice ? data.maxPrice = this.newcarInfo.maxPrice : '';
        // this.newcarInfo.minFirstPay ? data.minFirstPay = this.newcarInfo.minFirstPay : '';
        // this.newcarInfo.maxFirstPay ? data.maxFirstPay = this.newcarInfo.maxFirstPay : '';
        // this.newcarInfo.minRepay ? data.minRepay = this.newcarInfo.minRepay : '';
        // this.newcarInfo.maxRepay ? data.maxRepay = this.newcarInfo.maxRepay : '';
        // this.newcarInfo.searchKey ? data.searchKey = this.newcarInfo.searchKey : '';
        // this.newcarInfo.carBrandId ? data.carBrandId = this.newcarInfo.carBrandId : '';
        // var param = qs.stringify(data);
        var param = new URLSearchParams();
        param.append("isNewCar", this.newcarInfo.isNewCar);
        param.append("size", this.newcarInfo.size);
        param.append("page", this.newcarInfo.page);
        param.append("orderType", this.newcarInfo.orderType);
        this.newcarInfo.searchKey ? param.append("searchKey", this.newcarInfo.searchKey) : '';
        this.newcarInfo.cityId ? param.append("cityId", this.newcarInfo.cityId) : '';
        this.newcarInfo.minPrice ? param.append("minPrice", this.newcarInfo.minPrice) : '';
        this.newcarInfo.maxPrice ? param.append("maxPrice", this.newcarInfo.maxPrice) : '';
        this.newcarInfo.minFirstPay ? param.append("minFirstPay", this.newcarInfo.minFirstPay) : '';
        this.newcarInfo.maxFirstPay ? param.append("maxFirstPay", this.newcarInfo.maxFirstPay) : '';
        this.newcarInfo.minRepay ? param.append("minRepay", this.newcarInfo.minRepay) : '';
        this.newcarInfo.maxRepay ? param.append("maxRepay", this.newcarInfo.maxRepay) : '';
        this.newcarInfo.carBrandId ? param.append("carBrandId", this.newcarInfo.carBrandId) : '';
        // console.log(param);
        var that = this
        this.$axios.post(url, param)
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
                this.isHaveMore();
              })
            }

          }).catch(function (error) {
          console.log(error);
        });
      },
      getUsedcar() {
        var url = this.$common.baseUrl + "/car/source/wx/getOldCarList";
        var that = this
        // var qs = require('qs');
        // var data = {}
        // data.isNewCar = this.usedcarInfo.isNewCar
        // data.size = this.usedcarInfo.size
        // data.page = this.usedcarInfo.page
        // data.orderType = this.usedcarInfo.orderType
        // this.usedcarInfo.cityId ? data.cityId = this.usedcarInfo.cityId : '';
        // this.usedcarInfo.minPrice ? data.minPrice = this.usedcarInfo.minPrice : '';
        // this.usedcarInfo.maxPrice ? data.maxPrice = this.usedcarInfo.maxPrice : '';
        // this.usedcarInfo.minFirstPay ? data.minFirstPay = this.usedcarInfo.minFirstPay : '';
        // this.usedcarInfo.maxFirstPay ? data.maxFirstPay = this.usedcarInfo.maxFirstPay : '';
        // this.usedcarInfo.minRepay ? data.minRepay = this.usedcarInfo.minRepay : '';
        // this.usedcarInfo.maxRepay ? data.maxRepay = this.usedcarInfo.maxRepay : '';
        // this.usedcarInfo.searchKey ? data.searchKey = this.usedcarInfo.searchKey : '';
        // this.usedcarInfo.carBrandId ? data.carBrandId = this.usedcarInfo.carBrandId : '';
        // var param = qs.stringify(data);
        var param = new URLSearchParams();
        param.append("isNewCar", this.usedcarInfo.isNewCar);
        param.append("size", this.usedcarInfo.size);
        param.append("page", this.usedcarInfo.page);
        param.append("orderType", this.usedcarInfo.orderType);
        this.usedcarInfo.searchKey ? param.append("searchKey", this.usedcarInfo.searchKey) : '';
        this.usedcarInfo.cityId ? param.append("cityId", this.usedcarInfo.cityId) : '';
        this.usedcarInfo.minPrice ? param.append("minPrice", this.usedcarInfo.minPrice) : '';
        this.usedcarInfo.maxPrice ? param.append("maxPrice", this.usedcarInfo.maxPrice) : '';
        this.usedcarInfo.minFirstPay ? param.append("minFirstPay", this.usedcarInfo.minFirstPay) : '';
        this.usedcarInfo.maxFirstPay ? param.append("maxFirstPay", this.usedcarInfo.maxFirstPay) : '';
        this.usedcarInfo.minRepay ? param.append("minRepay", this.usedcarInfo.minRepay) : '';
        this.usedcarInfo.maxRepay ? param.append("maxRepay", this.usedcarInfo.maxRepay) : '';
        this.usedcarInfo.carBrandId ? param.append("carBrandId", this.usedcarInfo.carBrandId) : '';
        this.$axios.post(url, param)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.usedCarlist = res.data.data.list
              if (that.totalpage == 1) {
                that.allLoaded = true;
              }
              that.$nextTick(function () {
                // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                that.scrollMode = "touch";
                this.isHaveMore();
              })
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
      isHaveMore: function () {
        //是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false; //true是禁止上拉加载
        if (this.newcarInfo.page == this.totalpage || this.usedcarInfo.page == this.totalpage) {
          this.allLoaded = true;
        }
      },
      getBannerImg() {
        var url = this.$common.baseUrl + '/car/source/wx/getBannerImgs'
        var that = this
        this.$axios.post(url).then(function (res) {
          console.log(res.data.data);
          that.bannerImgs = res.data.data;
        })
      },

    }
  }
</script>

<style scoped lang='less'>

  @import "home";

  .mint-swipe {
    height: 2rem;
  }

  .mint-swipe-item {
    width: 100%;
    height: 2rem;
    background-color: gray;
    text-align: center;
    line-height: 2rem;
    color: #ffffff;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .mint-swipe-indicator {
    width: 6px;
    height: 6px;
    background-color: #fff;
  }
</style>
