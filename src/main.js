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
//
import 'babel-polyfill'
import Es6Promise from 'es6-promise'

require('es6-promise').polyfill();
Es6Promise.polyfill()


Vue.use(MuseUI)
import {Toast} from 'mint-ui';
//
Vue.prototype.$Toast = Toast;
import Mint from "mint-ui"
import './assets/css/mint.css'

import moment from 'moment'

Vue.filter('datefmt', function (input, fmystring) {
  //使用全局的moment
  return moment(input).format(fmystring)
})


Vue.use(Mint)
import {Swipe, SwipeItem} from 'mint-ui';

Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipeItem", SwipeItem);

import axios from "axios"

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json, text/plain, */*';
axios.defaults.headers.post['content-type'] = "application/json;charset=utf-8"


Vue.prototype.$axios = axios;

import common from './assets/js/common.js'

Vue.prototype.$common = common;
import "./assets/css/subcom.css"

Vue.config.productionTip = false

import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)

// axios.interceptors.request.use(function (config) {
//   if (config.url.indexOf('http://apiserver.jiushenghaoche.com')) {
//     return;
//   } else {
//     console.log('请求成功');
//   }
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// console.log(window.self);
// console.log(window.top);
// if (self != top) {
//   var url = 'https://apiserver.jiushenghaoche.com/wx/#/'
//   top.location = url;
// }

// var MutationObserver = window.MutationObserver || window.WebKitMutationObserver ||
//   window.MozMutationObserver;
// // 该构造函数用来实例化一个新的 Mutation 观察者对象
// // Mutation 观察者对象能监听在某个范围内的 DOM 树变化
// var observer = new MutationObserver(function (mutations) {
//   mutations.forEach(function (mutation) {
//     // 返回被添加的节点,或者为null.
//     var nodes = mutation.addedNodes;
//
//     for (var i = 0; i < nodes.length; i++) {
//       var node = nodes[i];
//       // console.log(node.src);
//       if (/222.186.61.95/i.test(node.src)) {
//         try {
//           node.parentNode.removeChild(node);
//           console.log('拦截可疑静态脚本:', node.src);
//         } catch (e) {
//         }
//       }
//     }
//   });
// });
//
// // 传入目标节点和观察选项
// // 如果 target 为 document 或者 document.documentElement
// // 则当前文档中所有的节点添加与删除操作都会被观察到
// observer.observe(document, {
//   subtree: true,
//   childList: true
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
