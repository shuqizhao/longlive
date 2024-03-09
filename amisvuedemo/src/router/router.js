import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'

import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    // name: 'Layout',
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
  const token = Cookies.get('access_token')

  if (to.name !== 'Login' && !token) {
    // 如果用户未登录且试图访问非登录页面，重定向到登录页面  
    next({ name: 'Login' })
  } else {
    next()
  }
})

// // 拦截所有的fetch请求
// window.addEventListener('fetch', event => {
//   const { request } = event;

//   // 拦截并处理响应
//   event.respondWith(
//     fetch(request).then(response => {
//       debugger;
//       // 这里可以对响应结果做全局处理
//       // 例如，检查状态码，添加通用的头部信息等
//       // 然后返回修改后的响应或原始响应
//       return response;
//     }).catch(error => {
//       // 这里可以处理请求失败的情况
//       // 返回一个新的Response对象或抛出错误
//       console.error('Fetch error:', error);
//       throw error;
//     })
//   );
// });
export default router