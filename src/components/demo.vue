<template>
  <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                ref="loadmore">
      <ul class="list" v-for="item in pageList">
        <li>
          <div class='list'>{{item.fullSeriesName}}</div>
        </li>
      </ul>
    </v-loadmore>
  </div>
</template>
<style>
  .list{
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #e5e5e5;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';

  export default {
    data: function () {
      return {

        page: "1",
        size: "5",
        orderType: "1",
        pageList: [],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      }
    },
    components: {
      'v-loadmore': Loadmore
    },
    mounted() {
      this.loadPageList();  //初次访问查询列表
    },
    methods: {
      loadBottom: function () {
        // 上拉加载
        this.more();// 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadPageList: function () {
        // 查询数据
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        this.$axios.post(url + '?isNewCar=true&size=' + this.size + '&page=' + this.page + '&orderType=' + this.orderType + '').then(res => {
          console.log(res);
          this.pageList =res.data.data.list;
          this.$nextTick(function () {
            this.scrollMode = "touch";
          });
        });
      },
      more: function () {
        // 分页查询
        this.page = parseInt(this.page) + 1;
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        this.$axios.post(url + '?isNewCar=true&size=' + this.size + '&page=' + this.page + '&orderType=' + this.orderType + '').then(res => {
          this.pageList = this.pageList.concat(res.data.data.list);
        });
      },

    }
  }
</script>
