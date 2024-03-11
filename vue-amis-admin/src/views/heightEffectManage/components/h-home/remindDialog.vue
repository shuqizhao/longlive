<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="添加提醒"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="执行内容：" prop="content">
        <el-input v-model="dialogForm.content" type="textarea" :rows="5" placeholder="请输入" maxlength="200" />
      </el-form-item>
      <el-form-item label="开始执行日期：" prop="executeDate">
        <el-date-picker
          v-model="dialogForm.executeDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="间隔天数(周期)：" prop="intervalPeriod">
        <el-input-number v-model="dialogForm.intervalPeriod" :min="1" :max="10" @change="handleChange" />
      </el-form-item>
      <el-form-item label="执行总次数：" prop="totalNum">
        <el-input-number v-model="dialogForm.totalNum" :min="1" :max="10" @change="handleChange" />
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
import { addRemind } from '@/api/heightManageCom/h-home'
import { reactive, ref, inject } from 'vue'
import { ElMessage } from 'element-plus'

const setMealBillUid = inject('setMealBillUid')
const emit = defineEmits(['refreshList'])

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let dialogForm = reactive({
  content: '',
  executeDate: '',
  intervalPeriod: 1,
  totalNum: 1,
  setMealBillUid: setMealBillUid
})

const rules = reactive({
  content: [{ required: true, message: '请输入执行内容', trigger: 'blur' }],
  executeDate: [{ required: true, message: '请选择开始执行日期', trigger: 'change' }]
})

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  await formEl.validate((valid) => {
    if (valid) {
      syncApi = addRemind(dialogForm)
      implement(syncApi, '添加')
    }
  })
}

const implement = (fn, msg) => {
  fn.then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: msg + '成功！'
    })
    dialogFormVisible.value = false
    dialogForm.uid = ''
    emit('refreshList')
    ruleFormRef.value.resetFields()
  })
}

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  dialogFormVisible.value = false
  dialogForm.uid = ''
  formEl.resetFields()
}

defineExpose({
  dialogFormVisible
})
</script>

<style lang="scss" scoped></style>
