<template>
  <div>
    <div class="tab-home">
      <div>
        <span class="pr-15 fw-blod">当前套餐管理时间轴</span>
        <el-button type="primary" :icon="CirclePlusFilled" @click="handleAddRemind">添加提醒</el-button>
      </div>
      <div class="flex-jus-around">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>状态：</span>
              <span>{{ compStatus }}</span>
            </div>
          </template>
          <div class="text item">
            <span>备注：</span>
            <span>{{ customerObj.remark }}</span>
          </div>
        </el-card>
        <el-button type="primary" @click="handleAddState">添加状态</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
    <div class="cu-timeline">
      <div v-if="remindsList.length">
        <div class="cu-timeline-item" v-for="(value, key) in afterList" :key="key">
          <div class="cu-timeline-item__content">
            <el-table
              :data="value"
              :show-header="false"
              tooltip-effect="dark"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="content" label="" :show-overflow-tooltip="true" />
              <el-table-column label="" align="right" width="80">
                <template #default="scope">
                  <span v-if="!scope.row.status">
                    <i class="iconfont icon-quxiao" @click="handleDelete(scope.row)" />
                    <i class="iconfont icon-queren" style="margin-right: 0" @click="handleSure(scope.row)" />
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="cu-timeline-item__tail"></div>
          <div class="cu-timeline-item__sub" :class="todayClass(key)"></div>
          <div class="cu-timeline-item__timestamp">{{ key }}</div>
        </div>
        <el-icon class="timeline-right-arrow" :size="20">
          <CaretRight />
        </el-icon>
      </div>
      <div class="no-data" v-else>
        <img src="/img/no-msg.png" alt="" />
        <p class="no-data-word">暂无提醒</p>
      </div>
    </div>
    <div class="home-content">
      <div class="pb-15 fw-blod">当前套餐管理内容</div>
      <el-table :data="contentList" fit border highlight-current-row>
        <el-table-column label="行号" align="center" min-width="100px">
          <template v-slot="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center" min-width="200px">
          <template v-slot="scope">
            <span>{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总次数" align="center" min-width="150px">
          <template v-slot="scope">
            <span>{{ scope.row.projectNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行状态" align="center" min-width="150px">
          <template v-slot="scope">
            <span :class="statusClass(scope.row)">{{ countNum(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已执行" align="center" min-width="150px">
          <template v-slot="scope">
            <span>{{ scope.row.executedNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余" align="center" min-width="150px">
          <template v-slot="scope">
            <span>{{ scope.row.residueNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期至" align="center" min-width="150px">
          <template v-slot="scope">
            <span>{{ scope.row.expiredEndDate }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template #default="scope">
            <el-button text @click.prevent="handleExcute(scope.row)" v-if="scope.row.residueNum > 0"> 执行 </el-button>
            <el-button text @click.prevent="handleRecord(scope.row)" v-if="scope.row.executedNum > 0"> 记录 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加提醒 -->
    <RemindDialog ref="remindDialogRef" @refreshList="_getAllReminds()" />
    <!-- 添加状态 -->
    <StateDialog ref="stateDialogRef" :allStatusData="allStatusData" @refreshList="againRefresh" />
    <!-- 处理提醒 -->
    <HandleRemindDialog ref="handleRemindDialogRef" @refreshList="_getAllReminds()" />
    <!-- 执行 -->
    <ExecuteDialog ref="executeDialogRef" :executeRowObj="executeRowObj" @refreshList="_getSetMealProjects()" />
    <!-- 记录 -->
    <ExecuteRecordDialog ref="recordDialogRef" />
  </div>
</template>

<script setup>
import { getAllReminds, deleteRemind, getSetMealProjects } from '@/api/heightManageCom/h-home'
import useStatusData from '@/hooks/useStatusData'
import { computed, inject, onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CirclePlusFilled, CaretRight, CircleCloseFilled, CircleCheckFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { compareDate, checkSameData, toDay } from '@/utils/util'
import RemindDialog from './remindDialog.vue'
import StateDialog from './stateDialog.vue'
import HandleRemindDialog from './handleRemindDialog.vue'
import ExecuteDialog from './executeDialog.vue'
import ExecuteRecordDialog from './executeRecordDialog.vue'

const props = defineProps({
  customerObj: {
    type: Object,
    default: () => {}
  }
})

const setMealBillUid = inject('setMealBillUid')
const emit = defineEmits(['oneMoreRefresh'])

const { allStatusData } = useStatusData() // 所有开单状态列表

const router = useRouter()
const disVal = ref(false)
const remindDialogRef = ref(null)
const stateDialogRef = ref(null)
const handleRemindDialogRef = ref(null)
const executeDialogRef = ref(null)
const recordDialogRef = ref(null)

const remindsList = ref([])
const afterList = ref({})
const contentList = ref([])

const executeRowObj = reactive({
  projectName: '',
  projectNum: 0,
  executedNum: 0,
  setMealBillProjectUid: ''
})

const compStatus = computed(() => {
  if (props.customerObj.status && allStatusData.value) {
    return allStatusData.value[props.customerObj.status]
  }
})

const todayClass = computed(() => {
  return (key) => {
    return key == props.customerObj.currentTime ? 'cu-timeline-item__today' : 'cu-timeline-item__node'
  }
})

const statusClass = computed(() => {
  return (row) => {
    if (row.executedNum === 0) {
      return 'color-orange'
    } else if (row.projectNum - row.executedNum > 0) {
      return 'color-green'
    } else if (row.residueNum === 0) {
      return 'color-blue'
    } else {
      return ''
    }
  }
})

const goBack = () => {
  router.go(-1)
}

const tableRowClassName = ({ row, rowIndex }) => {
  // 是否到期(对比时间当前)
  let isExpire = compareDate(row.executeDate, props.customerObj.currentTime)
  // 已执行背景为灰色
  if (isExpire && row.status === 1) {
    return 'disabled-row'
  } else if (!isExpire && row.status === 1) {
    return 'disabled-row'
  } else if (isExpire) {
    return 'warning-row'
  } else {
    return ''
  }
}

// 获取所有提醒
const _getAllReminds = () => {
  getAllReminds(setMealBillUid).then((res) => {
    let list = res.datas
    afterList.value = checkSameData(list)
    remindsList.value = list

    // 当天未执行的提醒弹出
    let dateKeys = Object.keys(afterList.value)
    let todayRemindArr = []
    dateKeys.forEach((item) => {
      if (item === toDay()) {
        todayRemindArr = afterList.value[item]
      }
    })
    todayRemindArr.map((ele) => {
      if (!ele.status) {
        handleSure(ele)
      }
    })
  })
}

// 当前套餐管理内容列表
const _getSetMealProjects = () => {
  getSetMealProjects(setMealBillUid).then((res) => {
    let resData = res.datas
    resData.forEach((item) => {
      item.residueNum = item.projectNum - item.executedNum
    })
    contentList.value = resData
  })
}
// 执行为0,表示未开始; 剩余为0表示已完成；
const countNum = (row) => {
  if (row.executedNum === 0) {
    return '未开始'
  }
  if (row.projectNum - row.executedNum > 0) {
    return '进行中'
  }
  if (row.residueNum === 0) {
    return '已完成'
  }
}

onMounted(() => {
  _getAllReminds()
  _getSetMealProjects()
})

const handleDelete = (rowData) => {
  ElMessageBox.confirm('确定删除该提醒？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action == 'confirm') {
        deleteRemind(rowData.uid).then((res) => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          _getAllReminds()
        })
      }
    }
  })
}

// 处理提醒
const handleSure = (rowData) => {
  handleRemindDialogRef.value.dialogFormVisible = true
  handleRemindDialogRef.value.remindDetail(rowData)
}

// 添加提醒
const handleAddRemind = () => {
  remindDialogRef.value.dialogFormVisible = true
}

// 添加状态
const handleAddState = () => {
  stateDialogRef.value.dialogFormVisible = true
}

// 执行
const handleExcute = (rowData) => {
  executeDialogRef.value.dialogFormVisible = true
  executeRowObj.projectName = rowData.projectName
  executeRowObj.projectNum = rowData.projectNum
  executeRowObj.executedNum = rowData.executedNum
  executeRowObj.setMealBillProjectUid = rowData.uid
}

// 记录
const handleRecord = (rowData) => {
  recordDialogRef.value.dialogFormVisible = true
  recordDialogRef.value._executeProjectRecords(rowData)
}

const againRefresh = () => {
  emit('oneMoreRefresh')
}
</script>

<style lang="scss" scoped>
.tab-home {
  display: flex;
  justify-content: space-between;
}
.el-table {
  border-top: none;
  :deep(th.el-table__cell.is-leaf) {
    border-bottom: none;
  }
  :deep(.disabled-row) {
    cursor: not-allowed;
    color: #666769;
    background-color: #eee;
    border-color: #e9e9eb;
  }
  :deep(.warning-row) {
    background-color: #fde2e2;
  }
}

.cu-timeline {
  position: relative;
  margin-top: 20px;
  .cu-timeline-item {
    display: inline-block;
    position: relative;
    width: 200px;
    text-align: center;
    margin: 20px 0;
    .cu-timeline-item__content {
      background: #fff;
      border: 1px solid #ddd;
      border-bottom: none;
      font-size: 12px;
      margin: 0 10px;
      cursor: pointer;
      position: relative;
    }
    .cu-timeline-item__tail {
      width: 100%;
      background: $panGreen;
      opacity: 0.5;
      height: 2px;
      margin: 10px 0;
    }
    .cu-timeline-item__sub {
      position: absolute;
      left: 50%;
      bottom: 19px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      opacity: 0.8;
    }
    .cu-timeline-item__node {
      background-color: $panGreen;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      z-index: 2;
    }
    .cu-timeline-item__today {
      width: 0;
      height: 0;
      border-bottom: 12px solid red;
      border-right: 12px solid transparent;
      border-left: 12px solid transparent;
    }
    .cu-timeline-item__timestamp {
      color: #333;
      line-height: 1;
      font-size: 13px;
    }
  }
  .timeline-right-arrow {
    position: absolute;
    bottom: 32px;
    color: $panGreen;
    margin: 0px 0px 2px -8px;
  }
}

.home-content {
  margin: 20px 0;
}

.box-card {
  width: 350px;
  margin-right: 50px;
  .text,
  .card-header {
    font-size: 14px;
  }
}

.no-data {
  text-align: center;
  img {
    width: 200px;
  }
  .no-data-word {
    color: #333;
    padding-top: 10px;
  }
}
</style>
