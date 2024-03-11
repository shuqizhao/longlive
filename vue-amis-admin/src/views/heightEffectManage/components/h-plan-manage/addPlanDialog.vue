<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="添加方案"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="方案名称：" prop="name">
        <el-input v-model="dialogForm.name" placeholder="请输入" maxlength="100" />
      </el-form-item>
      <el-form-item label="方案类型：">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
          >全部</el-checkbox
        >
        <el-checkbox-group v-model="checkedPlans" @change="handleCheckedPlans">
          <el-checkbox v-for="item in planTypes" :key="item.label" :label="item.key">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { addPlanDesign } from '@/api/heightManageCom/h-plan-manage'
import { reactive, ref, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { planTypes } from '@/utils/config'

const customerObj = inject('customerObj')
const customerUid = inject('customerUid')

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)
const checkAll = ref(true)
const isIndeterminate = ref(false)

const planObj = reactive({
  heightGrowthRateDesign: true,
  nutrientGuidance: true,
  dietaryGuidance: true,
  sportsGuidance: true,
  sleepGuidance: true,
  emotionGuidance: true
})

const emit = defineEmits(['refreshList'])
const checkedPlans = ref([
  'heightGrowthRateDesign',
  'nutrientGuidance',
  'dietaryGuidance',
  'sportsGuidance',
  'sleepGuidance',
  'emotionGuidance'
])

const dialogForm = reactive({
  customerUid: customerUid,
  name: ''
})

const rules = reactive({
  name: [{ required: true, message: '请填写方案名称', trigger: 'blur' }]
})

const handleCheckAllChange = (val) => {
  let keyArr = []
  planTypes.forEach((item) => {
    keyArr.push(item.key)
  })
  checkedPlans.value = val ? keyArr : []
  isIndeterminate.value = false
}

const handleCheckedPlans = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === planTypes.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < planTypes.length
}

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      _addPlanDesign()
    }
  })
}

// 添加方案
const _addPlanDesign = () => {
  if (checkedPlans.value.length === 0) {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '请至少选择一个方案类型'
    })
    return
  }
  for (let key in planObj) {
    if (checkedPlans.value.includes(key)) {
      planObj[key] = true
    } else {
      planObj[key] = false
    }
  }
  let subData = {
    ...dialogForm,
    ...planObj
  }
  addPlanDesign(subData).then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: '添加成功！'
    })
    dialogFormVisible.value = false
    emit('refreshList', res.datas)
    ruleFormRef.value.resetFields()
  })
}

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  dialogFormVisible.value = false
  formEl.resetFields()
}

defineExpose({
  dialogFormVisible
})
</script>

<style lang="scss" scoped></style>
