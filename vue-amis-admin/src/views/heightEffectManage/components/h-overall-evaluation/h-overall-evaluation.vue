<template>
  <div class="overall" v-loading="regionLoading" element-loading-custom-class="my-loading">
    <div v-show="activeName === 'first'">
      <div class="ta-right">
        <el-button class="btn" type="primary" @click="handleLookReport">查看报告</el-button>
        <el-button class="btn" type="primary" @click="handleHeightEstimate" :disabled="isCloseStatus"
          >个性化身高评估</el-button
        >
        <el-button class="btn" type="primary" @click="handleCreateReport" :disabled="isCloseStatus"
          >生成效果评估报告</el-button
        >
      </div>
      <div class="content-box">
        <div class="i-panel">
          <div class="form-row">
            <div class="form-group left-col">
              <tableExpected
                :expectedInfo="userData.dataInfo"
                :currentInfo="userData.currentInfo"
                :customerObj="customerObj"
                :boneAgeFlag="userData.boneAgeFlag"
                :boneAgeInfo="userData.boneAgeInfo"
              />
            </div>
            <div class="form-group right-col">
              <tableAchieve
                :overInfo="userData.dataInfo"
                :currentInfo="userData.currentInfo"
                :boneAgeFlag="userData.boneAgeFlag"
                :boneAgeInfo="userData.boneAgeInfo"
              />
            </div>
          </div>
        </div>
        <div class="i-panel">
          <div class="form-row">
            <div class="form-group left-col">
              <tableCurrent :expectedInfo="userData.dataInfo" :currentInfo="userData.currentInfo" />
            </div>
            <div class="form-group right-col">
              <echartPrediction
                :fourFlag="fourFlag"
                :heightCompareBar="userData.heightCompareBar"
                :expectHeight="userData.dataInfo.expectHeight"
                v-if="userData.heightCompareBar.length"
              />
            </div>
          </div>
        </div>
        <div class="i-panel">
          <div class="form-row">
            <div class="form-group left-col">
              <!-- 遗传情况 -->
              <tableHeredity
                :heredityInfo="userData.dataInfo"
                :lastGenNum="userData.lastGenNum"
                :lastShice="userData.lastShice"
              />
            </div>
            <div class="form-group right-col">
              <!-- 遗传身高&实测身高曲线图 -->
              <echartHeredity
                :geneticsAndshiceData="userData.geneticsAndshiceData"
                v-if="userData.geneticsAndshiceData.length"
              />
            </div>
          </div>
        </div>
        <div class="i-panel" >
          <div class="form-row">
            <div class="form-group left-col">
              <!-- 骨龄评价 -->
              <tableBoneAge
                :expectedInfo="userData.dataInfo"
                :boneAgeFlag="userData.boneAgeFlag"
                :boneAgeInfo="userData.boneAgeInfo"
                v-if="userData.boneAgeInfo.boneAge"
              />
            </div>
            <div class="form-group right-col">
              <!-- 骨龄对应身高生长情况 -->
              <echartBoneAge
                :heightData="userData.heightData"
                :boneAgeData="userData.boneAgeData"
                v-if="userData.heightData.length && userData.boneAgeData.length"
              />
            </div>
          </div>
        </div>
        <!-- 当前第一条（currentInfo）有骨龄才显示 -->
        <!-- 达到期望身高所需要的阶段性目标 -->
        <div class="i-panel" v-show="targetShow">
          <table border="1">
            <tr>
              <th colspan="4">达到期望身高所需要的阶段性目标</th>
            </tr>
            <tr>
              <td width="50%">
                <tableTargetStage
                  :overInfo="userData.dataInfo"
                  :currentInfo="userData.currentInfo"
                  :boneAgeInfo="userData.boneAgeInfo"
                />
              </td>
              <td width="50%" style="vertical-align: top">
                <tableTargetWayOne
                  :overInfo="userData.dataInfo"
                  :currentInfo="userData.currentInfo"
                  :boneAgeInfo="userData.boneAgeInfo"
                  v-show="showWayOne"
                />
                <tableTargetWayTwo
                  :overInfo="userData.dataInfo"
                  :currentInfo="userData.currentInfo"
                  :boneAgeInfo="userData.boneAgeInfo"
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="card-list">
          <b>生长发育数据统计</b>
          <div
            class="card-item"
            v-for="(item, index) in setMealBillData.setMealList"
            :key="item.setMealBillUid"
            @click="itemClick(item, index)"
            :class="{ active: activeIndex === index }"
          >
            <b>
              <span v-if="index === 0">（当前套餐）</span>
              {{ item.setMealName }}
            </b>
            <div>{{ item.expiredStartDate }} 至 {{ item.expiredEndDate }}</div>
          </div>
          <div class="card-item flex-align-center plr-20" @click="clickAll" :class="{ active: activeIndex === -1 }">
            <b>全部</b>
          </div>
        </div>
        <div class="i-panel statistics-item" v-if="statisticsData.sexualData.length">
          <tableStatisticsSexual :customerObj="customerObj" :sexualData="statisticsData.sexualData" />
        </div>
        <div class="i-panel statistics-item" v-if="statisticsData.boneAgesIncreased.length">
          <tableStatisticsBoneAge
            :bonAgeList="statisticsData.boneAgesIncreased"
            :overInfo="stateObj.overInfo"
            :boneAgeInfo="stateObj.boneAgeInfo"
            :fourFlag="fourFlag"
          />
        </div>
        <div class="i-panel statistics-item" v-if="statisticsData.heightGrowths.length">
          <tableStatisticsHeight :heightGrowths="statisticsData.heightGrowths" />
        </div>
        <div class="i-panel statistics-item" v-if="!showStatus">
          <tableStatisticsRecent :recentDevelopment="statisticsData.recentDevelopment" />
        </div>
        <div class="i-panel statistics-item" v-if="!showStatusOneYear">
          <TableStatisticsRecentOneYear :recentOneYearDevelopment="statisticsData.recentOneYearDevelopment" />
        </div>
        <!-- 最下面3曲线 -->
        <div class="i-panel">
          <div class="form-row">
            <div class="form-group col-w33">
              <echartCurveHeight
                v-if="userData.chartPerData.length"
                :chartPerData="userData.chartPerData"
                :heightWeightBmiData="userData.heightWeightBmiData"
              />
            </div>
            <div class="form-group col-w33">
              <echartCurveWeight
                v-if="userData.chartPerData.length"
                :chartPerData="userData.chartPerData"
                :heightWeightBmiData="userData.heightWeightBmiData"
              />
            </div>
            <div class="form-group col-w33">
              <echartCurveBmi
                v-if="userData.chartPerData.length"
                :chartPerData="userData.chartPerData"
                :heightWeightBmiData="userData.heightWeightBmiData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看报告 -->
    <div class="modal-content" v-show="activeName === 'second'">
      <div class="modal-header">
        <div class="title-left">查看报告</div>
        <el-button @click="handleBack">返回</el-button>
      </div>
      <reportListCom class="modal-body" ref="reportListRef" />
    </div>
    <!-- 个性化评估 -->
    <div class="modal-content" v-show="activeName === 'three'">
      <div class="modal-header border-b">
        <div class="title-left">个性化身高评估</div>
        <el-button @click="handleBack">返回</el-button>
      </div>
      <heightEstimate
        class="modal-body"
        ref="estimateRef"
        :currentInfo="userData.currentInfo"
        :boneAgeInfo="userData.boneAgeInfo"
        :overInfo="userData.dataInfo"
        :chartPerData="userData.chartPerData"
        :eighteenAgeOfArr="userData.eighteenAgeOfArr"
        :heightWeightBmiData="userData.heightWeightBmiData"
      />
    </div>

    <!-- 年度/季度评估报告 -->
    <div
      class="modal-content"
      v-if="activeName === 'four'"
    >
      <div class="modal-header border-b">
        <div class="title-left">效果评估报告</div>
        <el-button @click="handleBack">返回</el-button>
      </div>
      <div class="modal-body">
        <div class="main-view" id="effectPdf" style="position: relative; overflow: hidden">
          <div class="main-title">{{ userData.reportTitle }}效果评估报告</div>
          <table border="1" class="item">
            <tr>
              <td>姓名：{{ customerObj.customerName }}</td>
              <td>性别：{{ sexFilter(customerObj.sex) }}</td>
              <td>年龄：{{ customerObj.ageStr }}</td>
              <td>诊断日期：{{ customerObj.currentTime }}</td>
            </tr>
          </table>
          <table border="1" class="item" style="width: 100%; margin-top: 5px">
            <tr>
              <th colspan="4">期望身高</th>
            </tr>
            <tr>
              <td class="w-140 text-right pr-1">期望身高</td>
              <td>{{ userData.dataInfo.expectHeight }}</td>
              <td class="w-140 text-right pr-1">百分位</td>
              <td>{{ userData.dataInfo.expectHeightPercent }}</td>
            </tr>
            <tr>
              <td colspan="4">当前身高和期望身高的差值：{{ diffHeight }}cm</td>
            </tr>
          </table>
          <div class="item">
            <tableTargetReport
              :overInfo="userData.dataInfo"
              :currentInfo="userData.currentInfo"
              :boneAgeInfo="userData.boneAgeInfo"
            />
          </div>
          <table border="1" class="item" cellpadding="3" style="width: 100%; margin: 5px 0">
            <tr>
              <th colspan="5">当前身高情况</th>
            </tr>
            <tr>
              <td style="width: 110px">测量时间</td>
              <td style="width: 140px">{{ userData.currentInfo.addTime }}</td>
              <td style="width: 110px">生活年龄</td>
              <td style="width: 100px">{{ userData.currentInfo.lifeAge }}</td>
              <td rowspan="8" style="vertical-align: top; text-align: left">
                <echartPrediction
                  :fourFlag="fourFlag"
                  :heightCompareBar="userData.heightCompareBar"
                  :expectHeight="userData.dataInfo.expectHeight"
                  v-if="userData.heightCompareBar.length"
                />
              </td>
            </tr>
            <tr>
              <td>目前身高(cm)</td>
              <td>{{ userData.currentInfo.currentHeight }}</td>
              <td>百分位</td>
              <td>{{ userData.currentInfo.heightPercent }}</td>
            </tr>
            <tr>
              <td>目前体重(kg)</td>
              <td>{{ userData.currentInfo.currentWeight }}</td>
              <td>百分位</td>
              <td>{{ userData.currentInfo.weightPercent }}</td>
            </tr>
            <tr v-if="userData.currentInfo.boneAge">
              <td>当前骨龄</td>
              <td>{{ userData.currentInfo.boneAge }}</td>
              <td
                colspan="2"
                :class="{
                  'color-warning': Number(userData.currentInfo.boneAge) &gt; Number(userData.currentInfo.lifeAge)
                }"
              >
                {{
                  overallBoneAgeFilter(
                    userData.currentInfo.boneAge,
                    userData.currentInfo.lifeAge,
                    customerObj.sex,
                    true
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>BMI</td>
              <td>{{ userData.currentInfo.bmi }}</td>
              <td>百分位</td>
              <td>{{ userData.currentInfo.bmipercent }}</td>
            </tr>
            <tr>
              <td>体形</td>
              <td>
                {{
                  statureFilter(
                    userData.currentInfo.bmipercent,
                    userData.currentInfo.heightPercent,
                    userData.currentInfo.weightPercent
                  )
                }}
              </td>
              <td>腹围(cm)</td>
              <td>{{ userData.currentInfo.abdominal }}</td>
            </tr>
          </table>
          <tableStatisticsSexual
            class="item"
            :customerObj="customerObj"
            :sexualData="statisticsData.sexualData"
            v-if="statisticsData.sexualData.length"
          />
          <div class="item mt-10">
            <tableStatisticsBoneAge
              :bonAgeList="statisticsData.boneAgesIncreased"
              :overInfo="stateObj.overInfo"
              :boneAgeInfo="stateObj.boneAgeInfo"
              :fourFlag="fourFlag"
              :evaluationReportType="evaluationReportType"
              v-if="statisticsData.boneAgesIncreased.length"
            />
          </div>
          <tableStatisticsHeight
            class="item"
            :heightGrowths="statisticsData.heightGrowths"
            v-if="statisticsData.heightGrowths.length"
          />
          <tableStatisticsRecent
            class="item"
            :recentDevelopment="statisticsData.recentDevelopment"
            v-if="!showStatus"
          />
          <TableStatisticsRecentOneYear
            class="item"
            :recentOneYearDevelopment="statisticsData.recentOneYearDevelopment"
            v-if="!showStatusOneYear"
          />
          <div class="item-echarts"></div>
          <div class="item" style="display: flex; flex-wrap: wrap">
            <div class="form-group col-w50 mt-20">
              <echartCurveHeight
                v-if="userData.chartPerData.length"
                :chartPerData="userData.chartPerData"
                :heightWeightBmiData="userData.heightWeightBmiData"
              />
            </div>
            <div class="form-group col-w50 mt-20">
              <echartCurveWeight
                v-if="userData.chartPerData.length"
                :chartPerData="userData.chartPerData"
                :heightWeightBmiData="userData.heightWeightBmiData"
              />
            </div>
            <div class="form-group col-w50 mt-20">
              <echartCurveBmi
                v-if="userData.chartPerData.length"
                :chartPerData="userData.chartPerData"
                :heightWeightBmiData="userData.heightWeightBmiData"
              />
            </div>
            <div class="form-group col-w50 mt-20">
              <echartHeredity
                :geneticsAndshiceData="userData.geneticsAndshiceData"
                v-if="userData.geneticsAndshiceData.length"
              />
            </div>
          </div>
          <table border="1" class="item" cellpadding="3" id="report14" style="width: 100%">
            <tr>
              <th>
                <div class="analysis">
                  <span>近期发育情况分析</span>
                  <el-icon @click="clickEdit"><EditPen /></el-icon>
                </div>
              </th>
            </tr>
            <tr>
              <td>
                <div style="min-height: 180px; white-space: pre-line; line-height: 1.5">
                  {{ userData.lastLifeStyleGrowth.totalEvaluate }}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <el-button
          class="btn"
          type="primary"
          @click="handleSavePdf"
          v-loading.fullscreen.lock="btnLoading"
          element-loading-text="正在导出，请稍后..."
          >保存报告</el-button
        >
      </div>
    </div>

    <!-- 近期发育情况分析 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="近期发育情况分析"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
      width="900px"
      @close="handleCancel"
    >
      <div>
        <el-input v-model="totalEvaluate" type="textarea" :rows="10" placeholder="限500字符" maxlength="500" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSaveTotalEvaluate">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogSetMealVisible"
      title="请选择需要生成报告的套餐"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
      width="500px"
      @close="cancelSetMeal"
    >
      <el-form :model="dialogFormSetMeal" :rules="rules" ref="ruleFormRef">
        <el-form-item label="" prop="setMealType">
          <el-select
            v-model="dialogFormSetMeal.setMealType"
            placeholder="请选择套餐"
            clearable
            style="width: 100%"
            @change="setMealChange"
          >
            <el-option
              v-for="item in setMealBillData.setMealList"
              :key="item.setMealBillUid"
              :label="`${item.setMealName} (${item.expiredStartDate}至${item.expiredEndDate})`"
              :value="item.setMealBillUid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <div v-if="dialogFormSetMeal.setMealType">
            <span
              >当前套餐已管理{{ userData.diffTodayDate }}天，建议生成{{
                userData.diffTodayDate > 365 ? '年度' : '季度'
              }}效果评估报告</span
            >
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createReportQuarter(ruleFormRef)" :loading="regionLoading">季度效果报告</el-button>
          <el-button type="primary" @click="createReportYear(ruleFormRef)" :loading="regionLoading"
            >年度效果报告</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  overallReviewInfo,
  allSetMealBillByCustomerUid,
  growthDevelopmentStatistics,
  weightHeightPercentile,
  weightHeightPercentileSummary,
  geneticsMeasuredHeight,
  boneAgeHeightGrowth,
  heightWeightBmiChart
} from '@/api/heightManageCom/h-overall-evaluation'
import { getHeightCustomization } from '@/api/heightManageCom/h-birth-heredity'
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { updateTotalEvaluate } from '@/api/heightManageCom/h-life-way'
import { EditPen } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as echarts from 'echarts'
import tableExpected from './son-chart/table-expected.vue'
import tableAchieve from './son-chart/table-achieve.vue'
import tableCurrent from './son-chart/table-current.vue'
import echartPrediction from './son-chart/echart-prediction.vue'
import tableHeredity from './son-chart/table-heredity.vue'
import echartHeredity from './son-chart/echart-heredity.vue'
import tableBoneAge from './son-chart/table-boneAge.vue'
import echartBoneAge from './son-chart/echart-boneAge.vue'

import tableTargetStage from '@/components/table-target-stage/index.vue'
import tableTargetWayOne from '@/components/table-target-way-one/index.vue'
import tableTargetWayTwo from '@/components/table-target-way-two/index.vue'
// 生长发育数据统计
import tableStatisticsSexual from './son-chart/table-statistics-sexual.vue'
import tableStatisticsBoneAge from './son-chart/table-statistics-boneAge.vue'
import tableStatisticsHeight from './son-chart/table-statistics-height.vue'
import tableStatisticsRecent from './son-chart/table-statistics-recent.vue'
import TableStatisticsRecentOneYear from './son-chart/table-statistics-recentOneYear.vue'
import echartCurveHeight from './son-chart/echart-curve-height.vue'
import echartCurveWeight from './son-chart/echart-curve-weight.vue'
import echartCurveBmi from './son-chart/echart-curve-bmi.vue'
// 报告类
import reportListCom from './son-report/reportList.vue'
import heightEstimate from './son-report/height-estimate.vue'
import tableTargetReport from './son-chart/table-target-report.vue'
import useCanvasToPdf from '@/hooks/useCanvasToPdf'

import { getDiffDay, isEmptyObject } from '@/utils/util'
import { sexFilter, statureFilter, overallBoneAgeFilter } from '@/utils/filters'
import useGrowthData from '@/hooks/useGrowthData'
import useTableTargetShow from '@/hooks/useTableTargetShow'
import { boy_list, girl_list } from './heightPercentileList'

const emits = defineEmits(['on-jump'])

const customerObj = inject('customerObj')
const customerUid = inject('customerUid')
const setMealBillUid = ref(inject('setMealBillUid'))
const isCloseStatus = inject('isCloseStatus')

const activeName = ref('first')
const reportList = ref([])
const tableLoading = ref(false)
const regionLoading = ref(false)
const reportListRef = ref(null)
const activeIndex = ref(0)
const estimateRef = ref(null)
const evaluationReportType = ref('')
const ruleFormRef = ref(null)

// 去到生成报告评估页状态
const fourFlag = ref(false)
const totalEvaluate = ref('')
const dialogFormVisible = ref(false)
const dialogSetMealVisible = ref(false)

const userData = reactive({
  dataInfo: {},
  currentInfo: {},
  lastLifeStyleGrowth: {},
  heightCompareBar: [], // 预测成年身高和遗传身高对比
  geneticsAndshiceData: [], // 遗传身高&实测身高曲线图
  boneAgeData: [], // 骨龄对应身高生长情况
  heightData: [], // 骨龄背景图数据
  heightWeightBmiData: [],
  chartPerData: [], //百分比曲线
  eighteenAgeOfArr: [], // 个性化中的18岁对应的百分比
  diffTodayDate: '',
  reportTitle: '',
  lastGenNum: null,
  lastShice: null,
  boneAgeFlag: false, //有无骨龄的状态
  boneAgeInfo: {} // 骨龄数据（可能是第一条，可能是第二条）
})

// 和plan中的比较
const stateObj = reactive({
  overInfo: {},
  currentInfo: {},
  boneAgeInfo: {}
})

const setMealBillData = reactive({
  setMealList: []
})

const dialogFormSetMeal = reactive({
  setMealType: ''
})

const rules = reactive({
  setMealType: [{ required: true, message: '请选择套餐', trigger: 'change' }]
})

const showStatus = computed(() => {
  return isEmptyObject(statisticsData.recentDevelopment)
})

const showStatusOneYear = computed(() => {
  return isEmptyObject(statisticsData.recentOneYearDevelopment)
})

const diffHeight = computed(() => {
  return (userData.dataInfo.expectHeight - userData.currentInfo.currentHeight).toFixed(1)
})

// 根据客户Uid获取总体测评客户基本测评
const _detail = () => {
  regionLoading.value = true
  userData.currentInfo = {}
  userData.boneAgeInfo = {}
  userData.boneAgeFlag = false
  overallReviewInfo(customerUid).then((res) => {
    if (res.datas.uid == null) {
      ElMessageBox.alert('暂无出生&遗传信息，请先去出生&遗传信息栏填写', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: (action) => {
          if (action == 'confirm') {
            emits('on-jump', '2')
          }
        }
      })
      return
    }
    let historyHeightsLen = res.datas.historyHeights.length
    if (historyHeightsLen === 0) {
      ElMessageBox.alert('暂无身高体重信息，请先去历史身高管理栏填写', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: (action) => {
          if (action == 'confirm') {
            emits('on-jump', '3')
          }
        }
      })
      return
    }
    userData.dataInfo = res.datas
    if (historyHeightsLen) {
      // 如果只有一条数据
      if (historyHeightsLen == 1) {
        userData.currentInfo = res.datas.historyHeights[0]
        userData.boneAgeInfo = res.datas.historyHeights[0]
        userData.boneAgeFlag = false
      }
      // 如果有2条数据，第一条是当前的，第二条是有骨龄的
      if (historyHeightsLen == 2) {
        userData.currentInfo = res.datas.historyHeights[0]
        userData.boneAgeInfo = res.datas.historyHeights[1]
        userData.boneAgeFlag = true
      }
      changeHeightCompareBar()
    }

    if (res.datas.lastLifeStyleGrowth) {
      userData.lastLifeStyleGrowth = res.datas.lastLifeStyleGrowth
    }
    if (res.datas.planDesignHeights && res.datas.planDesignHeights.length) {
      planBaseInfo(res.datas)
    }
    setTimeout(() => {
      regionLoading.value = false
    }, 1000)
  })
}

const planBaseInfo = (dataObj) => {
  stateObj.overInfo = dataObj
  let resData = dataObj.planDesignHeights
  let historyHeightsLen = resData.length
  if (historyHeightsLen) {
    if (historyHeightsLen == 1) {
      stateObj.currentInfo = resData[0]
      stateObj.boneAgeInfo = resData[0]
    }
    if (historyHeightsLen == 2) {
      stateObj.currentInfo = resData[0]
      stateObj.boneAgeInfo = resData[1]
    }
  }
}

// 算法定制接口,计算百分位
const _getHeightCustomization = () => {
  const data = {
    birth: customerObj.birthday,
    sex: customerObj.sex,
    height: userData.currentInfo.currentHeight,
    weight: userData.currentInfo.currentWeight,
    diagnosisTime: userData.currentInfo.addTime, // 传添加日期
    boneAge: userData.currentInfo.lifeAge, // 假设骨龄等于生活年龄
    geneticHeight: userData.dataInfo.geneticsHeight, // 遗传身高
    expectedHeight: userData.dataInfo.expectHeight
  }
  getHeightCustomization(data).then((res) => {
    userData.currentInfo.forecastHeight = res.datas.forecastHeight
    // 获取后还要重新赋值
    changeHeightCompareBar()
  })
}

const changeHeightCompareBar = () => {
  userData.heightCompareBar = [
    { name: '预测成年身高', val: userData.boneAgeInfo.forecastHeight },
    { name: '期望身高', val: userData.dataInfo.expectHeight },
    { name: '遗传身高', val: userData.dataInfo.geneticsHeight },
    { name: '全国均身高', val: userData.dataInfo.nationalAverageHeight }
  ]
}

// 根据客户uid查询全部套餐
const _allSetMealBillByCustomerUid = () => {
  allSetMealBillByCustomerUid(customerUid).then((res) => {
    setMealBillData.setMealList = res.datas
    if (res.datas.length === 0) {
      activeIndex.value = -1
      setMealBillUid.value = ''
    }
    // 下面3个接口涉及到setMealBillUid
    _growthDevelopmentStatistics()
    _heightWeightBmiChart()
    _geneticsMeasuredHeight()
  })
}

const itemClick = (item, index) => {
  activeIndex.value = index
  setMealBillUid.value = item.setMealBillUid
  _detail()
  _growthDevelopmentStatistics()
  _geneticsMeasuredHeight()
  _heightWeightBmiChart()
}

const clickAll = () => {
  activeIndex.value = -1
  setMealBillUid.value = ''
  _detail()
  _growthDevelopmentStatistics()
  _geneticsMeasuredHeight()
  _heightWeightBmiChart()
}

// 身高，体重，bmi用
const _weightHeightPercentile = () => {
  weightHeightPercentile(customerUid).then((res) => {
    userData.chartPerData = res.datas
  })
}

// 骨龄用
const heightDataSummary = () => {
  let list = customerObj.sex === '0' ? boy_list : girl_list
  userData.heightData = list

  let thThreeArr = [],
    thTenArr = [],
    thTwentyFiveArr = [],
    thFiftyArr = [],
    thSeventyFiveArr = [],
    thNinetyArr = [],
    thNinetySevenArr = []
  list.forEach((item) => {
    thThreeArr.push(item.thThree)
    thTenArr.push(item.thTen)
    thTwentyFiveArr.push(item.thTwentyFive)
    thFiftyArr.push(item.thFifty)
    thSeventyFiveArr.push(item.thSeventyFive)
    thNinetyArr.push(item.thNinety)
    thNinetySevenArr.push(item.thNinetySeven)
  })

  let wholeData = [
    { name: '97th', dataArr: thNinetySevenArr },
    { name: '90th', dataArr: thNinetyArr },
    { name: '75th', dataArr: thSeventyFiveArr },
    { name: '50th', dataArr: thFiftyArr },
    { name: '25th', dataArr: thTwentyFiveArr },
    { name: '10th', dataArr: thTenArr },
    { name: '3rd', dataArr: thThreeArr }
  ]

  let popData = []
  wholeData.forEach((ele) => {
    popData.push(ele.dataArr.pop())
  })
  userData.eighteenAgeOfArr = popData.reverse()
}

// const heightDataSummary = () => {
//   weightHeightPercentileSummary(customerUid).then(res => {
//     let list = res.datas
//     userData.heightData = list

//     let afterObj = {}
//     for(var i = 0; i < list.length; i++) {
//       if(!afterObj[list[i].heightPercentile]) {
//         var arr = [];
//         arr.push([list[i].age / 12,list[i].height]);
//         afterObj[list[i].heightPercentile] = arr;
//       }else {
//         afterObj[list[i].heightPercentile].push([list[i].age / 12,list[i].height])
//       }
//     }
//     let wholeData = [
//       {name:'97th',dataArr:afterObj[97]},
//       {name:'90th',dataArr:afterObj[90]},
//       {name:'75th',dataArr:afterObj[75]},
//       {name:'50th',dataArr:afterObj[50]},
//       {name:'25th',dataArr:afterObj[25]},
//       {name:'10th',dataArr:afterObj[10]},
//       {name:'3rd', dataArr:afterObj[3]},
//     ]

//     wholeData.forEach(ele => {
//       userData.eighteenAgeOfArr.push(ele.dataArr.pop()[1])
//     })
//   })
// }

//骨龄对应身高生长情况
const _boneAgeHeightGrowth = () => {
  boneAgeHeightGrowth(customerUid).then((res) => {
    let resData = res.datas
    let newArr = []
    resData.map((item) => {
      newArr.push([item.boneAge, item.currentHeight])
    })
    userData.boneAgeData = newArr
  })
}

// 遗传身高&实测身高曲线图
const _geneticsMeasuredHeight = () => {
  geneticsMeasuredHeight(customerUid, setMealBillUid.value).then((res) => {
    let dataList = res.datas
    if (dataList.length) {
      let onlyLastGenNum = dataList[dataList.length - 1].currHeightOfTargetHeight
      let onlyLastShice = dataList[dataList.length - 1].currentHeight

      userData.lastGenNum = onlyLastGenNum.match(/\d+(.\d+)?/g)[0]
      userData.lastShice = onlyLastShice.match(/\d+(.\d+)?/g)[0]
    }

    userData.geneticsAndshiceData = res.datas
  })
}

const _heightWeightBmiChart = () => {
  heightWeightBmiChart(customerUid, setMealBillUid.value).then((res) => {
    let dataChart = res.datas
    let sortArr = []
    if(dataChart.length) {
      sortArr = dataChart.sort((a, b) => {
        return a.age - b.age
      })
    }
    userData.heightWeightBmiData = sortArr
  })
}

// 查看报告
const handleLookReport = () => {
  activeName.value = 'second'
  if(reportListRef.value) {
    reportListRef.value._evaluationReport()
  }
}

// 个性化身高评估
const handleHeightEstimate = () => {
  activeName.value = 'three'
  if(estimateRef.value) {
    estimateRef.value.formatData()
  }
}

const setMealChange = (value) => {
  if (!value) return
  let itemData = setMealBillData.setMealList.find((item) => {
    return item.setMealBillUid === value
  })
  activeIndex.value = setMealBillData.setMealList.findIndex((item) => {
    return item.setMealBillUid === value
  })
  setMealBillUid.value = itemData.setMealBillUid
  userData.diffTodayDate = getDiffDay(itemData.expiredStartDate, customerObj.currentTime)
  _detail()
  _growthDevelopmentStatistics()
  _geneticsMeasuredHeight()
  _heightWeightBmiChart()
}

// 生成效果报告
const handleCreateReport = () => {
  dialogSetMealVisible.value = true
}

const createReportQuarter = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      activeName.value = 'four'
      fourFlag.value = true
      userData.reportTitle = '季度'
      evaluationReportType.value = 'QUARTER'
      dialogSetMealVisible.value = false
      ruleFormRef.value.resetFields()
    }
  })
}

const createReportYear = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      activeName.value = 'four'
      fourFlag.value = true
      userData.reportTitle = '年度'
      evaluationReportType.value = 'YEAR'
      dialogSetMealVisible.value = false
      ruleFormRef.value.resetFields()
    }
  })
}

const handleBack = () => {
  activeName.value = 'first'
  fourFlag.value = false
}

const clickEdit = () => {
  dialogFormVisible.value = true
  totalEvaluate.value = userData.lastLifeStyleGrowth.totalEvaluate
}

const handleSaveTotalEvaluate = () => {
  let data = {
    lifeStyleGrowthUid: userData.lastLifeStyleGrowth.uid,
    totalEvaluate: totalEvaluate.value
  }
  updateTotalEvaluate(data).then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: '近期发育情况分析保存成功！'
    })
    dialogFormVisible.value = false
    _detail()
  })
}

const handleCancel = () => {
  dialogFormVisible.value = false
}

const cancelSetMeal = () => {
  dialogSetMealVisible.value = false
  dialogFormSetMeal.setMealType = ''
}

const { statisticsData, _growthDevelopmentStatistics } = useGrowthData(customerUid, setMealBillUid)
const { targetShow, showWayOne } = useTableTargetShow(userData)

const { btnLoading, handleSavePdf } = useCanvasToPdf(evaluationReportType, 'effectPdf')

onMounted(() => {
  _detail()
  _allSetMealBillByCustomerUid()
  _weightHeightPercentile()
  heightDataSummary()
  _boneAgeHeightGrowth()
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-report.scss';
@import '@/styles/overall-table.scss';
.overall {
  padding: 10px;
}
.btn {
  padding: 0 10px !important;
}
.content-box {
  .i-panel {
    margin-top: 30px;
    padding: 10px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.075);
    &:hover {
      box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1), -2px 6px 10px rgba(0, 0, 0, 0.1);
    }
    &:first-child {
      margin-top: 10px;
    }
    .form-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 20px;
      .left-col {
        width: 45%;
      }
      .right-col {
        width: 50%;
      }
    }
  }
  .statistics-item {
    margin-top: 0;
    margin-bottom: 20px;
  }
  .card-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: flex-start; //排列格式
    margin-top: 30px;
    padding-left: 10px;
    .card-item {
      height: 64px;
      border: 1px solid #ddd;
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      margin-left: 10px;
      border-radius: 4px;
      font-size: 15px;
      &.active {
        background: $panGreen;
        color: #fff;
      }
    }
  }
}

.modal-content {
  border: 1px solid #ccc;
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .title-left {
      font-size: 20px;
    }
  }
  .modal-footer {
    // display: flex;
    // justify-content: flex-end;
    text-align: center;
    padding: 20px;
    border-top: 1px solid #e0e0e0;
  }
  .analysis {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      cursor: pointer;
    }
  }
}

:deep(.my-loading) {
  .el-loading-spinner {
    top: 10%;
  }
}
</style>
