import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'

Vue.use(Router)

Vue.prototype.$axios = axios

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
      path: '/lv0',
      name: 'lv0',
      component: () => import('./views/lv0')
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('./views/lv1')
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('./views/lv2')
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('./views/lv3')
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
      path: '/page',
      name: '페이지',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/header',
      name: '헤더',
      component: () => import('./views/header.vue'),
      beforeEnter: (to, from, next) => {
        // console.log('to', to)
        // console.log('from', from)
        // next('/sign')
        if (!localStorage.getItem('token')) return next('/block')
        next()
      }
    },
    {
      path: '/sign',
      name: '로그인 페이지',
      component: () => import('./views/sign.vue')
    },
    {
      path: '/block',
      name: '로그인 정보 없을시 차단 페이지',
      component: () => import('./views/block.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
