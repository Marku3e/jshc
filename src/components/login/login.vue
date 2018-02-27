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

      <button ref='btn' @click="check()">立即预约</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        isShow: true,
        aa: false,
        num: 60,
        phoneNum: '',
        veri: '',
        reg: null,
      }
    },
    created() {

    },
    methods: {
      getVeri() {
        if (!this.reg) {
          return
        }
        let that = this
        that.isShow = false;
        let param = new URLSearchParams();
        param.append("phone",this.phoneNum);
        let url = this.$common.baseUrl + '/common/smscode';
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

        let timer = setInterval(function () {
          settime()
        }, 1000)
      },
      check() {
        if (this.veri.length == 6 && this.reg) {
          //   this.$refs.btn.removeAttribute('disabled');
          let url = this.$common.baseUrl + '/common/checkSmsCode';
          // const data = {
          //   phone: this.phoneNum-0,
          //   code: this.veri-0
          // }
          // console.log(data);
          let that = this
          let param = new URLSearchParams();
          param.append("phone",this.phoneNum);
          param.append("code",this.veri);
          this.$axios.post(url, param)
            .then(function (res) {
              console.log(res);
              if (res.data.err_no == 200) {
                that.$router.push({path:'/success'})
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
        const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
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
    }
  }
</script>

<style scoped lang='less'>
  @import "login";

</style>
