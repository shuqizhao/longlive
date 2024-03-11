<template>
  <div class="app-container">
    <el-form :model="dialogForm" label-width="120px" class="h-ruleForm" :rules="rules" ref="ruleFormRef">
      <div class="form-title">出生情况</div>
      <el-form-item label="出生日期：">
        <el-date-picker
          v-model="customerObj.birthday"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
          style="width: 180px"
          disabled
        />
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="customerObj.sexStr" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="出生身高：" prop="height">
        <el-input v-model="dialogForm.height" placeholder="请输入" maxlength="50" />
        <span class="end-unit">cm 百分位值：{{ percentForm.heightPercent }}th</span>
      </el-form-item>
      <el-form-item label="出生体重：" prop="weight">
        <el-input v-model="dialogForm.weight" placeholder="请输入" maxlength="50" />
        <span class="end-unit">kg 百分位值：{{ percentForm.weightPercent }}th</span>
      </el-form-item>
      <el-form-item label="孕周：" prop="gestationalAge">
        <el-input v-model="dialogForm.gestationalAge" placeholder="请输入" maxlength="50" />
        <span class="end-unit">周</span>
      </el-form-item>
      <div class="form-title">家庭情况</div>
      <el-form-item label="父亲身高：" prop="fatherHeight">
        <el-input v-model="dialogForm.fatherHeight" placeholder="请输入" maxlength="100" @blur="fatherHeightBlur" />
        <span class="end-unit">cm</span>
      </el-form-item>
      <el-form-item label="父亲体重：" prop="fatherWeight">
        <el-input v-model="dialogForm.fatherWeight" placeholder="请输入" maxlength="50" />
        <span class="end-unit">kg</span>
      </el-form-item>
      <el-form-item label="母亲身高：" prop="motherHeight">
        <el-input v-model="dialogForm.motherHeight" placeholder="请输入" maxlength="50" @blur="motherHeightBlur" />
        <span class="end-unit">cm</span>
      </el-form-item>
      <el-form-item label="母亲体重：" prop="motherWeight">
        <el-input v-model="dialogForm.motherWeight" placeholder="请输入" maxlength="50" />
        <span class="end-unit">kg</span>
      </el-form-item>
      <div class="form-title">成年身高情况</div>
      <el-form-item label="遗传公式：" prop="geneticFormula">
        <el-radio-group v-model="dialogForm.geneticFormula" @change="handleChangeActive" v-if="customerObj.sex === '0'">
          <el-radio :label="0">男生遗传身高 = （父亲身高 + 母亲身高 + 12）/ 2</el-radio>
          <el-radio :label="1">男生遗传身高 = （父亲身高 + 母亲身高 + 13）/ 2</el-radio>
        </el-radio-group>
        <el-radio-group v-model="dialogForm.geneticFormula" @change="handleChangeActive" v-if="customerObj.sex === '1'">
          <el-radio :label="0">女生遗传身高 = （父亲身高 + 母亲身高 - 12）/ 2</el-radio>
          <el-radio :label="1">女生遗传身高 = （父亲身高 + 母亲身高 - 13）/ 2</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="遗传身高：" prop="geneticsHeight">
        <el-input v-model="dialogForm.geneticsHeight" disabled />
        <span class="end-unit">cm 百分位值：{{ percentForm.geneticsHeightPercent }}th</span>
      </el-form-item>
      <el-form-item label="潜能身高：">
        <el-input v-model="dialogForm.potentialHeightLower" disabled />
        <span style="padding: 0 10px">-</span>
        <el-input v-model="dialogForm.potentialHeightUpper" disabled />
        <span class="end-unit">cm</span>
      </el-form-item>
      <el-form-item label="期望身高：" prop="expectHeight">
        <el-input v-model="dialogForm.expectHeight" placeholder="请输入" maxlength="50" />
        <span class="end-unit">cm 百分位值：{{ percentForm.expectHeightPercent }}th</span>
      </el-form-item>
      <el-form-item label="未来职业需求：" prop="profession">
        <el-input
          v-model="dialogForm.profession"
          type="textarea"
          :rows="4"
          placeholder="限200字符"
          maxlength="200"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getBirthGenetics, saveBirthGenetics, getHeightCustomization } from '@/api/heightManageCom/h-birth-heredity'
import { ref, reactive, onMounted, computed, watch, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { sexFilter } from '@/utils/filters'
import { countHeight } from '@/utils/util'

const props = defineProps({
  customerObj: {
    type: Object
  }
})

const customerUid = inject('customerUid')
const ruleFormRef = ref(null)

let dialogForm = reactive({
  height: '', // 出生身高
  weight: '', //出生体重
  gestationalAge: '', // 孕周
  fatherHeight: '',
  fatherWeight: '',
  motherHeight: '',
  motherWeight: '',

  geneticFormula: 1,
  geneticsHeight: 0, // 遗传身高
  potentialHeightLower: 0, // 潜能身高下
  potentialHeightUpper: 0, // 潜能身高上
  expectHeight: '', // 期望身高
  profession: '',
  uid: '',
  customerUid: ''
})

const percentForm = reactive({
  heightPercent: 0,
  weightPercent: 0,
  geneticsHeightPercent: 0,
  expectHeightPercent: 0
})

const rules = reactive({
  height: [
    { required: true, message: '请输入出生身高', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  weight: [
    { required: true, message: '请输入出生体重', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  gestationalAge: [
    { required: true, message: '请输入孕周', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  fatherHeight: [
    { required: true, message: '请输入父亲身高', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  motherHeight: [
    { required: true, message: '请输入母亲身高', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  expectHeight: [
    { required: true, message: '请输入期望身高', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9]+([.][0-9]{1,})?$/, message: '请输入正确的数字', trigger: 'blur' }
  ]
})

//计算遗传身高和潜能身高--监听父身高
watch(
  () => dialogForm.fatherHeight,
  (newVal, oldVal) => {
    commonFn(dialogForm.fatherHeight, dialogForm.motherHeight, dialogForm.geneticFormula, props.customerObj.sex)
  },
  { deep: true }
)

//计算遗传身高和潜能身高--监听母身高
watch(
  () => dialogForm.motherHeight,
  (newVal, oldVal) => {
    commonFn(dialogForm.fatherHeight, dialogForm.motherHeight, dialogForm.geneticFormula, props.customerObj.sex)
  },
  { deep: true }
)

//  改变遗传公式
const handleChangeActive = (value) => {
  commonFn(dialogForm.fatherHeight, dialogForm.motherHeight, value, props.customerObj.sex)
}

// 公共提取
const commonFn = (hVal, wVal, genVal, sexVal) => {
  if (!dialogForm.fatherHeight || !dialogForm.motherHeight) {
    dialogForm.geneticsHeight = 0
    return
  }
  let reg = /^[0-9]+([.][0-9]{1,})?$/
  if (!reg.test(dialogForm.fatherHeight) || !reg.test(dialogForm.motherHeight)) {
    dialogForm.geneticsHeight = 0
    return
  }
  dialogForm.geneticsHeight = countHeight(hVal, wVal, genVal, sexVal)
  dialogForm.potentialHeightLower = dialogForm.geneticsHeight - 6.5
  dialogForm.potentialHeightUpper = dialogForm.geneticsHeight + 6.5
  _getHeightCustomization()
}

// 根据开单Uid获取出生&遗传信息
const _getBirthGenetics = () => {
  getBirthGenetics(customerUid).then((res) => {
    const {
      height,
      weight,
      gestationalAge,
      fatherHeight,
      fatherWeight,
      motherHeight,
      motherWeight,
      geneticFormula,
      geneticsHeight,
      potentialHeightLower,
      potentialHeightUpper,
      expectHeight,
      profession,
      uid,
      customerUid
    } = res.datas
    ;(dialogForm.height = height), // 出生身高
      (dialogForm.weight = weight), //出生体重
      (dialogForm.gestationalAge = gestationalAge), // 孕周
      (dialogForm.fatherHeight = fatherHeight),
      (dialogForm.fatherWeight = fatherWeight),
      (dialogForm.motherHeight = motherHeight),
      (dialogForm.motherWeight = motherWeight),
      (dialogForm.geneticFormula = geneticFormula || 1),
      (dialogForm.geneticsHeight = geneticsHeight), // 遗传身高
      (dialogForm.potentialHeightLower = potentialHeightLower), // 潜能身高下
      (dialogForm.potentialHeightUpper = potentialHeightUpper), // 潜能身高上
      (dialogForm.expectHeight = expectHeight), // 期望身高
      (dialogForm.profession = profession),
      (dialogForm.uid = uid),
      (dialogForm.customerUid = customerUid)
  })
}

const commonBirth = () => {
  if (!dialogForm.height || !dialogForm.weight) {
    return
  }
  if (dialogForm.height.length < 2) {
    return
  }
  let reg = /^[0-9]+([.][0-9]{1,})?$/
  if (!reg.test(dialogForm.height)) {
    return
  }
  if (!reg.test(dialogForm.weight)) {
    return
  }
  _getHeightCustomization()
}

//计算百分比--监听出生身高
watch(
  () => dialogForm.height,
  (newVal, oldVal) => {
    commonBirth()
  },
  { deep: true }
)

//计算百分比---监听出生体重
watch(
  () => dialogForm.weight,
  (newVal, oldVal) => {
    commonBirth()
  },
  { deep: true }
)

//计算百分比--监听期望身高
watch(
  () => dialogForm.expectHeight,
  (newVal, oldVal) => {
    if (!dialogForm.expectHeight) {
      return
    }
    let reg = /^[0-9]+([.][0-9]{1,})?$/
    if (!reg.test(dialogForm.expectHeight)) {
      return
    }
    _getHeightCustomization()
  },
  { deep: true }
)

// 算法定制接口,计算潜能身高和百分位
const _getHeightCustomization = () => {
  let data = {
    birth: props.customerObj.birthday,
    sex: props.customerObj.sex,
    height: dialogForm.height,
    weight: dialogForm.weight,
    geneticHeight: String(dialogForm.geneticsHeight), // 遗传身高
    expectedHeight: dialogForm.expectHeight, // 期望身高
    diagnosisTime: props.customerObj.birthday
  }
  getHeightCustomization(data).then((res) => {
    percentForm.heightPercent = res.datas.heightPer
    percentForm.weightPercent = res.datas.weightPer
    percentForm.geneticsHeightPercent = res.datas.geneticHeightPer
    percentForm.expectHeightPercent = res.datas.expectedHeightPer
  })
}

onMounted(() => {
  _getBirthGenetics()
})

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  let subData = {
    ...dialogForm,
    ...percentForm
  }
  subData.customerUid = customerUid

  await formEl.validate((valid) => {
    if (valid) {
      saveBirthGenetics(subData).then((res) => {
        ElMessage({
          showClose: true,
          type: 'success',
          message: '保存成功！'
        })
        _getBirthGenetics()
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.h-ruleForm {
  .el-input {
    width: 180px;
  }
  .form-title {
    font-weight: 700;
    margin: 0 0 10px 20px;
  }
  .end-unit {
    padding-left: 10px;
  }
}
</style>
