<template>
  <div id="carlist" ref='carlist'>
    <subHeader></subHeader>
    <!---->
    <div class="body">
      <div class="filter">
        <div class="def" @click.stop="openFilter(1)" :class='flag==1&&scroll?"red":""'>
          <i>{{defname}}</i>
          <span class='iconfont' :class='flag==1&&scroll?"icon-iconup":"icon-down"'></span>
        </div>
        <div class="brand" @click.stop="openFilter(2)" :class='flag==2&&scroll?"red":""'>
          <i>品牌</i>
          <span class='iconfont ' :class='flag==2&&scroll?"icon-iconup":"icon-down"'></span>
        </div>
        <div class="f-pay" @click.stop="openFilter(3)" :class='flag==3&&scroll?"red":""'>
          <i>首付</i>
          <span class='iconfont ' :class='flag==3&&scroll?"icon-iconup":"icon-down"'></span>
        </div>
        <div class="all" @click.stop="openFilter(4)">
          <i>筛选</i>
          <span class='iconfont icon-filter '></span>
        </div>
      </div>
      <!--<div id="infoShow">-->

      <!--</div>-->
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="car_list">
          <router-link class="car_msg" v-for='item in newCarlist'
                       v-bind="{to:'newcar/detail/'+item.modelId+'&'+item.carSourceId+'&'+item.isPreferential}">
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
      </v-loadmore>
      <div class="layout" v-show=scroll @click.stop='scroll=false,carBrand=false' @touchmove.prevent>
        <ul class='deflist' v-show=def>
          <li class='active' @click.stop='def_filter($event,1)' :class='defname=="默认排序"?"redduigou":""'>默认排序<span
            class='iconfont icon-duigou' :class='defname=="默认排序"?"redduigou":""'></span></li>
          <li @click.stop='def_filter($event,1)' :class='defname=="首付最低"?"red":""'>首付最低<span
            class='iconfont icon-duigou' :class='defname=="首付最低"?"redduigou":""'></span></li>
          <li @click.stop='def_filter($event,2)' :class='defname=="首付最高"?"red":""'>首付最高<span
            class='iconfont icon-duigou' :class='defname=="首付最高"?"redduigou":""'></span></li>
          <li @click.stop='def_filter($event,3)' :class='defname=="月供最低"?"red":""'>月供最低<span
            class='iconfont icon-duigou' :class='defname=="月供最低"?"redduigou":""'></span></li>
          <li @click.stop='def_filter($event,4)' :class='defname=="月供最高"?"red":""'>月供最高<span
            class='iconfont icon-duigou' :class='defname=="月供最高"?"redduigou":""'></span></li>
          <li @click.stop='def_filter($event,1)' :class='defname=="车价最低"?"red":""'>车价最低<span
            class='iconfont icon-duigou' :class='defname=="车价最低"?"redduigou":""'></span></li>
          <li @click.stop='def_filter($event,2)' :class='defname=="车价最高"?"red":""'>车价最高<span
            class='iconfont icon-duigou' :class='defname=="车价最高"?"redduigou":""'></span></li>
        </ul>
        <ul class='payBox' v-show=pay>
          <li :class='{"f-active":all.p_active==1}' @click="payClick($event,1)">全部</li>
          <li :class='{"f-active":all.p_active==2}' @click="payClick($event,2)">一万以内</li>
          <li :class='{"f-active":all.p_active==3}' @click="payClick($event,3)">1-2万</li>
          <li :class='{"f-active":all.p_active==4}' @click="payClick($event,4)">2-3万</li>
          <li :class='{"f-active":all.p_active==5}' @click="payClick($event,5)">3-4万</li>
          <li :class='{"f-active":all.p_active==6}' @click="payClick($event,6)">4万以上</li>
        </ul>
      </div>
    </div>
    <ul class='carBrand' v-show='carBrand' style="display: none">
      <li @click=bClick(null)>
        <img src="https://image.guazistatic.com/gz01170808/01/36/89d8107acef552cc75d5c5842e318197.png" alt="">
        全部
      </li>
      <li v-for="(item,index) in carBrandList" @click=bClick(item.car_brand_id)>
        <img :src="item.brand_image" alt="">
        {{item.brand_name}}
      </li>
    </ul>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :modal=false>
      <div class="all-header">
        <div class="a-h-left" @click.stop="popupVisible=false;scroll=false">
          <span class='iconfont icon-back'></span>
        </div>
        <div class="a-h-midden">筛选</div>
        <div class="a-h-right" @click="reset()">重置</div>
      </div>
      <div class="all-body">
        <!--<div class="a-b-price"></div>-->
        <div class="a-b-type">
          <div class="title">
            <p>车型</p>
            <div>{{all.type=='全部'?all.type='不限':all.type}}</div>
          </div>
          <ul class="list">
            <li :class='{"active":all.t_active==1}' @click='typeClick($event,1)'>
              <img src="../../../src/assets/images/quanbu@3x.png" alt="">
              全部
            </li>
            <li @click='typeClick($event,2)' :class='{"active":all.t_active==2}'>
              <img src="../../../src/assets/images/jiaoche@3x.png" alt="">
              轿车
            </li>
            <li @click='typeClick($event,3)' :class='{"active":all.t_active==3}'>
              <img src="../../../src/assets/images/suv@3x.png" alt="" style='padding-top:0.15rem'>
              SUV
            </li>
            <li @click='typeClick($event,4)' :class='{"active":all.t_active==4}'>
              <img src="../../../src/assets/images/mpv@3x.png" alt="">
              MPV
            </li>
          </ul>
        </div>
        <div class="a-b-pay">
          <div class="title">
            <p>首付/元</p>
            <div>{{all.pay=='全部'?all.pay='不限':all.pay}}</div>
          </div>
          <ul class="list">
            <li :class='{"active":all.p_active==1}' @click="payClick($event,1)">全部</li>
            <li :class='{"active":all.p_active==2}' @click="payClick($event,2)">1万以内</li>
            <li :class='{"active":all.p_active==3}' @click="payClick($event,3)">1-2万</li>
            <li :class='{"active":all.p_active==4}' @click="payClick($event,4)">2-3万</li>
            <li :class='{"active":all.p_active==5}' @click="payClick($event,5)">3-4万</li>
            <li :class='{"active":all.p_active==6}' @click="payClick($event,6)">4万以上</li>
          </ul>
        </div>
        <div class="a-b-payMonthly">
          <div class="title">
            <p>月供/元</p>
            <div>{{all.payMonthly=='全部'?all.payMonthly='不限':all.payMonthly}}</div>
          </div>
          <ul class="list">
            <li :class='{"active":all.pm_active==1}' @click="pmClick($event,1)">全部</li>
            <li :class='{"active":all.pm_active==2}' @click="pmClick($event,2)">2000以内</li>
            <li :class='{"active":all.pm_active==3}' @click="pmClick($event,3)">2000-4000元</li>
            <li :class='{"active":all.pm_active==4}' @click="pmClick($event,4)">4000以上</li>
          </ul>
        </div>
      </div>
      <div class="all-footer">
        <p>已选条件共<i class='red b'>{{total}}</i>辆车</p>
        <button @click="popupVisible = false;scroll= false">查看</button>
      </div>
    </mt-popup>
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
        all: {
          type: '全部',
          pay: '全部',
          payMonthly: '全部',
          t_active: 1,
          p_active: 1,
          pm_active: 1,
        },
        total: null,
        defname: "默认排序",
        def: false,
        pay: false,
        carBrand: false,
        scroll: false,
        flag: null,
        popupVisible: false,
        newCarlist: [],
        carBrandList: [],
        carInfo: {
          isNewCar: null,
          size: null,
          page: null,
          cityId: null,
          orderType: null,
          minPrice: null,
          maxPrice: null,
          minFirstPay: null,
          maxFirstPay: null,
          minRepay: null,
          maxRepay: null,
          carBrandId: null,
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
        this.carInfo.page = 1;
        location.reload()
      }
    },
    created() {
      //console.log(this.$route.query);
      this.carInfo = this.$route.query;
      var cid = JSON.parse(localStorage.getItem("city")).id
      if (cid) {
        this.carInfo.cityId = cid
      } else {
        if (JSON.parse(localStorage.getItem("city")).cityname == '全国') {
          this.carInfo.cityId = cid
        } else {
          this.carInfo.cityId = 18
        }
      }

      this.getNewcar();
      this.getBrandInfo()
    },
    methods: {
      handleBottomChange() {
        // this.bottomAllLoaded = false
        // this.$refs.loadmore.onBottomLoaded();
      },
      loadBottom() {
        //
        if (this.totalpage == 1) {
          this.carInfo.page = 1;
          this.allLoaded = true;
        } else {
          this.carInfo.page = this.carInfo.page - 0 + 1;
          //console.log(this.carInfo.page);
          this.allLoaded = false;
        }
        this.getNewcar()
        // 上拉加载
        // this.more();// 上拉触发的分页查询
        // // this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        this.$refs.loadmore.onBottomLoaded();

      },
      getInfo: function () {
        this.carInfo.page = 1;
        var url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";
        var param = new URLSearchParams();
        param.append("isNewCar", this.carInfo.isNewCar);
        param.append("size", this.carInfo.size);
        param.append("page", this.carInfo.page);
        param.append("orderType", this.carInfo.orderType);
        this.carInfo.searchKey ? param.append("searchKey", this.carInfo.searchKey) : '';
        this.carInfo.cityId ? param.append("cityId", this.carInfo.cityId) : '';
        this.carInfo.minPrice ? param.append("minPrice", this.carInfo.minPrice) : '';
        this.carInfo.maxPrice ? param.append("maxPrice", this.carInfo.maxPrice) : '';
        this.carInfo.minFirstPay ? param.append("minFirstPay", this.carInfo.minFirstPay) : '';
        this.carInfo.maxFirstPay ? param.append("maxFirstPay", this.carInfo.maxFirstPay) : '';
        this.carInfo.minRepay ? param.append("minRepay", this.carInfo.minRepay) : '';
        this.carInfo.maxRepay ? param.append("maxRepay", this.carInfo.maxRepay) : '';
        this.carInfo.carBrandId ? param.append("carBrandId", this.carInfo.carBrandId) : '';
        //console.log(param);
        var that = this
        this.$axios.post(url, param)
          .then(function (res) {
            console.log(res);
            that.total = res.data.data.total
            that.newCarlist = res.data.data.list;
          }).catch(function (error) {
          console.log(error);
        });
      },
      getNewcar() {
        var url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";
        var that = this
        var param = new URLSearchParams();
        param.append("isNewCar", this.carInfo.isNewCar);
        param.append("size", this.carInfo.size);
        param.append("page", this.carInfo.page);
        param.append("orderType", this.carInfo.orderType);
        this.carInfo.searchKey ? param.append("searchKey", this.carInfo.searchKey) : '';
        this.carInfo.cityId ? param.append("cityId", this.carInfo.cityId) : '';
        this.carInfo.minPrice ? param.append("minPrice", this.carInfo.minPrice) : '';
        this.carInfo.maxPrice ? param.append("maxPrice", this.carInfo.maxPrice) : '';
        this.carInfo.minFirstPay ? param.append("minFirstPay", this.carInfo.minFirstPay) : '';
        this.carInfo.maxFirstPay ? param.append("maxFirstPay", this.carInfo.maxFirstPay) : '';
        this.carInfo.minRepay ? param.append("minRepay", this.carInfo.minRepay) : '';
        this.carInfo.maxRepay ? param.append("maxRepay", this.carInfo.maxRepay) : '';
        this.carInfo.carBrandId ? param.append("carBrandId", this.carInfo.carBrandId) : '';


        // var qs = require('qs');
        // var data = {}
        // data.isNewCar = this.carInfo.isNewCar
        // data.size = this.carInfo.size
        // data.page = this.carInfo.page
        // data.orderType = this.carInfo.orderType
        // this.carInfo.cityId ? data.cityId = this.carInfo.cityId : '';
        // this.carInfo.minPrice ? data.minPrice = this.carInfo.minPrice : '';
        // this.carInfo.maxPrice ? data.maxPrice = this.carInfo.maxPrice : '';
        // this.carInfo.minFirstPay ? data.minFirstPay = this.carInfo.minFirstPay : '';
        // this.carInfo.maxFirstPay ? data.maxFirstPay = this.carInfo.maxFirstPay : '';
        // this.carInfo.minRepay ? data.minRepay = this.carInfo.minRepay : '';
        // this.carInfo.maxRepay ? data.maxRepay = this.carInfo.maxRepay : '';
        // this.carInfo.searchKey ? data.searchKey = this.carInfo.searchKey : '';
        // this.carInfo.carBrandId ? data.carBrandId = this.carInfo.carBrandId : '';
        // var param = qs.stringify(data);

        // console.log(param);
        this.$axios.post(url, param)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              that.newCarlist = that.newCarlist.concat(res.data.data.list);
              that.totalpage = res.data.data.totalPage;
              that.total = res.data.data.total
              if (that.totalpage == 1) {
                that.allLoaded = true;
              }
              that.$nextTick(function () {
                // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                that.scrollMode = "touch";
                this.isHaveMore();
              });
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
      more: function () {
        // 分页查询
        // if (this.totalpage == 1) {
        //   this.carInfo.page = 1;
        //   this.allLoaded = true;
        // } else {
        //   this.carInfo.page = this.carInfo.page - 0 + 1;
        //   //console.log(this.carInfo.page);
        //   this.allLoaded = false;
        // }
        // // this.carInfo.page = this.carInfo.page - 0 + 1;
        // // console.log(this.carInfo.page);
        // // this.allLoaded = false;
        // var url = this.$common.baseUrl + "/car/source/wx/getCarPriceList";
        // var param = new URLSearchParams();
        // param.append("isNewCar", this.carInfo.isNewCar);
        // param.append("size", this.carInfo.size);
        // param.append("page", this.carInfo.page);
        // param.append("orderType", this.carInfo.orderType);
        // this.carInfo.searchKey ? param.append("searchKey", this.carInfo.searchKey) : '';
        //
        // this.carInfo.cityId ? param.append("cityId", this.carInfo.cityId) : '';
        // this.carInfo.minPrice ? param.append("minPrice", this.carInfo.minPrice) : '';
        // this.carInfo.maxPrice ? param.append("maxPrice", this.carInfo.maxPrice) : '';
        // this.carInfo.minFirstPay ? param.append("minFirstPay", this.carInfo.minFirstPay) : '';
        // this.carInfo.maxFirstPay ? param.append("maxFirstPay", this.carInfo.maxFirstPay) : '';
        // this.carInfo.minRepay ? param.append("minRepay", this.carInfo.minRepay) : '';
        // this.carInfo.maxRepay ? param.append("maxRepay", this.carInfo.maxRepay) : '';
        // this.carInfo.carBrandId ? param.append("carBrandId", this.carInfo.carBrandId) : '';
        // // console.log(param);
        // var that = this
        // this.$axios.post(url, param)
        //   .then(function (res) {
        //     console.log(res);
        //     that.totalpage = res.data.data.totalpage
        //     that.total = res.data.data.total
        //     that.newCarlist = that.newCarlist.concat(res.data.data.list);
        //     this.isHaveMore();
        //   }).catch(function (error) {
        //   console.log(error);
        // });
      },
      isHaveMore: function () {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false; //true是禁止上拉加载

        if (this.carInfo.page == this.totalpage) {
          this.allLoaded = true;
        }
      },
      getBrandInfo: function () {
        // var url = this.$common.baseUrl + '/car/basic/getHotBrand';
        // var url = this.$common.baseUrl + '/car/basic/getBrandList' ;
        var url = this.$common.baseUrl + '/car/source/wx/getBrandList';
        var that = this
        this.$axios.post(url).then(function (res) {
          // console.log(res.data.data);
          if (res.data.res_code == '0000') {
            that.carBrandList = res.data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      openFilter(num) {
        if (num == this.flag) {

          this.scroll = false
          this.carBrand = false
          // console.log(this.carBrand);
          this.flag = null
        } else {
          this.scroll = true
          this.flag = num
          if (num == 1) {
            this.carBrand = false;
            this.pay = false;
            this.def = true
          } else if (num == 2) {
            this.def = false;
            this.pay = false;
            this.carBrand = true
          } else if (num == 3) {
            this.def = false;
            this.carBrand = false;

            this.pay = true
          } else if (num == 4) {
            this.def = false;
            this.carBrand = false;
            this.popupVisible = true;
            this.pay = false
          }
        }


      },
      def_filter: function (e, o) {
        //console.log(e.target.innerText);
        this.defname = e.target.innerText
        this.scroll = false
        // this.$route.path({
        //   path: '/newcar',
        //   query: {}
        // })
        //console.log(o);
        // this.$route.query.orderType = o;
        // console.log(this.$route.query);
        this.carInfo.orderType = o;
        this.getInfo();
        // console.log(1);
        //this.$router.go(0)
        // location.reload()
      },
      typeClick: function (e, num) {
        if (e.target.innerText) {
          this.all.type = e.target.innerText
        } else {
          this.all.type = e.target.parentNode.innerText
        }
        this.all.t_active = num;
        // console.log(e.target.parentNode);
      },
      payClick: function (e, num) {
        console.log(1);
        this.all.pay = e.target.innerText
        this.all.p_active = num;
        switch (num) {
          case 1:
            this.carInfo.minFirstPay = null
            this.carInfo.maxFirstPay = null
            console.log(this.carInfo);
            this.getInfo()
            break;
          case 2:
            this.carInfo.minFirstPay = 0
            this.carInfo.maxFirstPay = 1
            this.getInfo()
            break;
          case 3:
            this.carInfo.minFirstPay = 1
            this.carInfo.maxFirstPay = 2
            this.getInfo()
            break;
          case 4:
            this.carInfo.minFirstPay = 2
            this.carInfo.maxFirstPay = 3
            this.getInfo()
            break;
          case 5:
            this.carInfo.minFirstPay = 3
            this.carInfo.maxFirstPay = 4
            this.getInfo()
            break;
          case 6:
            this.carInfo.minFirstPay = 4
            this.carInfo.maxFirstPay = null
            this.getInfo()
            break;
        }
        ;

      },
      pmClick: function (e, num) {
        this.all.payMonthly = e.target.innerText
        this.all.pm_active = num;
        switch (num) {
          case 1:
            this.carInfo.minRepay = null
            this.carInfo.maxRepay = null
            this.getInfo()
            break;
          case 2:
            this.carInfo.minRepay = 0
            this.carInfo.maxRepay = 2000
            this.getInfo()
            break;
          case 3:
            this.carInfo.minRepay = 2000
            this.carInfo.maxRepay = 4000
            this.getInfo()
            break;
          case 4:
            this.carInfo.minRepay = 4000
            this.carInfo.maxRepay = null
            this.getInfo()
            break;
        }
      },
      bClick(id) {
        console.log(id);
        this.scroll = false;
        this.carBrand = false
        this.carInfo.carBrandId = id;
        this.carInfo.page = 1;
        this.getInfo()
      },
      reset: function () {
        this.all.type = '全部';
        this.all.pay = '全部';
        this.all.payMonthly = '全部';
        this.all.t_active = 1
        this.all.p_active = 1
        this.all.pm_active = 1
      },
    }
    ,
  }
</script>

<style scoped lang='less'>
  @import "./carlist";
</style>
