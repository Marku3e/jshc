<template>
  <div id="login">
    <div class="header">
      <span class='iconfont icon-back' @click=back()></span>
      九盛好车
    </div>
    <div class="body">

      <input type="number" placeholder='请输入手机号' v-model='phoneNum' @blur="pattern()">
      <!--<p v-show='!reg'>请输入正确的手机号码</p>-->
      <div class='veri'>
        <input type="number" placeholder='请输入验证码' v-model='veri'>

        <span class="verification">重发 (<i class='red'>{{num}}S</i>)</span>
        <span class='getVeri' @click="getVeri()" v-show=isShow>获取验证码</span>
      </div>
      <!--<select id="stroeList" v-model='select' @change="getId($event)">-->
      <!--<option v-for="item in storeList" :value="item.store_id">{{item.name}}</option>-->
      <!--</select>-->


      <!--<mu-select-field v-model="select" :labelFocusClass="['label-foucs']" @change="getId($event)" :maxHeight="300">-->
      <!--<mu-menu-item v-for="(item,index) in storeList" :key="index" :value="item.store_id" :title="item.name"/>-->
      <!--</mu-select-field>-->
      <!--<button @click=demo()>123</button>-->
      <button ref='btn' @click="check()">立即预约</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        carId: "",
        carSourceId: '',
        select: "",
        storeList: [],
        isShow: true,
        aa: false,
        num: 60,
        phoneNum: '',
        veri: '',
        reg: null,
        term: null,
        firstPay: null
      }
    },
    created() {
      this.carId = this.$route.params.id.split(',')[0]
      console.log(this.carId);
      // console.log(this.carId);
      this.carSourceId = this.$route.params.id.split(',')[1]
      this.getStore();
      this.getCarInfo();
    },
    methods: {
      getId: function (e) {
        console.log(this.select);
      },
      getVeri() {
        if (!this.reg) {
          return
        }
        var that = this
        that.isShow = false;
        // var param = new URLSearchParams();
        // param.append("phone", this.phoneNum);
        var qs = require('qs');
        var data = {}
        data.phone = this.phoneNum
        var param = qs.stringify(data);
        var url = this.$common.baseUrl + '/common/smscode';
        this.$axios.post(url, param)
          .then(function (res) {
            console.log(res);
          })
          .catch(function (res) {
            console.log(res);
          })

        function settime() {
          if (that.num == 1) {
            that.aa = false
            that.isShow = true;
            that.num = 60
          } else {
            that.num--;
          }
        }

        var timer = setInterval(function () {
          settime()
        }, 1000)
      },
      check() {
        if (this.veri.length == 6 && this.reg) {
          var that = this

          //   this.$refs.btn.removeAttribute('disabled');
          var url = this.$common.baseUrl + '/common/checkSmsCode';
          // var data = {
          //   phone: this.phoneNum-0,
          //   code: this.veri-0
          // }
          // console.log(data);
          // var param = new URLSearchParams();
          // param.append("phone", this.phoneNum);
          // param.append("code", this.veri);
          var qs = require('qs');
          var data = {}
          data.phone = this.phoneNum
          data.code = this.veri
          var param = qs.stringify(data);
          this.$axios.post(url, param)
            .then(function (res) {
              console.log(res);
              if (res.data.err_no == 200) {
                that.sendInfo()

              } else {
                console.log('验证码错误');
              }
            })

        } else if (this.phoneNum.length == 0) {
          this.$Toast({
            message: '请输入手机号码',
            position: 'center',
            duration: 2000
          })
        } else if (this.veri.length !== 6) {
          this.$Toast({
            message: '验证码格式不对',
            position: 'center',
            duration: 2000
          })
        }

      },
      pattern() {
        var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
        this.reg = reg.test(this.phoneNum)
        if (!this.reg) {
          this.$Toast({
            message: '请输入正确手机号',
            position: 'center',
            duration: 2000
          })
        }
      },
      back() {
        this.$router.go(-1)
      },
      disabled() {
        this.$Toast({
          message: '不符合格式',
          position: 'center',
          duration: 2000
        })
        return
      },
      getStore: function () {
        var that = this;
        var url = this.$common.baseUrl + '/car/source/wx/getAllStore'
        this.$axios.post(url).then(function (res) {
          console.log(res);
          that.storeList = res.data.data
          that.select = res.data.data[0].store_id
          // console.log(that.select);
        })
      },
      getCarInfo() {
        var that = this;
        var url = this.$common.baseUrl + '/car/source/wx/getCarDetail';
        this.$axios.post(url + '?modelId=' + that.carId + '&carSourceId=' + that.carSourceId).then(function(res) {
          console.log(res);
          that.term = res.data.data.term
          that.firstPay = res.data.data.firstPay
          // console.log(that.term + '----' + that.firstPay);
        })
      },
      sendInfo() {
        var that = this;
        var url = this.$common.baseUrl + '/car/source/wx/saveCarReserve'
        // '&storeId=' + that.select +
        this.$axios.post(url + '?carSourceId=' + that.carSourceId + '&phone=' + that.phoneNum + '&term=' + that.term + '&applyMoney=' + that.firstPay)
          .then(function(res) {
            console.log(res.data.msg);
            if (res.data.err_no == 500) {
              this.$Toast({
                message: res.data.msg,
                position: 'center',
                duration: 2000
              })
              return;
            } else {
              that.$router.push({path: '/success'})
            }
          })
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "login";

</style>
