import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import newcar from '@/components/newcar/newcar'
import usedcar from '@/components/usedcar/usedcar'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: home},
    {path: '/home', name: 'home', component: home},
    {path: '/newcar', name: 'newcar', component: newcar},
    {path: '/usedcar', name: 'usedcar', component: usedcar},
  ]
})
