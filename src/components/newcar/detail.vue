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
              <router-link :to="'/home'">首页</router-link>
            </li>
            <li>
              <router-link :to="'/newcar'">买新车</router-link>
            </li>
            <li>
              <router-link :to="'/usedcar'">买二手车</router-link>
            </li>
            <div class="bb"></div>
            <li>
              <router-link :to="'/demo'">优惠车型</router-link>
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
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
      <mt-swipe-item>4</mt-swipe-item>
      <mt-swipe-item>5</mt-swipe-item>
    </mt-swipe>
    <div class="carMsg">
      <h4>东风 日产轩逸 1.6L 自动经典舒适版</h4>
      <p>指导价27.98万</p>
    </div>
    <div class="b-line"></div>
    <div class="plan">
      <div class="p-tit">分期方案</div>
      <div class="bb"></div>
      <div class="p-info">
        <div>
          <p>期数</p>
          <p>36</p>
        </div>
        <div>
          <p>提车价</p>
          <p>¥16470.00</p>
        </div>
        <div>
          <p>月供</p>
          <p>¥3259.00</p>
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
          <div class="d-tit">基本配置</div>
          <div class="bb"></div>
          <div class="d-info">
            <ul>
              <li><span>车身结构</span><i>4门5座三厢车</i></li>
              <li><span>长/宽/高</span><i>4442/1748/1476mm</i></li>
              <li><span>发动机</span> <i>1.6L 117马力 L4</i></li>
              <li><span>变速箱</span> <i>6档手自一体</i></li>
              <li><span>驱动方式</span><i>前置前驱</i></li>
              <li><span>燃料形式</span><i>-</i></li>
              <li><span>综合油耗</span><i>6.50L/100km(工信部)</i></li>
              <li><span>车辆配色</span><i>外观白色+内饰深色</i></li>
            </ul>
          </div>
        </div>
        <div class="adv">
          <div class="a-tit">车型亮点</div>
          <div class="a-info">
            <img
              src="https://img.souche.com/9b38c53187733dfde1ae53b6bc5ec424.JPG?x-oss-process=image/resize,m_fill,w_1916,h_1277"
              alt="">
            <p>这是一款极具性价比的SUV车型,空间大配置高,怎么看都是这个价位的绝佳之选……</p>
          </div>
          <div class="a-info">
            <img
              src="https://img.souche.com/9b38c53187733dfde1ae53b6bc5ec424.JPG?x-oss-process=image/resize,m_fill,w_1916,h_1277"
              alt="">
            <p>这是一款极具性价比的SUV车型,空间大配置高,怎么看都是这个价位的绝佳之选……</p>
          </div>
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
      <div class="appointment">
        预约到店
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: "detail",
    data() {
      return {
        open: false,
        docked: true,
        selected: 1,
        id:-1,
      }
    },
    created() {
      this.id=this.$route.params.id
      this.getCarInfo()
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      },
     getCarInfo(){
        let that = this
       console.log(that.id);
     },
      call(){
        MessageBox({
          title: '400-680-8020',
          message: '  ',
          showCancelButton: true
        });
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
