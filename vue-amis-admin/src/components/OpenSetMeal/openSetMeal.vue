<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="开套餐"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="700px"
  >
    <el-form :model="dialogForm" label-width="100px" :rules="rules" ref="ruleFormRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="name">
            <el-popover placement="bottom-start" :width="500" trigger="click" v-model:visible="visibleStatus">
              <template #reference>
                <el-input
                  v-model="dialogForm.name"
                  placeholder="请输入姓名后选择"
                  :suffix-icon="Search"
                  clearable
                  @click="querySearchName(dialogForm.name)"
                  @keyup="querySearchName(dialogForm.name)"
                  @clear="seekNameClear"
                />
              </template>
              <el-table
                :data="gridData"
                @row-click="handleSelect"
                style="width: 100%; max-height: 500px; overflow: scroll"
              >
                <el-table-column label="姓名" align="center" min-width="100px">
                  <template v-slot="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="出生日期" align="center" min-width="100px">
                  <template v-slot="scope">
                    <span>{{ scope.row.birthdayStr }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="性别" align="center" min-width="50px">
                  <template v-slot="scope">
                    <span>{{ sexFilter(scope.row.sex) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="电话" align="center" min-width="100px">
                  <template v-slot="scope">
                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker v-model="dialogForm.birthday" type="date" placeholder="请选择" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="dialogForm.sex" placeholder="请选择" clearable style="width: 100%" disabled>
              <el-option v-for="item in sexTypes" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="dialogForm.phone" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类型：" prop="idType">
            <el-select v-model="dialogForm.idType" placeholder="请选择" clearable style="width: 100%" disabled>
              <el-option v-for="item in idCardTypes" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码：" prop="idNumber">
            <el-input v-model="dialogForm.idNumber" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="住址：" prop="address">
        <el-input
          v-model="dialogForm.address"
          type="textarea"
          :rows="3"
          placeholder="请输入"
          maxlength="100"
          disabled
        />
      </el-form-item>
      <el-form-item label="选择套餐：">
        <el-popover placement="bottom" :width="560" trigger="click" v-model:visible="nameVisible" style="right: 0">
          <template #reference>
            <el-input
              ref="inputRef"
              v-model="dialogForm.setMealName"
              class="w-50"
              @input="querySearch(dialogForm.setMealName)"
              @focus="querySearch(dialogForm.setMealName)"
              @clear="queryClear(dialogForm.setMealName)"
              @blur="queryBlur"
              clearable
              :suffix-icon="Search"
            />
          </template>
          <el-table
            :data="resSetMealData"
            @row-click="handleRowClick"
            style="width: 100%; max-height: 500px; overflow-y: auto"
          >
            <el-table-column label="套餐名称" align="center" min-width="100px">
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="套餐时长" align="center" min-width="100px">
              <template v-slot="scope">
                <span>{{ scope.row.duration }}个月</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" align="center" min-width="100px">
              <template v-slot="scope">
                <span>￥{{ scope.row.price }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-popover>
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
import { customerDetail, drawBill, customerList } from '@/api/userManage'
import { customerStatusList } from '@/api/heightManageCom/list'
import { validSetMealList } from '@/api/setMealManage'

import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { sexTypes, idCardTypes } from '@/utils/config'
import { debounce } from '@/utils/util'
import useOpenSetMeal from '@/views/userManage/use-open-setMeal'
import { sexFilter } from '@/utils/filters'
import { useRouter } from 'vue-router'

const props = defineProps({
  diaTitle: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const emit = defineEmits(['refreshList'])
// const { resSetMealData,querySearch } = useOpenSetMeal()

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)
const nameVisible = ref(false)
const inputRef = ref(null)
const resSetMealData = ref([])

let dialogForm = reactive({
  name: '',
  birthday: '',
  sex: '',
  phone: '',
  idType: '',
  idNumber: '',
  address: '',
  uid: '',
  setMealUid: '', // 套餐
  setMealName: ''
})

const visibleStatus = ref(false)
const gridData = ref([])

const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
  birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { type: 'string', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  setMealName: [{ required: true, message: '请选择套餐', trigger: 'blur' }]
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

let debounceTimer = null
const querySearchName = (queryName) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    // 执行搜索逻辑
    _querySearchName(queryName)
  }, 500) // 500毫秒的防抖延迟
}

// 搜索姓名
const _querySearchName = (queryName) => {
  visibleStatus.value = false
  customerList({ nameOrPhone: queryName }, { pageNum: 1, pageSize: 100 }).then((res) => {
    visibleStatus.value = true
    gridData.value = res.datas
  })
}

const handleSelect = (item) => {
  visibleStatus.value = false
  dialogForm.name = item.name
  dialogForm.birthday = item.birthdayStr
  dialogForm.sex = Number(item.sex)
  dialogForm.phone = item.phone
  dialogForm.idType = item.idType
  dialogForm.idNumber = item.idNumber
  dialogForm.address = item.address
  dialogForm.uid = item.uid
}

const seekNameClear = () => {
  dialogForm.name = ''
  dialogForm.birthday = ''
  dialogForm.sex = ''
  dialogForm.phone = ''
  dialogForm.idType = ''
  dialogForm.idNumber = ''
  dialogForm.address = ''
  dialogForm.uid = ''
  visibleStatus.value = false
}

// ---------------------------
const querySearch = (queryString) => {
  nameVisible.value = true
  loadAll(queryString)
}

const loadAll = (queryString) => {
  validSetMealList({ name: queryString }).then((res) => {
    resSetMealData.value = res.datas
  })
}

const queryClear = () => {
  loadAll()
  nextTick(() => {
    inputRef.value.focus()
  })
}

const handleRowClick = (item) => {
  dialogForm.setMealUid = item.uid
  dialogForm.setMealName = item.name
  nameVisible.value = false
}

const queryBlur = () => {
  nameVisible.value = false
}

// 保存
const handleSubmit = async (formEl) => {
  if (!dialogForm.setMealName) {
    ElMessage({
      type: 'error',
      message: '请选择套餐'
    })
    return
  }
  if (!formEl) return
  let syncApi
  let data = {
    billUid: dialogForm.setMealUid,
    customerUid: dialogForm.uid
  }
  await formEl.validate((valid) => {
    if (valid) {
      drawBill(data).then((res) => {
        ElMessage({
          showClose: true,
          type: 'success',
          message: '开单成功！'
        })
        dialogFormVisible.value = false
        dialogForm.uid = ''
        dialogForm.setMealName = ''
        dialogForm.setMealUid = ''
        emit('refreshList')
        ruleFormRef.value.resetFields()
        goManage(data, res.msg)
      })
    }
  })
}

// 开完套餐后，直接跳转过去
const goManage = (data, setMealBillUid) => {
  router.push({
    path: '/heightEffectManage/heightManageCom',
    query: {
      customerUid: data.customerUid,
      setMealBillUid: setMealBillUid
    }
  })
}

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  dialogFormVisible.value = false
  visibleStatus.value = false
  formEl.resetFields()
  dialogForm.setMealName = ''
  dialogForm.setMealUid = ''
}

onMounted(() => {
  loadAll()
})

defineExpose({
  dialogFormVisible,
  _customerDetail
})
</script>

<style lang="scss" scoped>
@import '@/styles/scrollbar.scss';
</style>
