<template>
  <div id="demo">
    <subHeader></subHeader>
    <mt-button type="primary" plain @click='getInfo()'>click me</mt-button>
  </div>
</template>

<script>
  import subHeader from '../subcom/header'

  export default {
    name: "demo",
    components: {
      "subHeader": subHeader
    },
    data() {
      return {}
    },
    methods: {
      getInfo() {
        // console.log(returnCitySN['cip'] + returnCitySN['cname']);
        var ss = remote_ip_info['city'];
        console.log(ss);
      }
    },
  }
</script>

<style scoped lang='less'>
  #demo {
    button {
      width: 200px;
      height: 50px;
      text-align: center;
      margin: 200px auto;
      display: block;
    }
  }

</style>
