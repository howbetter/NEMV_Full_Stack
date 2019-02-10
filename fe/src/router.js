import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('./views/Help.vue')
    },
    {
      path: '/user',
      name: '사용자',
      component: () => import('./views/User.vue')
    },
    {
      path: '/header',
      name: '헤더',
      component: () => import('./views/header.vue')
    },
    {
      path: '/sign',
      name: '로그인 페이지',
      component: () => import('./views/sign.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
