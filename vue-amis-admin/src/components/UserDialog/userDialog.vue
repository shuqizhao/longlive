<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="diaTitle"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="100px" :rules="rules" ref="ruleFormRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="dialogForm.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker
              v-model="dialogForm.birthday"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="dialogForm.sex" placeholder="请选择" clearable style="width: 100%">
              <el-option v-for="item in sexTypes" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="dialogForm.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类型：" prop="idType">
            <el-select v-model="dialogForm.idType" placeholder="请选择" clearable style="width: 100%">
              <el-option v-for="item in idCardTypes" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码：" prop="idNumber">
            <el-input v-model="dialogForm.idNumber" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="住址：" prop="address">
        <el-input v-model="dialogForm.address" type="textarea" :rows="3" placeholder="请输入" maxlength="100" />
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
import { customerAdd, customerUpdate, customerDetail } from '@/api/userManage'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { sexTypes, idCardTypes } from '@/utils/config'

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
  birthday: '',
  sex: '',
  phone: '',
  idType: '',
  idNumber: '',
  address: '',
  uid: ''
})

const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { type: 'string', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  idNumber: [{ type: 'string', pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号', trigger: 'blur' }]
})

// 详情
const _customerDetail = (uid) => {
  customerDetail(uid).then((res) => {
    const { name, birthdayStr, sex, phone, idType, idNumber, address, uid } = res.datas
    dialogForm.name = name
    dialogForm.birthday = birthdayStr
    dialogForm.sex = sex
    dialogForm.phone = phone
    dialogForm.idType = idType
    dialogForm.idNumber = idNumber
    dialogForm.address = address
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
        syncApi = customerUpdate(dialogForm)
        implement(syncApi, '编辑')
      } else {
        syncApi = customerAdd(dialogForm)
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
  _customerDetail
})
</script>

<style lang="scss" scoped></style>
