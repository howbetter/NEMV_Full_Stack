import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// import Home from './views/Home.vue'

Vue.use(Router)
Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// axios 인터셉트 기능으로 요청시 토큰을 확인하는 미들웨어의 기능을 함.
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const token = response.data.token
  if (token) {
    console.log(token)
    localStorage.setItem('token', response.data.token)
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  // return next()
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      next(`/block/${e.message}`)
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'boardAnyone',
      component: () => import('./views/board/anyone'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv0',
      name: 'lv0',
      component: () => import('./views/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('./views/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('./views/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('./views/lv3'),
      beforeEnter: pageCheck
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
      component: () => import('./views/User.vue'),
      beforeEnter: pageCheck
    },
    {
      path: '/page',
      name: '페이지',
      component: () => import('./views/Page.vue'),
      beforeEnter: pageCheck
    },
    {
      path: '/site',
      name: '사이트',
      component: () => import('./views/site.vue'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/boards',
      name: 'manageBoards',
      component: () => import('./views/manage/boards'),
      beforeEnter: pageCheck
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
      path: '/register',
      name: '회원가입',
      component: () => import('./views/register.vue')
    },
    {
      // 뷰 라우터에서 지원하는 동적 라우트 매칭
      path: '/block/:msg',
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
