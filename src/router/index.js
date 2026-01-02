import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Login from '@/views/login'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'category',
        name: 'Category',
        component: Category
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: 'user',
        name: 'User',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: MyOrder
  }
]

const router = new VueRouter({
  routes
})

const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 方式1：直接访问 state（可以，但不推荐）
  // const token = store.state.user.userInfo?.token || ''
  // 方式2：通过 getter（推荐）
  const token = store.getters['user/token']
  console.log(token)
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
