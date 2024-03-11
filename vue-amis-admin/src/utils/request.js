import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { getToken, removeToken, removeRoles, removeName, removeTenantName } from './auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 15000,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    // 如果有token 就携带tokon
    if (token) {
      config.headers['accessToken'] = token
      config.headers['accessSource'] = 'ADMIN'
    }
    if (config.pages) {
      if (config.pages.pageNum) {
        config.headers['pageNum'] = config.pages.pageNum
      }
      if (config.pages.pageSize) {
        config.headers['pageSize'] = config.pages.pageSize
      }
      if (config.pages.orderBy) {
        config.headers['orderBy'] = config.pages.orderBy
      }
    }
    // 加上取消请求
    // config.cancelToken = new axios.CancelToken((cancel) => {
    //   if (Array.isArray(window.axiosCancelTokenList)) {
    //     window.axiosCancelTokenList.push(cancel)
    //   } else {
    //     window.axiosCancelTokenList = [cancel]
    //   }
    // })
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = error.response.data
          setTimeout(() => {
            removeToken()
            removeName()
            removeRoles()
            removeTenantName()
            router.replace({
              path: '/login'
            })
          }, 1000)
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 415:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = error.response.data.msg
          break
        case 501:
          error.message = error.response.data.msg
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = '连接错误' + error.response.status
      }
      ElMessage.error(error.message)
    } else {
      ElMessage.error('网络连接失败，请刷新页面重试')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default service
