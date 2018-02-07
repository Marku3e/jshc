<template>
  <div id="home">
    <!--通用头部-->
    <s_header></s_header>
    <div class="filter">
      <ul class="filter_list">
        <li>5万以下</li>
        <li>5-10万</li>
        <li>10-20万</li>
        <li>20万以上</li>
        <li>首付1万</li>
        <li>超低月供</li>
        <li>起亚</li>
        <li>雪佛兰</li>
        <li>日产</li>
        <li>福特</li>
        <li>大众</li>
        <li>别克</li>
      </ul>
    </div>
    <div class="b_line"></div>
    <div class="car_list">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="newcar" title="新车"/>
        <mu-tab value="usedcar" title="二手车"/>
      </mu-tabs>
      <div v-if="activeTab === 'newcar'" class='newcarMsg'>
        <div class="car_msg">
          <div class="car_img fl">
            <img src="" alt="">
          </div>
          <div class="car_detail">
            <h6></h6>
            <p class="car_title"></p>
            <p class="car_time"></p>
            <p class="car_pay">
              <span class='b'></span>&nbsp;
              <span></span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'usedcar'">
        <h2>Tab Two</h2>
        <p>
          这是第二个 tab
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import s_header from "../subcom/header"

  export default {
    name: "home",
    components: {
      s_header
    },
    data() {
      return {
        activeTab: "newcar",
        list: [],
        usedList: []
      }
    },
    created() {
      this.getNewcar();
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val
      },
      getNewcar() {
        let url = this.$common.baseUrl + "/car/source/getCarPriceList";
        let data = {
          size: 5,
          page: 1,
          orderType: 1,
          isNewCar: true

        }
        this.$axios.post(url, data)
          .then(function (res) {
            console.log(res);
            if (res.status == 200) {
              this.list = res.data.list
              console.log(res.data.list);
            }
          })
          .catch(function (err) {
            console.log(err);
          });

      }
    }
  }
</script>

<style scoped lang='less'>
  @import "home";

</style>
