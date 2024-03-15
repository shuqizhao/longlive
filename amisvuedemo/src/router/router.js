import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/circle.vue'
import Layout from '@/views/Layout.vue'

import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'icon-shouye', affix: true }
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        name: 'User',
        meta: { title: '用户管理', icon: 'icon-shouye' }
      }, {
        path: '/settings',
        component: () => import('@/views/setting/index.vue'),
        name: 'Setting',
        meta: { title: '设置', icon: 'icon-shouye' }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  // 其他路由...  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')

  if (to.name !== 'Login' && !token) {
    // 如果用户未登录且试图访问非登录页面，重定向到登录页面  
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router