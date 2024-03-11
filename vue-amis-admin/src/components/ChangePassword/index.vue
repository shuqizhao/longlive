<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="修改密码"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
    @close="handleCancel(ruleFormRef)"
    width="600px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="机构码：">
        <el-input v-model="dialogForm.abbreviation" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="账号：">
        <el-input v-model="dialogForm.username" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="新密码：" prop="password">
        <el-input v-model="dialogForm.password" placeholder="请输入" minlength="6" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="dialogForm.confirmPassword" placeholder="请输入" />
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
import { updatePassword } from '@/api/myWork';
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

const dialogForm = reactive({
  abbreviation: userInfo.jwt_user_abbreviation || '',
  username: userInfo.jwt_user_phone || '',
  password: '',
  confirmPassword: ''
})


const rules = reactive({
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { type: 'string', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,50}$/, message: '必须大于或等于6位数，并且是数字和字母的组合', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { type: 'string', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,50}$/, message: '必须大于或等于6位数，并且是数字和字母的组合', trigger: 'blur' }
  ],
})

const handleCancel = (formEl) => {
  if (!formEl) retur
  dialogFormVisible.value = false
  formEl.resetFields()
}

const handleSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      _updatePassword()
    }
  })
}

const _updatePassword = () => {
  let data = {
    "password": dialogForm.password,
    "confirmPassword": dialogForm.confirmPassword
  }
  updatePassword(data).then(res => {
    if(res.msg === 'success') {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '修改成功！'
      })
      dialogFormVisible.value = false
    }
  })
}

defineExpose({
  dialogFormVisible
})

</script>

<style lang="scss" scoped>

</style>
