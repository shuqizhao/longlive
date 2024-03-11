import { configure, start, done } from 'nprogress'
import 'nprogress/nprogress.css'

import router from './router'
import { getToken } from './utils/auth'

configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // cancel axios request
  if (Array.isArray(window.axiosCancelTokenList)) {
    window.axiosCancelTokenList.forEach((e) => e('cancel request'))
    window.axiosCancelTokenList = []
  }
  // start progress bar
  start()
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      done()
    } else {
      const routes = router.getRoutes().filter((r) => r.path === to.path)

      if (routes.length) {
        // Permission filtering
        const toRoute = routes[0]
        if (toRoute.meta) {
          next()
        } else {
          next('/401')
        }
      } else {
        // Otherwise jump to 404
        if (to.path.includes('redirect')) return next()
        else next('/404')
      }
    }
  }
  if (!hasToken) {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
      done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  done()
})
