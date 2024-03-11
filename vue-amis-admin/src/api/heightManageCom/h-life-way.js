import request from '@/utils/request'
import { domain } from '@/utils/config'

// [生活方式记录]->列表
export function lifeStyletList(data, pages) {
  return request({
    url: domain + '/lifeStyle/list',
    method: 'post',
    data,
    pages
  })
}

// [生活方式记录]->新增
export function addLifeStyle(data) {
  return request({
    url: domain + '/lifeStyle/add',
    method: 'post',
    data
  })
}

// [生活方式记录]->编辑
export function updateLifeStyle(data) {
  return request({
    url: domain + '/lifeStyle/update',
    method: 'put',
    data
  })
}

// [生活方式记录]->根据uid获取生活方式记录
export function lifeStyleDetail(lifeStyleUid) {
  return request({
    url: domain + '/lifeStyle/' + lifeStyleUid,
    method: 'get'
  })
}

// [生活方式记录]->删除
export function deleteLifeStyleBaseUid(lifeStyleUid) {
  return request({
    url: domain + '/lifeStyle/delete/' + lifeStyleUid,
    method: 'put'
  })
}

// [生活方式记录]->修改总体评估和建议
export function updateTotalEvaluate(data) {
  return request({
    url: domain + '/lifeStyle/totalEvaluate',
    method: 'put',
    data
  })
}
