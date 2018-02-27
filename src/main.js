// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//
import "./assets/icon/iconfont.css"
//
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
import {Toast} from 'mint-ui';
//
Vue.prototype.$Toast = Toast;
import Mint from "mint-ui"
import './assets/css/mint.css'

Vue.use(Mint)
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipeItem", SwipeItem);

import axios from "axios"

Vue.prototype.$axios = axios;

import common from './assets/js/common.js'

Vue.prototype.$common = common;
import "./assets/css/subcom.css"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
