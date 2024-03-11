import request from '../utils/request'
import { domain } from '@/utils/config'

// [套餐管理]->列表
export function setMealList(data, pages) {
  return request({
    url: domain + '/setMeal/list',
    method: 'post',
    data,
    pages
  })
}

// [套餐管理]->新增
export function setMealAdd(data) {
  return request({
    url: domain + '/setMeal/add',
    method: 'post',
    data
  })
}

// [套餐管理]->修改
export function setMealUpdate(data) {
  return request({
    url: domain + '/setMeal/update',
    method: 'put',
    data
  })
}

// [套餐管理]->获取套餐信息
export function setMealDetail(setMealId) {
  return request({
    url: domain + '/setMeal/' + setMealId,
    method: 'get'
  })
}

// [套餐管理]->停用启用
export function setMealActive(setMealId, active) {
  return request({
    url: `${domain}/setMeal/${setMealId}/${active}`,
    method: 'put'
  })
}

//[套餐管理]->有效套餐列表
export function validSetMealList(data) {
  return request({
    url: domain + '/setMeal/validSetMealList',
    method: 'post',
    data
  })
}
