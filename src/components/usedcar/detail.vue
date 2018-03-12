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
            <!--<li>-->
            <!--<router-link :to="'/demo'">优惠车型</router-link>-->
            <!--</li>-->
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
      <mt-swipe-item v-for="(item,index) in carDetail.imgList"><img :src="item" alt=""></mt-swipe-item>
    </mt-swipe>
    <div class="carMsg">
      <h4>{{carDetail.modelName}}</h4>
      <p>指导价{{carDetail.price}}万</p>
    </div>
    <div class="b-line"></div>
    <div class="plan">
      <div class="p-tit">分期方案</div>
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
      <mt-tab-item v-bind:id="2">购车说明</mt-tab-item>
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
          <div class="a-info" v-for="(item,index) in carDetail.imgList">
            <img
              :src="item"
              alt="">
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
      }
    },
    created() {
      this.id = this.$route.params.id.split('&')
      this.getCarInfo()
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      },
      getCarInfo() {
        let that = this
        console.log(that.id);
        let url = this.$common.baseUrl + '/car/source/wx/getCarDetail';
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
        // let u = navigator.userAgent;
        // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // console.log("android终端" + isAndroid);
        // console.log("ios终端" + isiOS);
        window.location.href = "tel:400-680-8020";
        // });
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "detail.less";

  .mint-swipe {
    height: 176px;
  }

  .mint-swipe-item {
    width: 100%;
    height: 176px;
    background-color: gray;
    text-align: center;
    line-height: 1.76rem;
    color: #ffffff;
  }

  .mint-swipe-indicator {
    width: 6px;
    height: 6px;
    background-color: #fff;
  }
</style>
