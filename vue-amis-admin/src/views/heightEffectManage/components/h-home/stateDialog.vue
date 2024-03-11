<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="添加状态"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="状态：" prop="status">
        <el-select v-model="dialogForm.status" placeholder="请选择" clearable style="width: 100%">
          <el-option v-for="(value, key) in allStatusData" :key="key" :label="value" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <div class="color-orange link-tag">
          <el-link type="primary" v-for="(item, index) in tagList" :key="index" @click="handleTag(item)">{{
            item
          }}</el-link>
        </div>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="dialogForm.remark" type="textarea" :rows="5" placeholder="请输入备注" maxlength="500" />
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
import { getAllSetMealBillStatus, addSetMealBillStatus } from '@/api/heightManageCom/h-home'
import { reactive, ref, inject } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  allStatusData: {
    type: Object
  }
})
const setMealBillUid = inject('setMealBillUid')
const emit = defineEmits(['refreshList'])

const tagList = ['随访膳食', '随访体重', '随访运动', '随访睡眠', '随访营养素', '管理到期续卡']

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let dialogForm = reactive({
  setMealBillUid: setMealBillUid,
  status: '',
  remark: ''
})

const rules = reactive({
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
})

const handleTag = (item) => {
  dialogForm.remark += item
}

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  await formEl.validate((valid) => {
    if (valid) {
      syncApi = addSetMealBillStatus(dialogForm)
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

<style lang="scss" scoped>
.link-tag {
  a {
    margin-right: 10px;
  }
}
</style>
