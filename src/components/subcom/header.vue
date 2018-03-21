<template>
  <div class="header">
    <div class="city" @click="openCity()">
      <i>{{provname}}</i>
      <span class='iconfont icon-down1'></span>
    </div>
    <router-link class="search" :to="'search/new'">
      <span class='iconfont icon-search '></span>
      <!--<i>想买什么车？</i> -->
      <i>{{searchKey||'想买什么车?'}}</i>
    </router-link>
    <div class="option">
      <span label="undocked drawer" @click="toggle(true)" class='iconfont icon-bars'></span>
      <mu-drawer right :open="open1" :docked="docked" @close="toggle()">
        <ul @itemClick="docked ? '' : toggle()" class='menu'>
          <li>
            <router-link :to="'/'">首页</router-link>
          </li>
          <li>
            <router-link :to="{path:'/newcar',query:{isNewCar:true,size:10,page:1,orderType:1,cityId:18}}">买新车
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/usedcar',query:{isNewCar:false,size:10,page:1,orderType:1,cityId:18}}">买二手车
            </router-link>
          </li>
          <div class="bb"></div>
          <li>
          <router-link :to="{path:'/youhui',query:{size:10,page:1,orderType:1,isPreferential:true}}">优惠车型</router-link>
          </li>
          <li>
            <router-link :to="'/appointment'">我要提车</router-link>
          </li>
          <li>
            <router-link :to="'/aboutus'">关于九盛好车</router-link>
          </li>
          <div class="bb"></div>
        </ul>
      </mu-drawer>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :modal=false>
      <div class="c-header" v-show=!open2>
        <span class="iconfont icon-back" @click='hidebox()'></span>
        选择地区
      </div>
      <div class="c-body">
        <mt-index-list>
          <mt-index-section index="*">
            <div @click="getcity('全国',null)">
              <mt-cell title="全国"></mt-cell>
            </div>
          </mt-index-section>
          <div v-for='(item,index) in provlist'>
            <mt-index-section :index="item.initial">
              <div @click="picker($event,item.list[0].prov_id)" :cityid="item.list[0].prov_id" label="toggle drawer">
                <mt-cell :title="item.list[0].prov_name"></mt-cell>
              </div>
              <div class='c-bb' v-if=item.list[1]></div>
              <div @click="picker($event,item.list[1].prov_id)" :cityid="item.list[1].prov_id" v-if=item.list[1]
                   label="toggle drawer">
                <mt-cell :title="item.list[1].prov_name"></mt-cell>
              </div>
              <div class='c-bb' v-if=item.list[2]></div>
              <div @click="picker($event,item.list[2].prov_id)" :cityid="item.list[2].prov_id" v-if=item.list[2]
                   label="toggle drawer">
                <mt-cell :title="item.list[2].prov_name" v-if=item.list[2]></mt-cell>
              </div>
              <div class='c-bb' v-if=item.list[3]></div>
              <div @click="picker($event,item.list[3].prov_id)" :cityid="item.list[3].prov_id" v-if=item.list[3]
                   label="toggle drawer">
                <mt-cell :title="item.list[3].prov_name" v-if=item.list[3]></mt-cell>
              </div>
              <div class='c-bb' v-if=item.list[4]></div>
              <div @click="picker($event,item.list[4].prov_id)" :cityid="item.list[4].prov_id" v-if=item.list[4]
                   label="toggle drawer">
                <mt-cell :title="item.list[4].prov_name" v-if=item.list[4]></mt-cell>
              </div>
              <div class='c-bb' v-if=item.list[5]></div>
              <div @click="picker($event,item.list[5].prov_id)" :cityid="item.list[5].prov_id" v-if=item.list[5]
                   label="toggle drawer">
                <mt-cell :title="item.list[5].prov_name" v-if=item.list[5]></mt-cell>
              </div>
              <div class='c-bb' v-if=item.list[6]></div>
              <div @click="picker($event,item.list[6].prov_id)" :cityid="item.list[6].prov_id" v-if=item.list[6]>
                <mt-cell :title="item.list[6].prov_name" v-if=item.list[6]></mt-cell>
              </div>
            </mt-index-section>
          </div>
        </mt-index-list>
      </div>
      <mu-drawer right :open="open2" class='drawer'>
        <div class="c-title">{{titlename}}</div>
        <ul class='c-list'>
          <li>全省</li>
          <p>{{titlename}}</p>
          <li v-for="(city,index) in citylist" @click='getcity(city.city_name,city.city_id)'>{{city.city_name}}</li>
        </ul>
      </mu-drawer>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        popupVisible: false,
        open1: false,
        open2: false,
        docked: true,
        provlist: [],
        citylist: [],
        provname: '武汉',
        titlename: '',
        searchKey: '',
      }
    },
    created() {
      console.log(this.$route.query);
      this.searchKey = this.$route.query.searchKey
      this.provname = localStorage.getItem("cityname") || "武汉"
    },
    methods: {
      getcity(name, id) {
        console.log(id);
        console.log(name);
        localStorage.setItem("cityname", name);
        this.$router.push({
          path: '/newcar',
          query: {
            "isNewCar": true,
            "size": '10',
            "page": '1',
            "cityId": id,
            "orderType": '1',
          }
        })
        this.popupVisible = false
      },
      demo: function () {
        console.log(123);
      },
      picker: function (event, id) {
        // this.open2 = true;
        console.log(id);
        let url = this.$common.baseUrl + '/car/basic/getCitysByProvId'
        this.$axios.post(url + '?provId=' + id + '').then(res => {
          console.log(res.data.data[0])
          this.titlename = res.data.data[0].prov_name
          console.log(this.provname);
          if (res.data.data[1]) {
            this.open2 = true;
            this.citylist = res.data.data;
          } else {
            this.open2 = false
            localStorage.setItem("cityname", res.data.data[0].prov_name)
            // let url = this.$common.baseUrl + '/car/source/wx/getCarPriceList'
            // this.$axios.post(url + '?isNewCar=true&size=5&page=1&provId=' + id + '&orderType=1').then(res => {
            //   console.log(res);
            // })
            this.$router.push({
              path: '/newcar',
              query: {
                "isNewCar": true,
                "size": '10',
                "page": '1',
                "cityId": id,
                "orderType": 1,
              }
            })
            this.popupVisible = false
          }
        })
      },
      hidebox: function () {
        this.popupVisible = false
      },
      toggle(flag) {
        this.open1 = !this.open1
        this.docked = !flag
      },
      openCity() {
        this.popupVisible = !this.popupVisible
        let url = this.$common.baseUrl + '/car/source/wx/getAreaList'
        this.$axios.post(url)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              console.log(res.data.data[0]);
              this.provlist = res.data.data;

            }
          })
      },
    }
  }
</script>

<style scoped lang='less'>
  @import "header";

</style>
