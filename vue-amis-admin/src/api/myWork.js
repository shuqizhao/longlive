import request from '@/utils/request'
import { domain } from '@/utils/config'

// [我的工作]->工作提醒
export function workReminder(currentDate, pages) {
  return request({
    url: domain + '/myWork/workReminder/' + currentDate,
    method: 'post',
    pages
  })
}

// [我的工作]->最近三个月接诊
export function threeMonthsAdmission(pages) {
  return request({
    url: domain + '/myWork/threeMonthsAdmission',
    method: 'post',
    pages
  })
}

// [我的工作]->我接诊的用户
export function myAdmissionCustomer(data) {
  return request({
    url: domain + '/myWork/myAdmissionCustomer',
    method: 'post',
    data
  })
}

// [我的工作]->我开的套餐
export function mySetMealBills(data) {
  return request({
    url: domain + '/myWork/mySetMealBills',
    method: 'post',
    data
  })
}


// [我的工作]->修改密码
export function updatePassword(data) {
  return request({
    url: domain + '/myWork/personalCenter/updatePassword',
    method: 'post',
    data
  })
}
