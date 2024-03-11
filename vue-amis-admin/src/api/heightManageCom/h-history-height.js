import request from '@/utils/request'
import { domain } from '@/utils/config'

// [历史身高管理]->列表
export function historyHeightList(data, pages) {
  return request({
    url: domain + '/historyHeight/list',
    method: 'post',
    data,
    pages
  })
}

// [历史身高管理]->新增
export function addHistoryHeight(data) {
  return request({
    url: domain + '/historyHeight/add',
    method: 'post',
    data
  })
}

// [历史身高管理]->修改
export function updateHistoryHeight(data) {
  return request({
    url: domain + '/historyHeight/update',
    method: 'put',
    data
  })
}

// [历史身高管理]->根据uid获取历史身高
export function historyHeightDetail(historyHeightUid) {
  return request({
    url: domain + '/historyHeight/' + historyHeightUid,
    method: 'get'
  })
}

// [历史身高管理]->计算生活年龄
export function calculateLifeAge(data) {
  return request({
    url: domain + '/historyHeight/calculateLifeAge',
    method: 'post',
    data
  })
}

// [历史身高管理]->删除
export function deleteHistoryHeightList(historyHeightUid) {
  return request({
    url: domain + '/historyHeight/delete/' + historyHeightUid,
    method: 'put'
  })
}
