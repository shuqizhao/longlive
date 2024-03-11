import request from '../utils/request'
const domain = '/bdxdoctor-healthkeeper-admin'

// [医院管理]->列表
export function hospitalList(data, pages) {
  return request({
    url: domain + '/hospital/list',
    method: 'post',
    data,
    pages
  })
}

// [医院管理]->新增
export function hospitalAdd(data) {
  return request({
    url: domain + '/hospital/add',
    method: 'post',
    data
  })
}

// [医院管理]->修改
export function hospitalUpdate(data) {
  return request({
    url: domain + '/hospital/update',
    method: 'put',
    data
  })
}

// [医院管理]->获取医院信息
export function hospitalDetail(hospitalId) {
  return request({
    url: domain + '/hospital/' + hospitalId,
    method: 'get'
  })
}

// [医院管理]->启用医院
export function hospitalEnable(hospitalId, active) {
  return request({
    url: domain + '/hospital/' + hospitalId + '/' + active,
    method: 'put'
  })
}

// [医院管理]->所有启用医院信息
export function hospitalActiveList() {
  return request({
    url: domain + '/hospital/active',
    method: 'get'
  })
}
