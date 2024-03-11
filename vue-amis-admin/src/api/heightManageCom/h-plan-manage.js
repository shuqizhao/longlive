import request from '@/utils/request'
import { domain } from '@/utils/config'

// [方案设计管理]->方案列表
export function planDesignList(customerUid, pages) {
  return request({
    url: domain + '/planDesign/list/' + customerUid,
    method: 'post',
    pages
  })
}

// [方案设计管理]->新增方案设计
export function addPlanDesign(data) {
  return request({
    url: domain + '/planDesign/add',
    method: 'post',
    data
  })
}

// [方案设计管理]->planDesignUid获取方案设计
export function getPlanDesignInfo(planDesignUid) {
  return request({
    url: domain + '/planDesign/' + planDesignUid,
    method: 'get'
  })
}

// [方案设计管理]->删除方案设计
export function deletePlanDesign(planDesignUid) {
  return request({
    url: domain + '/planDesign/delete/' + planDesignUid,
    method: 'post'
  })
}

// [方案设计管理]->身高生长速度设计新增修改
export function heightGrowthRateDesign(data) {
  return request({
    url: domain + '/planDesign/heightGrowthRateDesign',
    method: 'post',
    data
  })
}

// [方案设计管理]->营养素指导方案新增修改
export function nutrientGuidance(data) {
  return request({
    url: domain + '/planDesign/nutrientGuidance',
    method: 'post',
    data
  })
}

// [方案设计管理]->膳食指导方案新增修改
export function dietaryGuidance(data) {
  return request({
    url: domain + '/planDesign/dietaryGuidance',
    method: 'post',
    data
  })
}

// [方案设计管理]->运动指导方案新增
export function sportsGuidance(data) {
  return request({
    url: domain + '/planDesign/sportsGuidance',
    method: 'post',
    data
  })
}

// [方案设计管理]->运动睡眠指导方案模版
export function guidanceTemplateByType(templateCategory) {
  return request({
    url: domain + '/planDesign/guidanceTemplateByType/' + templateCategory,
    method: 'get'
  })
}

// 根据templateId查询运动睡眠指导方案模版
export function guidanceTemplateById(templateId) {
  return request({
    url: domain + '/planDesign/guidanceTemplateById/' + templateId,
    method: 'get'
  })
}

//[方案设计管理]->睡眠指导方案新增修改
export function sleepGuidance(data) {
  return request({
    url: domain + '/planDesign/sleepGuidance',
    method: 'post',
    data
  })
}

//[方案设计管理]->情绪指导方案新增修改
export function emotionGuidance(data) {
  return request({
    url: domain + '/planDesign/emotionGuidance',
    method: 'post',
    data
  })
}

// [方案设计管理]->发布方案
export function releasePlan(planDesignUid) {
  return request({
    url: domain + '/planDesign/release/' + planDesignUid,
    method: 'post'
  })
}

// [方案设计管理]-> 根据planDesignUid获取总体测评客户基本测评
export function baseOverallReview(planDesignUid) {
  return request({
    url: domain + '/planDesign/baseOverallReview/' + planDesignUid,
    method: 'get'
  })
}

// [方案设计管理]->方案报告保存
export function saveGuidanceReport(data) {
  return request({
    url: domain + '/planDesign/guidanceReport',
    method: 'post',
    data
  })
}
