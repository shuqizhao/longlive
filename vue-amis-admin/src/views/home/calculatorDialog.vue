<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="身高百分位计算器"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="100px" :rules="rules" ref="ruleFormRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别：">
            <el-radio-group v-model="dialogForm.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期：" prop="birth">
            <el-date-picker
              v-model="dialogForm.birth"
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
          <el-form-item label="身高：" prop="height">
            <el-input v-model="dialogForm.height" placeholder="请输入">
              <template #append>cm</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="诊断日期：" prop="diagnosisTime">
            <el-date-picker
              v-model="dialogForm.diagnosisTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="result">
      <p class="result-title">结果</p>
      <p>年龄：<span v-if="resultInfo.lifeAge">{{resultInfo.lifeAge}}岁</span></p>
      <p>身高百分位：<span v-if="resultInfo.heightPer">{{resultInfo.heightPer}}th</span></p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(ruleFormRef)">关闭</el-button>
        <el-button type="primary" @click="handleCount(ruleFormRef)">计算</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { getHeightCustomization } from '@/api/heightManageCom/h-birth-heredity'
import { calculateLifeAge } from '@/api/heightManageCom/h-history-height'
import { reactive, ref } from 'vue'
import { toDay } from '@/utils/util'

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let dialogForm = reactive({
  sex: '0',
  birth: '',
  height: '',
  diagnosisTime: toDay()
})

const resultInfo = reactive({
  lifeAge: '',
  heightPer: ''
})

const rules = reactive({
  birth: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
  height: [
    { required: true, message: '请输入身高', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  diagnosisTime: [
    { required: true, message: '请选择诊断日期', trigger: 'change' }
  ],
})

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  dialogFormVisible.value = false
  resultInfo.lifeAge = ''
  resultInfo.heightPer = ''
  formEl.resetFields()
}

const handleCount = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      _calculateLifeAge()
      _getHeightCustomization()
    }
  })
}

const _calculateLifeAge = () => {
  const data = {
    birthday: dialogForm.birth,
    addTime: dialogForm.diagnosisTime,
  }
  calculateLifeAge(data).then((res) => {
    resultInfo.lifeAge = res.msg
  })
}


const _getHeightCustomization = () => {
  let data = {
    ...dialogForm,
    weight: '5'
  }
  getHeightCustomization(data).then(res => {
    resultInfo.heightPer = res.datas.heightPer
  })
}

defineExpose({
  dialogFormVisible,
})
</script>

<style lang="scss" scoped>
.result{
  margin:10px;
  p{
    padding: 3px 0;
  }
  .result-title{
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
