import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      title: '401'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '我的工作', icon: 'icon-shouye', affix: true }
      },
      {
        path: '/userManage',
        component: () => import('@/views/userManage/index.vue'),
        name: 'UserManage',
        meta: { title: '客户管理', icon: 'icon-zhuhu' }
      },
      {
        path: '/heightEffectManage',
        component: () => import('@/views/heightEffectManage/index.vue'),
        name: 'HeightEffectManage',
        meta: { title: '身高效果列表', icon: 'icon-shengao' }
      },
      {
        path: '/heightEffectManage/heightManageCom',
        component: () => import('@/views/heightEffectManage/heightManageCom.vue'),
        name: 'HeightManageCom'
      },
      {
        path: '/customerStatus',
        component: () => import('@/views/customerStatus/index.vue'),
        name: 'CustomerStatus',
        meta: { title: '客户状态列表', icon: 'icon-status_list' }
      },
      {
        path: '/projectManage',
        component: () => import('@/views/projectManage/index.vue'),
        name: 'ProjectManage',
        meta: { title: '项目管理', icon: 'icon-xiangmuguanli' }
      },
      {
        path: '/setMealManage',
        component: () => import('@/views/setMealManage/index.vue'),
        name: 'SetMealManage',
        meta: { title: '套餐管理', icon: 'icon-taocan' }
      }
    ]
  }
]

export const asyncRoutes = []

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
