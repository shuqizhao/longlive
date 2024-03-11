import request from '../utils/request'
import { domain } from '@/utils/config'

// [项目管理]->列表
export function projectList(data, pages) {
  return request({
    url: domain + '/project/list',
    method: 'post',
    data,
    pages
  })
}

// [项目管理]->新增
export function projectAdd(data) {
  return request({
    url: domain + '/project/add',
    method: 'post',
    data
  })
}

// [项目管理]->修改
export function projectUpdate(data) {
  return request({
    url: domain + '/project/update',
    method: 'put',
    data
  })
}

// [项目管理]->获取项目信息
export function projectDetail(projectId) {
  return request({
    url: domain + '/project/' + projectId,
    method: 'get'
  })
}

// [项目管理]->停用启用
export function projectActive(projectId, active) {
  return request({
    url: `${domain}/project/${projectId}/${active}`,
    method: 'put'
  })
}

// [项目管理]->有效项目列表
export function validProjectList() {
  return request({
    url: domain + '/project/valid',
    method: 'get'
  })
}
