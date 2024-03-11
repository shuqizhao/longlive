<template>
  <div class="app-container">
    <div class="customer-title">
      <div class="title-left color-blue fw-blod">
        <span>{{ customerObj.customerName }}</span>
        <span>-</span>
        <span>{{ customerObj.sexStr }}</span>
        <span>-</span>
        <span style="color: red">{{ customerObj.ageStr }}</span>
        <span>{{ customerObj.phone }}</span>
      </div>
      <div class="title-right">
        <span>【{{ customerObj.setMealName }}-{{ customerObj.tenantName }}】</span>
        <span class="color-warning">有效期：{{ customerObj.expiredStartDate }} ~ {{ customerObj.expiredEndDate }}</span>
        <span class="color-warning" v-if="customerObj.lastAddTime && !isCloseStatus">
          （最后一次骨龄检测：{{ customerObj.lastAddTime }}）
        </span>
        <span class="color-warning" v-if="isCloseStatus">管理已到期，档案已关闭</span>
      </div>
      <el-button @click="modifySetMealTime">修改套餐时间</el-button>
    </div>

    <el-tabs v-model="tabNum" type="card" @tab-change="tabChange">
      <el-tab-pane label="首页" name="1" lazy>
        <template #label>
          <span>
            <i class="iconfont icon-shouye" />
            <span>首页</span>
          </span>
        </template>
        <HHome :customerObj="customerObj" @oneMoreRefresh="_getSetMealBillInfo()" />
      </el-tab-pane>
      <el-tab-pane name="2" lazy>
        <template #label>
          <span>
            <i class="iconfont icon-essential-information" />
            <span>出生&遗传信息</span>
          </span>
        </template>
        <HBirthHeredity :customerObj="customerObj" />
      </el-tab-pane>
      <el-tab-pane label="历史身高管理" name="3" lazy>
        <template #label>
          <span>
            <i class="iconfont icon-person_growth" />
            <span>历史身高管理</span>
          </span>
        </template>
        <HHistoryHeight v-if="tabNum === '3'" />
      </el-tab-pane>
      <el-tab-pane label="生活方式记录" name="4" lazy>
        <template #label>
          <span>
            <i class="iconfont icon-chifanzhong" />
            <span>生活方式记录</span>
          </span>
        </template>
        <HLifeWay v-if="tabNum === '4'" />
      </el-tab-pane>
      <el-tab-pane label="总体测评" name="5" lazy>
        <template #label>
          <span>
            <i class="iconfont icon-fengxianceping" />
            <span>总体测评</span>
          </span>
        </template>
        <HOverallEvaluation @on-jump="onJump" v-if="tabNum === '5'" />
      </el-tab-pane>
      <el-tab-pane label="方案设计管理" name="6" lazy>
        <template #label>
          <span>
            <i class="iconfont icon-shejiguanli" />
            <span>方案设计管理</span>
          </span>
        </template>
        <HPlanManage @on-jump="onJump" v-if="tabNum === '6'" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      v-model="dialogFormVisible"
      :title="setMealtitle"
      :close-on-click-modal="false"
      destroy-on-close
      @close="handleCancel(ruleFormRef)"
      width="600px"
    >
      <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
        <el-form-item label="开始时间：" prop="expiredStartDate">
          <el-date-picker
            v-model="dialogForm.expiredStartDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="结束时间：" prop="expiredEndDate">
          <el-date-picker
            v-model="dialogForm.expiredEndDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="handleSubmit(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getSetMealBillInfo,updateSetMealBillExpiredDate } from '@/api/heightManageCom/h-home'
import { onMounted, reactive, ref, provide, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CirclePlusFilled, CaretRight } from '@element-plus/icons-vue'
import { checkSameData, compareDate } from '@/utils/util'
import { sexFilter } from '@/utils/filters'
import HHome from './components/h-home/h-home.vue'
import HBirthHeredity from './components/h-birth-heredity/h-birth-heredity.vue'
import HHistoryHeight from './components/h-history-height/h-history-height.vue'
import HLifeWay from './components/h-life-way/h-life-way.vue'
import HOverallEvaluation from './components/h-overall-evaluation/h-overall-evaluation.vue'
import HPlanManage from './components/h-plan-manage/h-plan-manage.vue'
import { ElMessage } from 'element-plus'

const tabNum = ref('1')
const isActiveTabClosing = ref(false)  // 记录上一个tab是否正在关闭
const route = useRoute()
const customerUid = route.query.customerUid
const setMealBillUid = route.query.setMealBillUid

const customerObj = reactive({
  customerName: '',
  ageStr: '',
  sex: '',
  sexStr: '',
  birthday: '',
  phone: '',
  setMealName: '',
  tenantName: '',
  expiredStartDate: '',
  expiredEndDate: '',
  status: '',
  remark: '',
  lastAddTime: '',
  currentTime: '', // 当前时间
  uid: ''
})

const ruleFormRef = ref(null)
const dialogFormVisible = ref(false)
const setMealtitle = ref('')
const dialogForm = reactive({
  expiredStartDate: '',
  expiredEndDate: ''
})

const rules = reactive({
  expiredStartDate: [{ required: true, message: '请选择添加开始时间', trigger: 'change' }],
  expiredEndDate: [{ required: true, message: '请选择添加结束时间', trigger: 'change' }],
})

const isCloseStatus = computed(() => {
  return compareDate(customerObj.expiredEndDate, customerObj.currentTime)
})


const tabChange = (name) => {
  tabNum.value = name
}

const onJump = (val) => {
  tabChange(val)
}

// 获取身高管理信息
const _getSetMealBillInfo = () => {
  getSetMealBillInfo(setMealBillUid).then((res) => {
    const {
      customerName,
      sex,
      birthday,
      ageStr,
      phone,
      setMealName,
      tenantName,
      expiredStartDate,
      expiredEndDate,
      status,
      remark,
      uid,
      lastAddTime,
      currentTime
    } = res.datas
    customerObj.customerName = customerName
    customerObj.sex = sex
    customerObj.sexStr = sexFilter(sex)
    customerObj.birthday = birthday
    customerObj.ageStr = ageStr
    customerObj.phone = phone
    customerObj.setMealName = setMealName
    customerObj.tenantName = tenantName
    customerObj.expiredStartDate = expiredStartDate
    customerObj.expiredEndDate = expiredEndDate
    customerObj.status = status
    customerObj.remark = remark
    if (lastAddTime) customerObj.lastAddTime = lastAddTime.slice(0, 10)
    if (currentTime) customerObj.currentTime = currentTime.slice(0, 10)
    customerObj.uid = uid // 开单的uid
  })
}

const modifySetMealTime = () => {
  dialogFormVisible.value = true
  setMealtitle.value = `正在修改${customerObj.customerName}的套餐时间`
  dialogForm.expiredStartDate = customerObj.expiredStartDate
  dialogForm.expiredEndDate = customerObj.expiredEndDate
}

const handleCancel = (formEl) => {
  if (!formEl) retur
  dialogFormVisible.value = false
  formEl.resetFields()
}

const handleSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      _updateSetMealBillExpiredDate()
    }
  })
}

const _updateSetMealBillExpiredDate = () => {
  let data = {
    ...dialogForm,
    setMealBillUid
  }
  updateSetMealBillExpiredDate(data).then(res => {
    if(res.msg === 'success') {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '修改成功！'
      })
      dialogFormVisible.value = false
      _getSetMealBillInfo()
    }
  })
}

onMounted(() => {
  _getSetMealBillInfo()
})

provide('customerObj', customerObj)
provide('customerUid', customerUid)
provide('setMealBillUid', setMealBillUid)
provide('isCloseStatus', isCloseStatus)
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
.customer-title {
  padding-bottom: 30px;
  .title-left {
    display: inline-block;
    span {
      margin-right: 10px;
    }
  }
  .title-right {
    display: inline-block;
    margin-left: 20px;
    span {
      margin-right: 10px;
    }
  }
}

.el-tabs--card {
  :deep(.el-tabs__header) {
    margin: 0 0 20px;
    .is-active {
      border-bottom: 2px solid $panGreen;
    }
  }
}
</style>
