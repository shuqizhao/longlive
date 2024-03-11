import request from '@/utils/request'
import { domain } from '@/utils/config'

// [客户状态列表]->身高客户状态列表
export function customerStatusList(data, pages) {
  return request({
    url: domain + '/setMealBill/customerStatusList',
    method: 'post',
    data,
    pages
  })
}

// [客户状态列表]->身高管理效果列表
export function heightEffectList(data, pages) {
  return request({
    url: domain + '/setMealBill/heightEffectList',
    method: 'post',
    data,
    pages
  })
}

// [客户状态列表]->客户状态列表导出
export function customerStatusListExport(data) {
  return request({
    url: domain + '/setMealBill/customerStatusListExport',
    method: 'post',
    responseType: 'blob',
    data
  })
}

// [套餐管理]->身高管理效果列表导出
export function heightEffectListExport(data) {
  return request({
    url: domain + '/setMealBill/heightEffectListExport',
    method: 'post',
    responseType: 'blob',
    data
  })
}