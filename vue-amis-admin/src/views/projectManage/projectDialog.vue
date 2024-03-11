<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="diaTitle"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="项目名称：" prop="name">
        <el-input v-model="dialogForm.name" placeholder="请输入" maxlength="100" />
      </el-form-item>
      <el-form-item label="价格：" prop="price">
        <el-input v-model="dialogForm.price" placeholder="请输入" maxlength="50" />
      </el-form-item>
      <el-form-item label="是否启用：" prop="active">
        <el-switch v-model="dialogForm.active" active-text="启用" inactive-text="停用" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { projectAdd, projectUpdate, projectDetail } from '@/api/projectManage'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  diaTitle: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['refreshList'])

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let dialogForm = reactive({
  name: '',
  price: '',
  active: false,
  uid: ''
})

const rules = reactive({
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的价格', trigger: 'blur' }
  ]
})

// 详情
const _projectDetail = (uid) => {
  projectDetail(uid).then((res) => {
    const { name, price, active, uid } = res.datas
    dialogForm.name = name
    dialogForm.price = String(price)
    dialogForm.active = active
    dialogForm.uid = uid
  })
}

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  await formEl.validate((valid) => {
    if (valid) {
      if (dialogForm.uid) {
        syncApi = projectUpdate(dialogForm)
        implement(syncApi, '编辑')
      } else {
        syncApi = projectAdd(dialogForm)
        implement(syncApi, '新增')
      }
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
  _projectDetail
})
</script>

<style lang="scss" scoped></style>
