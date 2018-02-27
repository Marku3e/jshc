<template>
  <div id="success">
    <div class="header">
      <span class='iconfont icon-back' @click=back()></span>
      车辆详情
    </div>
    <div class="body">
      <span class='iconfont icon-icon-'></span>
      <h4>预约成功</h4>
      <p>购车客服将在24小时内联系您</p>
      <div @click='success()'>完成</div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "success",
    methods: {
      back() {
        this.$router.go(-1)
      },
      success() {
        this.$router.go(-2)
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "success";
</style>
