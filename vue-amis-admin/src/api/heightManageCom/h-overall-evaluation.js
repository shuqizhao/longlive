import request from '@/utils/request'
import { domain } from '@/utils/config'

// [总体测评]->根据客户Uid获取总体测评客户基本测评
export function overallReviewInfo(customerUid) {
  return request({
    url: domain + '/overallReview/' + customerUid,
    method: 'get'
  })
}

// [总体测评]->根据客户uid查询全部套餐
export function allSetMealBillByCustomerUid(customerUid) {
  return request({
    url: domain + '/overallReview/allSetMealBillByCustomerUid/' + customerUid,
    method: 'get'
  })
}

// [总体测评]->生长发育数据统计
export function growthDevelopmentStatistics(customerUid, setMealBillUid) {
  return request({
    // url: domain + '/overallReview/growthDevelopmentStatistics?customerUid=' + customerUid,
    url: `${domain}/overallReview/growthDevelopmentStatistics?customerUid=${customerUid}&setMealBillUid=${setMealBillUid}`,
    method: 'get'
  })
}

// [总体测评]->遗传身高&实测身高曲线图
export function geneticsMeasuredHeight(customerUid, setMealBillUid) {
  return request({
    url: `${domain}/overallReview/geneticsMeasuredHeight?customerUid=${customerUid}&setMealBillUid=${setMealBillUid}`,
    method: 'get'
  })
}

// [总体测评]->骨龄对应身高生长情况
export function boneAgeHeightGrowth(customerUid) {
  return request({
    url: domain + '/overallReview/boneAgeHeightGrowth/' + customerUid,
    method: 'get'
  })
}

// [总体测评]->保存个性、季度、年度评估报告
export function saveEvaluationReport(data) {
  return request({
    url: domain + '/overallReview/evaluationReport',
    method: 'post',
    data
  })
}

// [总体测评]->查看报告
export function evaluationReport(customerUid, pages) {
  return request({
    url: domain + '/overallReview/evaluationReport/' + customerUid,
    method: 'get',
    pages
  })
}

// [总体测评]->删除评估报告
export function deleteReport(evaluationReportUid) {
  return request({
    url: domain + '/overallReview/evaluationReport/' + evaluationReportUid,
    method: 'delete'
  })
}

// [总体测评]->身高体重数值表
export function weightHeightPercentile(customerUid) {
  return request({
    url: domain + '/overallReview/weightHeightPercentile?customerUid=' + customerUid,
    method: 'get'
  })
}

// [总体测评]->身高体重数值概要表
export function weightHeightPercentileSummary(customerUid) {
  return request({
    url: domain + '/overallReview/weightHeightPercentileSummary?customerUid=' + customerUid,
    method: 'get'
  })
}

// [总体测评]->身高曲线图、体重曲线图、BMI曲线图
export function heightWeightBmiChart(customerUid, setMealBillUid) {
  return request({
    url: `${domain}/overallReview/heightWeightBmiChart?customerUid=${customerUid}&setMealBillUid=${setMealBillUid}`,
    method: 'get'
  })
}


// [总体测评]->个性化身高评估信息_0-18岁儿童青少年身高百分位数值表
export function heightPercentileByAge(data) {
  return request({
    url: domain + '/overallReview/heightPercentileByAge',
    method: 'post',
    data
  })
}