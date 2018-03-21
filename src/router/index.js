import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import newcar from '@/components/newcar/newcar'
import newdetail from '@/components/newcar/detail'
import useddetail from '@/components/usedcar/detail'
import usedcar from '@/components/usedcar/usedcar'
import newSearch from '@/components/search/newSearch'
import usedSearch from '@/components/search/usedSearch'
import appointment from '@/components/appointment/appointment'
import aboutus from '@/components/aboutus/aboutus'
import login from "@/components/login/login"
import store from "@/components/store/store"
import success from "@/components/login/success"
import youhui from "@/components/youhui/youhui"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: '/wx/',
  routes: [
    {
      path: '', name: 'index', component: home, meta: {title: '好提车'}
    },
    {path: '/home', name: 'home', component: home, meta: {title: '好提车'}},
    {path: '/newcar', name: 'newcar', component: newcar, meta: {title: '新车'}},
    {path: '/newcar/detail/:id', name: 'newdetail', component: newdetail, meta: {title: '好提车'}},
    {path: '/usedcar/detail/:id', name: 'useddetail', component: useddetail, meta: {title: '好提车'}},
    {path: '/usedcar', name: 'usedcar', component: usedcar, meta: {title: '二手车'}},
    {path: '/search/new', name: 'newSearch', component: newSearch, meta: {title: '好提车'}},
    {path: '/search/used', name: 'usedSearch', component: usedSearch, meta: {title: '好提车'}},
    {path: '/appointment', name: 'appointment', component: appointment, meta: {title: '九盛好车'}},
    {path: '/aboutus', name: 'aboutus', component: aboutus, meta: {title: '关于我们'}},
    {path: '/login/:id', name: 'login', component: login, meta: {title: '好提车'}},
    {path: '/store', name: 'store', component: store, meta: {title: '全部门店'}},
    {path: '/success', name: 'success', component: success, meta: {title: '好提车'}},
    {path: '/youhui', name: 'youhui', component: youhui, meta: {title: '优惠车型'}},
  ],

})
