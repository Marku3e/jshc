<template>
  <div id="appointment">
    <div class="content">
      <div class='android' v-show='storeName == "应用市场"'>
        <img src="../../assets/images/qietu@3x.png" alt="">
      </div>
      <div class="logo"></div>
      <div class="download" @click='download()'>
        <span></span>
        去{{storeName}}下载
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'

  export default {
    name: "appointment",
    data: {
      return: {
        storeName: 'App Stroe',

      }
    },
    created() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        this.storeName = '应用市场'
      }
      if (isiOS) {
        this.storeName = 'App Stroe'
      }
    },
    methods: {
      download() {
        MessageBox({
          title: '即将离开微信',
          message: '打开App Stroe',
          showCancelButton: true
        })
        MessageBox.confirm('确定执行此操作?').then(action => {
          let u = navigator.userAgent;
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          console.log("android终端" + isAndroid);
          console.log("ios终端" + isiOS);
          if (isAndroid) {
            // window.location.href = 'http://shouji.360tpcdn.com/9P1aVv4c2vyyElV_Qvi-ZwS1M_qtWOtaLPHWAkx1NiO1YcWwZTFyqyrs6bxMWBeiWU7YTBCQ6pZfZ63qx2RKCg3DDtnLC6V8_F45Aw6fXqY1.apk?sign=d66ad85e7ad0a6f9'
            window.location.href = 'http://zhushou.360.cn/detail/index/soft_id/3963146?recrefer=SE_D_%E5%A5%BD%E6%8F%90%E8%BD%A6#nogo'
          }
          if (isiOS) {
            window.location.href = 'https://itunes.apple.com/us/app/id1341587253'
          }
        });

      }
    }
  }
</script>

<style scoped lang='less'>
  @import "appointment";

</style>
