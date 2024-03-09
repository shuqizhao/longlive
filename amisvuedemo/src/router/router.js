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
const originalFetch = window.fetch;
 
window.fetch = function() {
  debugger
    console.log('Intercepted fetch call:', arguments);
    return originalFetch.apply(this, arguments);
};

window.onerror = function(message, source, lineno, colno, error) {
  debugger
  console.log('An error occurred:', message);
  console.log('Source:', source);
  console.log('Line:', lineno);
  console.log('Column:', colno);
  console.log('Error object:', error);

  // 可以在这里添加异常信息上报到服务器的代码
  // 例如使用 fetch 发送 error 信息到服务器
  // fetch('/report-error', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         message: message,
  //         source: source,
  //         lineno: lineno,
  //         colno: colno,
  //         error: error
  //     })
  // });
};
export default router