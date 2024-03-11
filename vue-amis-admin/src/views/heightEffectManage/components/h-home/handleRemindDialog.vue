<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="处理提醒"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="执行内容：" prop="content">
        <el-input v-model="dialogForm.content" type="textarea" :rows="5" placeholder="请输入" maxlength="200" />
      </el-form-item>
      <el-form-item label="执行状态：" prop="status">
        <el-radio-group v-model="dialogForm.status" @change="handleChangeActive">
          <el-radio :label="1">已执行</el-radio>
          <el-radio :label="0">未执行(可修改下次提醒)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实际执行日期：" prop="executeDate" v-if="dialogForm.status === 1">
        <el-date-picker
          v-model="dialogForm.executeDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择"
          style="width: 265px"
        />
      </el-form-item>
      <el-form-item label="调整执行日期：" prop="executeDate" v-if="dialogForm.status === 0">
        <el-date-picker
          v-model="dialogForm.executeDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择"
          style="width: 265px"
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
</template>

<script setup>
import { updateRemind } from '@/api/heightManageCom/h-home'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({})
const emit = defineEmits(['refreshList'])

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let dialogForm = reactive({
  content: '',
  status: 0,
  executeDate: '',
  uid: ''
})

const rules = reactive({
  content: [{ required: true, message: '请输入执行内容', trigger: 'blur' }],
  executeDate: [{ required: true, message: '请选择开始执行日期', trigger: 'change' }]
})

const remindDetail = (dataDetail) => {
  const { content, status, executeDate, uid } = dataDetail
  dialogForm.content = content
  dialogForm.status = status
  dialogForm.executeDate = executeDate
  dialogForm.uid = uid
}

const handleChangeActive = (value) => {
  dialogForm.active = value
}

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  await formEl.validate((valid) => {
    if (valid) {
      syncApi = updateRemind(dialogForm)
      implement(syncApi, '处理提醒')
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
  dialogFormVisible,
  remindDetail
})
</script>

<style lang="scss" scoped></style>
