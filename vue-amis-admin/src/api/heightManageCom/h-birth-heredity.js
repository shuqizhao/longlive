import request from '@/utils/request'
import { domain } from '@/utils/config'

// [身高效果管理]->出生&遗传信息保存
export function saveBirthGenetics(data) {
  return request({
    url: domain + '/setMealBill/birthGenetics',
    method: 'post',
    data
  })
}

// [身高效果管理]->根据开单Uid获取出生&遗传信息
export function getBirthGenetics(customerUid) {
  return request({
    url: domain + '/setMealBill/birthGenetics/' + customerUid,
    method: 'get'
  })
}

// [身高效果管理]->计算潜能身高
export function calculatePotentialHeight(data) {
  return request({
    url: domain + '/setMealBill/calculatePotentialHeight',
    method: 'post',
    data
  })
}

// [身高效果管理]->算法定制接口
export function getHeightCustomization(data) {
  return request({
    url: domain + '/setMealBill/getHeightCustomization',
    method: 'post',
    data
  })
}