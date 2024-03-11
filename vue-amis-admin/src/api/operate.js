import request from '../utils/request'

// 登录
export function user_login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 登出
export function user_logout(params) {
  return request({
    url: '/auth/logout',
    method: 'get',
    params
  })
}
