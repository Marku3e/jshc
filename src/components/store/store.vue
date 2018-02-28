<template>
  <div id="stroe">
    <div class="list">
      <div class="detail">
        <div class="top">
          <h4>武汉美驰万国时代店</h4>
          <p>武汉市硚口区解放大道667号美驰名车广场</p>
        </div>
        <div class="down">
          <div class="map">
            <span class='iconfont icon-map'></span>地图
          </div>
          <div class="call">
            <span class='iconfont icon-dianhua'></span>电话
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="top"></div>
        <div class="down">
          <div class="map"></div>
          <div class="call"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "store",
    data() {
      return {}
    },
    created() {
      this.getStore();
    },
    methods: {
      getStore() {
        let url = this.$common.baseUrl + '/car/source/getAllStore'
        this.$axios.post(url)
          .then(function (res) {
            console.log(res);
          })
      }
    }
  }
</script>

<style scoped lang='less'>
  @import 'store';
</style>
