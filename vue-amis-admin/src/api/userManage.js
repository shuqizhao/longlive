import request from '../utils/request'
import { domain } from '@/utils/config'

// [客户管理]->列表
export function customerList(data, pages) {
  return request({
    url: domain + '/customer/list',
    method: 'post',
    data,
    pages
  })
}

// [客户管理]->新增
export function customerAdd(data) {
  return request({
    url: domain + '/customer/add',
    method: 'post',
    data
  })
}

// [客户管理]->修改
export function customerUpdate(data) {
  return request({
    url: domain + '/customer/update',
    method: 'post',
    data
  })
}

// [客户管理]->获取客户信息
export function customerDetail(customerId) {
  return request({
    url: domain + '/customer/detail/' + customerId,
    method: 'get'
  })
}

// [客户管理]->开单
export function drawBill(data) {
  return request({
    url: domain + '/customer/drawBill',
    method: 'post',
    data
  })
}
