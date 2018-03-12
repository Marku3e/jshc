<template>
  <div id="stroe">
    <div class="list">
      <div class="detail" v-for="item in storeList">
        <div class="top">
          <h4>{{item.name}}</h4>
          <p>{{item.address}}</p>
          <!--<p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊123</p>-->

        </div>
        <div class="down">
          <div class="map" @click=map(item.lat,item.lon)>
            <span class='iconfont icon-map'></span>地图
          </div>
          <div class="call" @click='call(item.phone)'>
            <span class='iconfont icon-dianhua'></span>电话
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "store",
    data() {
      return {
        storeList: [],
      }
    },
    created() {
      this.getStore();
    },
    methods: {
      getStore() {
        let url = this.$common.baseUrl + '/car/source/wx/getAllStore'
        const that = this
        this.$axios.post(url)
          .then(function (res) {
            console.log(res);
            that.storeList = res.data.data
          })
        // http://uri.amap.com/marker?position=116.473195,39.993253
      },
      call(num) {
        // console.log(num);
        window.location.href = "tel:" + num;
      },
      map(lat, lon) {
        console.log(lat + "----" + lon);
        window.location.href = 'http://uri.amap.com/marker?position=' + lon + ',' + lat + ''
      }
    }
  }
</script>

<style scoped lang='less'>
  @import 'store';
</style>
