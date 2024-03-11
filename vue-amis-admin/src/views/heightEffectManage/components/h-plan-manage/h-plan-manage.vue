<template>
  <div class="life-way">
    <div :style="{ display: showFlag === 'add' ? 'block' : 'none' }">
      <div class="filter-bottom">
        <el-button class="filter-item h-history-btn" type="primary" color="#3BAE9D" @click="handleAdd">
          添加方案
        </el-button>
      </div>
      <el-table :data="tableData" v-loading="tableLoading" fit highlight-current-row>
        <el-table-column label="行号" align="center" min-width="50px">
          <template v-slot="scope">
            <span>{{ scope.$index + (pages.pageNum - 1) * pages.pageSize + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="方案时间" align="center" min-width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="孩子年龄" align="center" min-width="50px">
          <template v-slot="scope">
            <span>{{ scope.row.ageStr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="方案名称" align="center" min-width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="方案类型" align="center" min-width="200px">
          <template v-slot="scope">
            <span>{{ scope.row.typesArr.join(',') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医生" align="center" min-width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.createByUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="方案状态" align="center" min-width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.status == 0 ? '未发布' : '已发布' }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="170">
          <template #default="scope">
            <el-button text @click.prevent="handleEdit(scope.row)"> 编辑 </el-button>
            <el-button type="bdx-delete" @click.prevent="deleteRow(scope.row)"> 删除 </el-button>
            <el-button text @click.prevent="handleLook(scope.row)"> 查看报告 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        v-model:page="pages.pageNum"
        v-model:limit="pages.pageSize"
        @pagination="fetchData()"
      />
    </div>
    <!-- 添加 -->
    <AddPlanDialog ref="addPlanDialogRef" @refreshList="updateData" />

    <div
      class="modal-content"
      :style="{ display: showFlag === 'look' ? 'block' : 'none' }"
      v-loading="regionLoading"
      element-loading-custom-class="my-loading"
      v-if="showFlag === 'look'"
    >
      <!-- <div class="modal-header border-b">
        <el-button @click="handleBack">返回</el-button>
      </div> -->
      <div class="tabs-and-fabu">
        <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="handleTabChange">
          <el-tab-pane label="身高生长速度设计" name="1" v-if="tabPlanInfo.heightGrowthRateDesign">
            <HeightGrowthDesign
              v-if="activeName == '1'"
              :userData="userData"
              :statisticsData="statisticsData"
              :planDesignUid="planDesignUid"
              :heightGrowthData="tabPlanInfo.heightGrowthRateDesignDto"
              @updateGuidance="updateGuidance"
            />
          </el-tab-pane>
          <el-tab-pane label="营养素指导方案" name="2" v-if="tabPlanInfo.nutrientGuidance">
            <NutrientDesign
              v-if="activeName == '2'"
              :planDesignUid="planDesignUid"
              :nutrientData="tabPlanInfo.nutrientGuidanceDto"
              @updateGuidance="updateGuidance"
            />
            <LastLifeRecord v-if="lifeStyleList.length" :lifeStyleData="lifeStyleList[0]" :activeName="activeName" />
          </el-tab-pane>
          <el-tab-pane label="膳食指导方案" name="3" v-if="tabPlanInfo.dietaryGuidance">
            <MealsDesign
              v-if="activeName == '3'"
              :userData="userData"
              :planDesignUid="planDesignUid"
              :dietaryData="tabPlanInfo.dietaryGuidanceDto"
              @updateGuidance="updateGuidance"
            />
            <LastLifeRecord v-if="lifeStyleList.length" :lifeStyleData="lifeStyleList[0]" :activeName="activeName" />
          </el-tab-pane>
          <el-tab-pane label="运动指导方案" name="4" v-if="tabPlanInfo.sportsGuidance">
            <SportDesign
              v-if="activeName == '4'"
              :planDesignUid="planDesignUid"
              :sportsData="tabPlanInfo.sportsGuidanceDto"
              @updateGuidance="updateGuidance"
            />
            <LastLifeRecord v-if="lifeStyleList.length" :lifeStyleData="lifeStyleList[0]" :activeName="activeName" />
          </el-tab-pane>
          <el-tab-pane label="睡眠指导方案" name="5" v-if="tabPlanInfo.sleepGuidance">
            <SleepDesign
              v-if="activeName == '5'"
              :planDesignUid="planDesignUid"
              :sleepData="tabPlanInfo.sleepGuidanceDto"
              @updateGuidance="updateGuidance"
            />
            <LastLifeRecord v-if="lifeStyleList.length" :lifeStyleData="lifeStyleList[0]" :activeName="activeName" />
          </el-tab-pane>
          <el-tab-pane label="情绪指导方案" name="6" v-if="tabPlanInfo.emotionGuidance">
            <EmotionDesign
              v-if="activeName == '6'"
              :planDesignUid="planDesignUid"
              :emotionData="tabPlanInfo.emotionGuidanceDto"
              @updateGuidance="updateGuidance"
            />
          </el-tab-pane>
          <el-tab-pane label="方案报告" name="7" v-if="reportGuidance">
            <PlanReport
              :tabPlanInfo="tabPlanInfo"
              :heightGrowthData="tabPlanInfo.heightGrowthRateDesignDto"
              :userData="userData"
              :statisticsData="statisticsData"
              :createPlanDate="createPlanDate"
              :createPlanDoctor="createPlanDoctor"
            />
          </el-tab-pane>
        </el-tabs>

        <div class="right-fabu">
          <el-popover placement="bottom" title="提示" :width="200" trigger="hover" content="确认方案已完成">
            <template #reference>
              <div>
                <span class="color-orange mr-20" v-if="showReleaseStatus == 0">状态：未发布</span>
                <span class="color-orange mr-20" v-if="showReleaseStatus == 1">状态：已发布</span>
                <el-button type="primary" @click="handleReleasePlan" v-if="showReleaseStatus == 0">发布方案</el-button>
              </div>
            </template>
          </el-popover>
          <el-button class="btn" @click="handleBack">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  planDesignList,
  getPlanDesignInfo,
  deletePlanDesign,
  releasePlan,
  baseOverallReview
} from '@/api/heightManageCom/h-plan-manage'
import { lifeStyletList } from '@/api/heightManageCom/h-life-way'
import { overallReviewInfo } from '@/api/heightManageCom/h-overall-evaluation'
import { getHeightCustomization } from '@/api/heightManageCom/h-birth-heredity'
import { calculateLifeAge } from '@/api/heightManageCom/h-history-height'

import { onMounted, reactive, ref, inject, provide } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import AddPlanDialog from './addPlanDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import HeightGrowthDesign from './height-growth-design/height-growth-design.vue'
import NutrientDesign from './nutrient-design/nutrient-design.vue'
import MealsDesign from './meals-design/meals-design.vue'
import SportDesign from './sport-design/sport-design.vue'
import SleepDesign from './sleep-design/sleep-design.vue'
import EmotionDesign from './emotion-design/emotion-design.vue'
import LastLifeRecord from '@/components/Last-life-record/index.vue'
import MyEditor from '@/components/UE/MyEditor.vue'
import PlanReport from './plan-report/plan-report.vue'
import { planTypes } from '@/utils/config'
// import useGrowthData from '@/hooks/useGrowthData';
import { toDay } from '@/utils/util';

const emits = defineEmits(['on-jump'])
const customerObj = inject('customerObj')
const customerUid = inject('customerUid')

const lifeWayDialogRef = ref(null)
const diaTitle = ref('')
const copyStatus = ref(false)
const addPlanDialogRef = ref(null)

const showFlag = ref('add')
const activeName = ref('1')
const showReleaseStatus = ref(0)
const tabPlanInfo = ref({})
const reportGuidance = ref(false)
const regionLoading = ref(false) // 页面加载loading
const planDesignUid = ref('') // 方案设计uid
const createPlanDate = ref('') // 创建方案的时间
const createPlanDoctor = ref('')

const lifeAge = ref('')
const searchForm = reactive({
  content: ''
})

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})
const tableLoading = ref(false)
const tableData = ref([])
const total = ref(0)

const lifeStyleList = ref([])

const userData = reactive({
  dataInfo: {},
  currentInfo: {},
  twoBonAgeInfo: {},
  sexualData: {},
  boneAgeFlag: false, //有无骨龄的状态
  boneAgeInfo: {} // 骨龄数据（可能是第一条，可能是第二条）
})

// 获取列表数据
const fetchData = () => {
  tableLoading.value = true
  planDesignList(customerUid, pages).then((res) => {
    let resData = res.datas
    resData.forEach((item) => {
      item.typesArr = []
      planTypes.forEach((ele) => {
        if (item[ele.key]) {
          item.typesArr.push(ele.label)
        }
      })
    })
    tableData.value = resData
    total.value = res.total
    setTimeout(() => {
      tableLoading.value = false
    }, 1000)
  })
}

// 添加方案之前进行拦截
const _overallReviewInfo = () => {
  overallReviewInfo(customerUid).then((res) => {
    commonRemind(res)
  })
}

// 添加
const handleAdd = () => {
  showFlag.value = 'add'
  addPlanDialogRef.value.dialogFormVisible = true
}

const handleLook = (rowData) => {
  if (!rowData.reportUrl) {
    ElMessage({
      type: 'error',
      message: '还未生成报告'
    })
    return
  }
  window.open(rowData.reportUrl)
}

const handleEdit = (rowData) => {
  let namesArr = rowData.typesArr
  planTypes.map((item) => {
    if (item.label == namesArr[0]) {
      activeName.value = item.id
    }
  })
  showReleaseStatus.value = rowData.status
  createPlanDate.value = rowData.createDate.slice(0, 10)
  createPlanDoctor.value = rowData.createByUserName
  _getPlanDesignInfo(rowData.uid)
  _lifeStyletList()
  _baseOverallReview(rowData.uid)
}

// 根据planDesignUid获取方案设计信息
const _getPlanDesignInfo = (uid) => {
  reportGuidance.value = false
  regionLoading.value = true
  getPlanDesignInfo(uid).then((res) => {
    showFlag.value = 'look'
    tabPlanInfo.value = res.datas
    planDesignUid.value = res.datas.uid
    reportGuidance.value = true

    setTimeout(() => {
      regionLoading.value = false
    }, 1000)
  })
}

// 根据planDesignUid获取总体测评客户基本测评
const _baseOverallReview = (uid) => {
  userData.currentInfo = {}
  userData.boneAgeInfo = {}
  baseOverallReview(uid).then((res) => {
    commonRemind(res)
    let historyHeightsLen = res.datas.historyHeights.length
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
    }
  })
}

// 获取列表数据
const _lifeStyletList = () => {
  lifeStyletList({ customerUid }, pages).then((res) => {
    lifeStyleList.value = res.datas
  })
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
  })
}

// 提取公共提醒
const commonRemind = (res) => {
  if (!res.datas.uid) {
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
  if (res.datas.historyHeights.length === 0) {
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
}

// 刷新并进入页面
const updateData = (dataObj) => {
  fetchData()
  let arr = []
  planTypes.forEach((ele) => {
    if (dataObj[ele.key]) {
      arr.push(ele.label)
    }
  })
  dataObj.typesArr = arr
  handleEdit(dataObj)
}

const handleTabChange = (name) => {
  activeName.value = name
}

const handleBack = () => {
  showFlag.value = 'add'
  activeName.value = '1'
  tabPlanInfo.value = {} // 每次返回，数据需要还原
  fetchData()
}

const deleteRow = (rowData) => {
  ElMessageBox.confirm('确定删除该方案吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action == 'confirm') {
        _deletePlanDesign(rowData.uid)
      }
    }
  })
}

const _deletePlanDesign = (uid) => {
  deletePlanDesign(uid).then((res) => {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    fetchData()
  })
}

// 发布方案
const handleReleasePlan = () => {
  if (tabPlanInfo.value.heightGrowthRateDesign && !tabPlanInfo.value.heightGrowthRateDesignDto.uid) {
    ElMessage({
      type: 'warning',
      message: '发布前，请填写并保存身高生长速度设计方案'
    })
    return
  }
  if (tabPlanInfo.value.nutrientGuidance && !tabPlanInfo.value.nutrientGuidanceDto.uid) {
    ElMessage({
      type: 'warning',
      message: '发布前，请填写并保存营养素指导方案'
    })
    return
  }
  if (tabPlanInfo.value.dietaryGuidance && !tabPlanInfo.value.dietaryGuidanceDto.uid) {
    ElMessage({
      type: 'warning',
      message: '发布前，请填写并保存膳食指导方案'
    })
    return
  }
  if (tabPlanInfo.value.sportsGuidance && !tabPlanInfo.value.sportsGuidanceDto.uid) {
    ElMessage({
      type: 'warning',
      message: '发布前，请填写并保存运动指导方案'
    })
    return
  }
  if (tabPlanInfo.value.sleepGuidance && !tabPlanInfo.value.sleepGuidanceDto.uid) {
    ElMessage({
      type: 'warning',
      message: '发布前，请填写并保存睡眠指导方案'
    })
    return
  }
  if (tabPlanInfo.value.emotionGuidance && !tabPlanInfo.value.emotionGuidanceDto.uid) {
    ElMessage({
      type: 'warning',
      message: '发布前，请填写并保存情绪指导方案'
    })
    return
  }
  ElMessageBox.confirm('确定发布方案吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action == 'confirm') {
        _releasePlan()
      }
    }
  })
}

const _releasePlan = () => {
  releasePlan(planDesignUid.value).then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: '发布方案成功！'
    })
    showReleaseStatus.value = res.datas.status
    fetchData()
  })
}

const updateGuidance = () => {
  _getPlanDesignInfo(planDesignUid.value)
}

const _calculateLifeAge = () => {
  const data = {
    addTime: toDay(),
    birthday: customerObj.birthday
  }
  calculateLifeAge(data).then((res) => {
    lifeAge.value = res.msg
  })
}

onMounted(() => {
  fetchData()
  _overallReviewInfo()
  _calculateLifeAge()
})

provide('planDesignUid', planDesignUid)
provide('userLifeAge',lifeAge)
</script>

<style lang="scss" scoped>
.life-way {
  border: 1px solid #ccc;
  border-top: none;
}
.h-history-btn {
  padding: 0 10px !important;
}
.modal-content {
  border-top: 1px solid #ccc;
  .modal-header {
    padding: 20px;
    text-align: right;
  }
  .el-tabs--card {
    padding: 20px;
    :deep(.el-tabs__header) {
      margin: 0 0 20px;
      .is-active {
        background: $panGreen;
        color: #fff;
      }
    }
  }
  .tabs-and-fabu {
    position: relative;
    .right-fabu {
      display: flex;
      position: absolute;
      right: 20px;
      top: 20px;
      align-items: center;
      .btn {
        margin-left: 10px;
      }
    }
  }
}

:deep(.my-loading) {
  .el-loading-spinner {
    top: 10%;
  }
}
</style>
