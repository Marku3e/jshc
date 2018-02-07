import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import newcar from '@/components/newcar/newcar'
import usedcar from '@/components/usedcar/usedcar'
import newSearch from '@/components/search/newSearch'
import usedSearch from '@/components/search/usedSearch'
import appointment from '@/components/appointment/appointment'
import aboutus from '@/components/aboutus/aboutus'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: home},
    {path: '/home', name: 'home', component: home},
    {path: '/newcar', name: 'newcar', component: newcar},
    {path: '/usedcar', name: 'usedcar', component: usedcar},
    {path: '/search/new', name: 'newSearch', component: newSearch},
    {path: '/search/used', name: 'usedSearch', component: usedSearch},
    {path: '/appointment', name: 'appointment', component: appointment},
    {path: '/aboutus', name: 'aboutus', component: aboutus},
  ]
})
