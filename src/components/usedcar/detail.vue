<template>
  <div id="detail">
    <div class="header">
      <h1 class="logo">
      </h1>
      <div class='title'>
        好提车
      </div>
      <div class="option">
        <span label="undocked drawer" @click="toggle(true)" class='iconfont icon-bars'></span>
        <mu-drawer right :open="open" :docked="docked" @close="toggle()">
          <ul @itemClick="docked ? '' : toggle()">
            <li>
              <router-link :to="'/'">首页</router-link>
            </li>
            <li>
              <router-link :to="{path:'/newcar',query:{isNewCar:true,size:10,page:1,orderType:1}}">买新车</router-link>
            </li>
            <li>
              <router-link :to="{path:'/usedcar',query:{isNewCar:false,size:10,page:1,orderType:1}}">买二手车</router-link>
            </li>
            <div class="bb"></div>
            <li>
              <router-link :to="{path:'/youhui',query:{size:10,page:1,orderType:1,isPreferential:true}}">优惠车型
              </router-link>
            </li>
            <li>
              <router-link :to="'/appointment'">我要提车</router-link>
            </li>
            <li>
              <router-link :to="'/aboutus'">关于九盛好车</router-link>
            </li>
            <div class="bb"></div>
          </ul>
        </mu-drawer>
      </div>
    </div>
    <mt-swipe :auto="3000">
      <span class='yhImg' v-if='youhui == 1'></span>
      <mt-swipe-item v-for="(item,index) in carDetail.imgList"><img :src="item" alt="">

      </mt-swipe-item>
      <!--<mt-swipe-item><img src="http://img.souche.com/model-material/202719/tgc_dsc_124/20170922152201/5f0f17bce2621860b82cafc5057b986f.jpg?x-oss-process=image/resize,m_fill,w_750,h_375" alt=""></mt-swipe-item>-->
    </mt-swipe>
    <div class="carMsg">
      <h4>{{carDetail.modelName}}</h4>
      <p>指导价{{carDetail.price}}万</p>
    </div>
    <div class="b-line"></div>
    <div class="plan">
      <div class="p-tit">参考分期方案</div>
      <div class="bb"></div>
      <div class="p-info">
        <div>
          <p>期数</p>
          <p>{{carDetail.term}}期</p>
        </div>
        <div>
          <p>首付</p>
          <p>{{carDetail.firstPay}}万</p>
        </div>
        <div>
          <p>月供</p>
          <p>{{carDetail.monthRepay}}元</p>
        </div>
      </div>
    </div>
    <div class="b-line"></div>
    <div class="youhui">
      <div class="yh-icon">优惠</div>
      <div class="yh-txt">提车价包含首付、保证金、购置车税、保险，最 终成交额以各地实际交易额为准</div>
    </div>
    <div class="b-line"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item v-bind:id="1" ref='msg'>车辆信息</mt-tab-item>
      <mt-tab-item v-bind:id="2">产品特色</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-bind:id="1">
        <div class="default">
          <div class="d-tit">车辆档案</div>
          <div class="bb"></div>
          <div class="d-info">
            <ul>
              <li><span>表显里程</span><i>{{carDetail.mile}}万公里</i></li>
              <li><span>初次上牌</span><i>{{carDetail.plateTime?carDetail.plateTime:"-"}}</i></li>
              <li><span>所在地</span> <i>{{carDetail.city}}</i></li>
              <li><span>排放标准</span> <i>{{carDetail.dischargeStandard}}</i></li>
              <li><span>变速箱</span><i>{{carDetail.gearbox}}</i></li>
              <li><span>排量</span><i>{{carDetail.liter?carDetail.liter:"-"}}</i></li>
            </ul>
          </div>
        </div>
        <div class="adv">
          <div class="a-tit">车辆实拍</div>
          <div class="a-info" v-for="(item,index) in carDetail.details">
            <img :src="carDetail.details[index].image" alt="" v-if='carDetail.details[index].image'>
            <h4 v-if='carDetail.details[index].title'>{{carDetail.details[index].title}}</h4>
            <p v-if='carDetail.details[index].content'>{{carDetail.details[index].content}}</p>
          </div>
          <!--<div class="a-info">-->
          <!--<img-->
          <!--src="https://img.souche.com/9b38c53187733dfde1ae53b6bc5ec424.JPG?x-oss-process=image/resize,m_fill,w_1916,h_1277"-->
          <!--alt="">-->
          <!--</div>-->
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item v-bind:id="2">
        <div class="product-adv">
          <div class="p-tit">产品优势</div>
          <div class="bb"></div>
          <div class="pro-info">
            <div class='yi'>
              两证一卡 <br>
              审批易
            </div>
            <div class='di'>
              贷款购车 <br>
              费用低
            </div>
            <div class='kuai'>
              流程简便 <br>
              提车快
            </div>
            <div class='quan'>
              购车养车 <br>
              服务全
            </div>
          </div>
          <div class="bb"></div>
          <div class="dif">
            <div class="dif-top">
              <div class="jiusheng">九盛好车</div>
              <div class="vs"></div>
              <div class="other">其他贷款买车</div>
            </div>
            <div class="dif-bottom">
              <div class="db-left">
                <div class="db-list">
                  <h3>门槛低</h3>
                  <p>首付最低36200元</p>
                  <p>含购置税，送一年保险</p>
                </div>
                <div class="db-list">
                  <h3>月供低</h3>
                  <p class='single'>第一年用车月供8998元</p>
                  <p style='opacity: 0;'>demo</p>
                  <p style='opacity: 0;'>demo</p>
                </div>
                <div class="db-list">
                  <h3>轻松换好车</h3>
                  <p>用车满1年，续租名购买美退款</p>
                  <p>三种方式任您选择</p>
                </div>
                <div class="db-list">
                  <h3>手续便捷</h3>
                  <p>支付宝扫码征信</p>
                  <p>秒批秒贷，全程代办，坐等提车</p>
                </div>
              </div>
              <div class="db-right">
                <div class="db-list">
                  <h3>门槛高</h3>
                  <p>首付30%起，加上购置税</p>
                  <p>和保险将近一半车款</p>
                </div>
                <div class="db-list">
                  <h3>月供高</h3>
                  <p>付完首付每月吃土，算上</p>
                  <p>月供更是雪上加霜</p>
                </div>
                <div class="db-list">
                  <h3>换车难</h3>
                  <p>新车落地就降价</p>
                  <p>1年小改款，3年就换代</p>
                </div>
                <div class="db-list">
                  <h3>手续繁琐</h3>
                  <p>提供收入证明，社保证明</p>
                  <p>审核通过率低</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bb bbnomargin"></div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="footer">
      <div class="call" @click='call()'>
        <span class='iconfont icon-dianhuazhengzaibohao'></span>
        <i>咨询</i>
      </div>
      <router-link class="appointment" v-bind="{to:'/login/'+id}">
        预约到店
      </router-link>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: "detail",
    data() {
      return {
        carDetail: "",
        open: false,
        docked: true,
        selected: 1,
        id: -1,
        youhui: null,
      }
    },
    created() {
      this.id = this.$route.params.id.split('&')
      this.youhui = this.id[2];
      this.getCarInfo()
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      },
      getCarInfo() {
        var that = this
        console.log(that.id);
        var url = this.$common.baseUrl + '/car/source/wx/getCarDetail';
        this.$axios.post(url + '?modelId=' + that.id[0] + '&carSourceId=' + that.id[1]).then(function (res) {
          console.log(res);
          that.carDetail = res.data.data

          // console.log(that.carDetail.imgList);

        })
      },
      call() {
        // MessageBox({
        //   title: '400-680-8020',
        //   message: '  ',
        //   showCancelButton: true
        // });
        // MessageBox.confirm('确定执行此操作?').then(action => {
        // var u = navigator.userAgent;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // console.log("android终端" + isAndroid);
        // console.log("ios终端" + isiOS);
        window.location.href = "tel:400-118-1599";
        // });
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "detail.less";

  .mint-swipe {
    height: 2rem;
    position: relative;
    .yhImg {
      position: absolute;
      display: block;
      width: .7rem;
      height: .7rem;
      top: 0;
      left: 0;
      background: url("../../assets/images/youhui_b@3x.png") no-repeat;
      background-size: .7rem;
      z-index: 144;
    }
  }

  .mint-swipe-item {
    width: 100%;
    height: 2rem;
    background-color: gray;
    text-align: center;
    line-height: 2rem;
    color: #ffffff;

  }

  .mint-swipe-indicator {
    width: 6px;
    height: 6px;
    background-color: #fff;
  }
</style>
