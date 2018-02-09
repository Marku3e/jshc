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
import demo from  "@/components/demo"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: home},
    {path: '/home', name: 'home', component: home},
    {path: '/newcar', name: 'newcar', component: newcar},
    {path: '/newcar/detail/:id', name: 'newdetail', component: newdetail},
    {path: '/usedcar/detail/:id', name: 'useddetail', component: useddetail},
    {path: '/usedcar', name: 'usedcar', component: usedcar},
    {path: '/search/new', name: 'newSearch', component: newSearch},
    {path: '/search/used', name: 'usedSearch', component: usedSearch},
    {path: '/appointment', name: 'appointment', component: appointment},
    {path: '/aboutus', name: 'aboutus', component: aboutus},
    {path: '/demo', name: 'demo', component: demo},
  ]
})
