<template>
  <div class="modal-body">
    <div class="main-view" id="pdfdom">
      <div class="main-title">身高管理方案报告</div>
      <div class="ta-right">诊断医生：{{ createPlanDoctor }}</div>
      <table border="1">
        <tr>
          <td>姓名：{{ customerObj.customerName }}</td>
          <td>性别：{{ sexFilter(customerObj.sex) }}</td>
          <td>年龄：{{ customerObj.ageStr }}</td>
          <td>方案设计日期：{{ createPlanDate }}</td>
        </tr>
      </table>
      <ReportTableExpect :expectedInfo="userData.dataInfo" :currentInfo="userData.currentInfo" />

      <ReportTableBaseInfo :expectedInfo="userData.dataInfo" :currentInfo="userData.currentInfo" />

      <ReportTableSexual
        :customerObj="customerObj"
        :currentInfo="userData.currentInfo"
        v-if="userData.currentInfo.bodyCheck"
      />

      <ReportTableHeightGrowth1
        class="item"
        :overInfo="userData.dataInfo"
        :currentInfo="userData.currentInfo"
        :boneAgeInfo="userData.boneAgeInfo"
        :tabPlanInfo="tabPlanInfo"
        v-if="tabPlanInfo.heightGrowthRateDesign"
      />
      <!-- 目标骨龄身高生长实现方法(一) -->
      <div class="item" v-if="targetShow && showWayOne">
        <tableTargetWayOne
          :overInfo="userData.dataInfo"
          :currentInfo="userData.currentInfo"
          :boneAgeInfo="userData.boneAgeInfo"
          v-if="tabPlanInfo.heightGrowthRateDesign"
        />
        <div class="control">
          体重控制：
          <span class="mr-10">{{ wordShow(heightGrowthData.weightControl1) }} </span>
          <span>{{ heightGrowthData.controlValue1 }}</span>
          <span>
            <span v-if="heightGrowthData.weightControl1 == 'TIME'">{{ heightGrowthData.controlUnit1 }}</span>
            <span v-else>cm</span>
          </span>
          <span class="ml-10">体重控制&lt;= {{ heightGrowthData.weightControlValue1 }}kg </span>
        </div>
      </div>
      <!-- 目标骨龄身高生长实现方法(二) -->
      <div class="item" v-if="targetShow">
        <tableTargetWayTwo
          :overInfo="userData.dataInfo"
          :currentInfo="userData.currentInfo"
          :boneAgeInfo="userData.boneAgeInfo"
          v-if="tabPlanInfo.heightGrowthRateDesign"
        />
        <div class="control">
          体重控制：
          <span class="mr-10">{{ wordShow(heightGrowthData.weightControl2) }} </span>
          <span>{{ heightGrowthData.controlValue2 }}</span>
          <span>
            <span v-if="heightGrowthData.weightControl2 == 'TIME'">{{ heightGrowthData.controlUnit2 }}</span>
            <span v-else>cm</span>
          </span>
          <span class="ml-10">体重控制&lt;= {{ heightGrowthData.weightControlValue2 }}kg </span>
        </div>
      </div>

      <table class="item" border="1" style="margin-top: 0">
        <tr>
          <td colspan="4">3.2、方案设计</td>
        </tr>
        <tbody>
          <tr v-for="(item, index) in state.selectList" :key="index">
            <td colspan="4" v-if="item.checked">
              <span>{{ item.label }}</span
              >&nbsp;&nbsp;
              <span v-if="item.remarkStatus"> 备注：{{ item.remark }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="item" border="1" cellpadding="3" v-if="tabPlanInfo.nutrientGuidance">
        <tr>
          <th colspan="4">营养素指导方案</th>
        </tr>
        <tr>
          <td class="ta-center" width="100">备注</td>
          <td colspan="2">
            <div v-html="tabPlanInfo.nutrientGuidanceDto.remark"></div>
          </td>
        </tr>
      </table>
      <!-- 膳食指导方案 -->
      <ReportTableDietary1 class="item" :tabPlanInfo="tabPlanInfo" v-if="tabPlanInfo.dietaryGuidance" />
      <ReportTableDietary2 class="item" :tabPlanInfo="tabPlanInfo" v-if="tabPlanInfo.dietaryGuidance" />
      <!-- 运动指导方案 -->
      <ReportTableSports class="item" :tabPlanInfo="tabPlanInfo" v-if="tabPlanInfo.sportsGuidance" />
      <!-- 睡眠指导方案 -->
      <ReportTableSleep class="item" :tabPlanInfo="tabPlanInfo" v-if="tabPlanInfo.sleepGuidance" />
      <!-- 情绪指导方案 -->
      <ReportTableEmotion class="item" :tabPlanInfo="tabPlanInfo" v-if="tabPlanInfo.emotionGuidance" />
    </div>
    <div class="modal-footer">
      <el-button
        id="print-button"
        class="btn"
        type="primary"
        @click="handleSave"
        v-loading.fullscreen.lock="btnLoading"
        element-loading-text="正在导出，请稍后..."
        >保存报告</el-button
      >
    </div>
  </div>
  <BackTop />
</template>

<script setup>
import { computed, onMounted, reactive, ref, inject, h } from 'vue'
import ReportTableExpect from './components/report-table-expect.vue'
import ReportTableBaseInfo from './components/report-table-baseInfo.vue'
import ReportTableSexual from './components/report-table-sexual.vue'
import ReportTableHeightGrowth1 from './components/report-table-heightGrowth1.vue'
import ReportTableDietary1 from './components/report-table-dietary1.vue'
import ReportTableDietary2 from './components/report-table-dietary2.vue'
import ReportTableSports from './components/report-table-sports.vue'
import ReportTableSleep from './components/report-table-sleep.vue'
import ReportTableEmotion from './components/report-table-emotion.vue'
import { sexFilter } from '@/utils/filters'
import tableTargetWayOne from '@/components/table-target-way-one/index.vue'
import tableTargetWayTwo from '@/components/table-target-way-two/index.vue'
import { planList } from '@/utils/config'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import BackTop from '@/components/BackTop/index.vue'
import useCanvasToPdf from '@/hooks/useCanvasToPdf'
import useTableTargetShow from '@/hooks/useTableTargetShow'

const { btnLoading, handleSavePdf } = useCanvasToPdf('', 'pdfdom', 'plan-report')

const customerObj = inject('customerObj')
const customerUid = inject('customerUid')

const store = useStore()
const userName = computed(() => store.state.user.name)

const props = defineProps({
  tabPlanInfo: {
    type: Object
  },
  heightGrowthData: {
    type: Object
  },
  userData: {
    type: Object
  },
  statisticsData: {
    type: Object
  },
  createPlanDate: {
    type: String
  },
  createPlanDoctor: {
    type: String
  }
})

const state = reactive({
  planList: planList,
  selectList: []
})

const wordShow = (val) => {
  return val === 'TIME' ? '按时间控制' : '按身高控制'
}

const handleSave = () => {
  handleSavePdf()
}

const { targetShow, showWayOne } = useTableTargetShow(props.userData)

onMounted(() => {
  state.planList.forEach((item) => {
    item.checked = props.heightGrowthData[item.key]
    if (item.remarkStatus) {
      item.remark = props.heightGrowthData[item.remarkKey]
    }
  })
  state.selectList = state.planList.filter((ele) => {
    return ele.checked
  })
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-report.scss';
.control {
  border-left: 1px solid #808080;
  border-right: 1px solid #808080;
  padding: 5px 6px;
}
.border-b {
  border-bottom: 1px solid #808080 !important;
}

.mask {
  width: 100%;
  height: 100vh;
  background: pink;
}
</style>
