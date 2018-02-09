<template>
  <div id="appointment">
    <div class="content">
      <div class="logo"></div>
      <div class="download" @click='download()'>
        <span></span>
        去App Stroe下载
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  export default {
    name: "appointment",
    methods:{
      download(){
        MessageBox({
          title:'即将离开微信',
          message:'打开App Stroe',
          showCancelButton: true
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "appointment";

</style>
