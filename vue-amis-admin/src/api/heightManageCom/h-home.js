import request from '@/utils/request'
import { domain } from '@/utils/config'

// [身高效果管理]->获取身高管理信息
export function getSetMealBillInfo(setMealBillUid) {
  return request({
    url: domain + '/setMealBill/' + setMealBillUid,
    method: 'get'
  })
}

// [身高效果管理]->查询所有提醒
export function getAllReminds(setMealBillUid) {
  return request({
    url: domain + '/setMealBill/reminds/' + setMealBillUid,
    method: 'get'
  })
}

// [身高效果管理]->添加提醒
export function addRemind(data) {
  return request({
    url: domain + '/setMealBill/addRemind',
    method: 'post',
    data
  })
}

// [身高效果管理]->根据Uid删除提醒
export function deleteRemind(setMealBillRemindUid) {
  return request({
    url: domain + '/setMealBill/deleteRemind/' + setMealBillRemindUid,
    method: 'put'
  })
}

// [身高效果管理]->根据Uid修改提醒
export function updateRemind(data) {
  return request({
    url: domain + '/setMealBill/updateRemind',
    method: 'put',
    data
  })
}

// [身高效果管理]->获取开单所有状态
export function getAllSetMealBillStatus(pages) {
  return request({
    url: domain + '/setMealBill/allSetMealBillStatus',
    method: 'get',
    pages
  })
}

// [身高效果管理]->添加状态
export function addSetMealBillStatus(data) {
  return request({
    url: domain + '/setMealBill/addSetMealBillStatus',
    method: 'post',
    data
  })
}

// [身高效果管理]->当前套餐管理内容
export function getSetMealProjects(setMealBillUid, pages) {
  return request({
    url: domain + '/setMealBill/projects/' + setMealBillUid,
    method: 'get',
    pages
  })
}

// [身高效果管理]->执行项目
export function executeProject(data) {
  return request({
    url: domain + '/setMealBill/executeProject',
    method: 'put',
    data
  })
}

// [身高效果管理]->执行项目记录
export function executeProjectRecords(setMealBillProjectUid, pages) {
  return request({
    url: domain + '/setMealBill/executeProjectRecords/' + setMealBillProjectUid,
    method: 'get',
    pages
  })
}


// [身高效果管理]->修改开单有效时间
export function updateSetMealBillExpiredDate(data) {
  return request({
    url: domain + '/setMealBill/updateSetMealBillExpiredDate',
    method: 'post',
    data
  })
}