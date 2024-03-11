import axiosInstance from '../utils/axiosUtil'

// 登录
export function user_login(data) {
  return axiosInstance({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 登出
export function user_logout(params) {
  return axiosInstance({
    url: '/auth/logout',
    method: 'get',
    params
  })
}
