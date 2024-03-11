<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="diaTitle"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="900px"
  >
    <el-form :model="dialogForm" label-width="100px" :rules="rules" ref="ruleFormRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="套餐名称：" prop="name">
            <el-input v-model="dialogForm.name" placeholder="请输入" maxlength="100" :disabled="isDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="套餐时长：" prop="duration">
            <el-select
              v-model="dialogForm.duration"
              placeholder="请选择"
              clearable
              style="width: 100%"
              :disabled="isDisabled"
            >
              <el-option v-for="item in durationTypes" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="计算价格：" prop="originalPrice">
            <el-input
              v-model="dialogForm.originalPrice"
              placeholder="选择项目后自动计算出来"
              maxlength="100"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门诊定价：" prop="price">
            <el-input v-model="dialogForm.price" placeholder="请输入" maxlength="50" :disabled="isDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否启用：" prop="active">
            <el-switch v-model="dialogForm.active" active-text="启用" inactive-text="停用" :disabled="isDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="field">
        <span class="feild-left">项目明细</span>
        <el-button type="primary" size="small" @click="addLine" v-if="!isDisabled">添加行</el-button>
      </div>
      <el-table :data="tableList" v-loading="tableLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column :label="'序号'" min-width="50px" align="center">
          <template v-slot="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'项目名称'" min-width="150px" align="center">
          <template v-slot="scope">
            <el-autocomplete
              ref="autoRef"
              style="width: 100%"
              popper-class="my-autocomplete"
              :class="[scope.row.name ? '' : 'isError']"
              v-model="scope.row.name"
              :fetch-suggestions="querySearch2"
              clearable
              @select="(item) => handleSelect(item, scope.$index)"
              @change="(value) => handleChangeName(value, scope.$index)"
              placeholder="请输入"
              maxlength="30"
              value-key="name"
              :disabled="isDisabled"
            >
              <template #suffix>
                <el-icon class="el-input__icon" @click="handleIconClick">
                  <Search />
                </el-icon>
              </template>
              <template #default="{ item }">
                <div class="name">{{ item.name }}</div>
                <div class="price">￥{{ item.price }}</div>
              </template>
            </el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column :label="'项目价格'" min-width="100px" align="center">
          <template v-slot="scope">
            <span>￥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'数量'" min-width="150px" align="center">
          <template v-slot="scope">
            <el-input-number
              v-model="tableList[scope.$index].projectNum"
              class="mx-4"
              :class="[tableList[scope.$index].projectNum ? '' : 'isError']"
              :min="1"
              controls-position="right"
              @change="() => handleChangeNum(scope.$index)"
              :disabled="isDisabled"
            />
          </template>
        </el-table-column>
        <el-table-column :label="'合计'" min-width="100px" align="center">
          <template v-slot="scope">
            <span>￥{{ tableList[scope.$index].total }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="100" class-name="small-padding fixed-width">
          <template v-slot="scope">
            <el-button text @click="handleDelete(scope.$index)" v-if="!isDisabled">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="isDisabled">
        <el-button @click="handleCancel(ruleFormRef)">关闭</el-button>
      </span>
      <span class="dialog-footer" v-else>
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)" :loading="btnLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { setMealAdd, setMealUpdate, setMealDetail } from '@/api/setMealManage'
import { reactive, ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import useProject from './use-project'
import { durationTypesFn } from '@/utils/util'

const props = defineProps({
  diaTitle: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['refreshList'])
// hooks
const { querySearch2, resProjectList, autoRef } = useProject()
const durationTypes = durationTypesFn()

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)
const tableList = ref([])
const tableLoading = ref(false)
const btnLoading = ref(false)

let dialogForm = reactive({
  name: '',
  duration: '',
  originalPrice: 0,
  price: '',
  active: false,
  uid: ''
})

const rules = reactive({
  name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入门诊定价', trigger: 'blur' }],
  duration: [{ required: true, message: '请选择套餐时长', trigger: 'change' }]
})

//计算价格
watch(
  () => tableList.value,
  (newVal, oldVal) => {
    let totalNum = newVal.reduce((prev, next) => {
      return prev + next.total
    }, 0)
    dialogForm.originalPrice = totalNum.toFixed(2)
  },
  { deep: true }
)

// 详情
const _setMealDetail = (uid) => {
  tableLoading.value = true
  setMealDetail(uid).then((res) => {
    const { name, duration, originalPrice, price, active, uid } = res.datas
    let list = res.datas.setMealDetails
    list.forEach((item) => {
      resProjectList.value.forEach((ele) => {
        if (item.projectUid === ele.uid) {
          item.name = ele.name
          item.price = ele.price
        }
      })
    })
    tableList.value = list
    dialogForm.name = name
    dialogForm.duration = duration
    dialogForm.originalPrice = originalPrice
    dialogForm.price = price
    dialogForm.active = active
    dialogForm.uid = uid
    tableLoading.value = false
  })
}

const addLine = () => {
  let newVal = {
    projectUid: '', // 名称对应的id
    price: null, // 价格
    projectNum: 1, // 数量
    total: null // 合计
  }
  tableList.value.push(newVal)
}

// 选择项目名称
const handleSelect = (item, index) => {
  tableList.value[index].projectUid = item.uid
  tableList.value[index].price = item.price
  tableList.value[index].total = parseFloat((tableList.value[index].price * tableList.value[index].projectNum).toFixed(2))
  autoRef.value.activated = false
}

const handleChangeName = (value, index) => {
  if (!value) {
    tableList.value[index].projectUid = ''
    tableList.value[index].price = null
    tableList.value[index].projectNum = 1
    tableList.value[index].total = null
  }
}

const handleChangeNum = (index) => {
  tableList.value[index].total = parseFloat((tableList.value[index].price * tableList.value[index].projectNum).toFixed(2))
}

const handleDelete = (index) => {
  tableList.value.splice(index, 1)
}

// 保存
const handleSubmit = async (formEl) => {
  let data = {
    ...dialogForm,
    selMealDetails: tableList.value
  }
  if (!formEl) return
  let syncApi
  await formEl.validate((valid) => {
    if (valid) {
      btnLoading.value = true
      if (!tableList.value.length) {
        ElMessage({
          showClose: true,
          type: 'error',
          message: '请添加项目明细'
        })
        return
      }
      let allArr = []
      tableList.value.map((item) => {
        allArr.push(Object.values(item))
      })
      let isPass = allArr.flat(2).some((ele) => {
        return ele === '' || ele === undefined || ele === null
      })
      if (isPass) {
        ElMessage({
          type: 'error',
          message: '请填写完后再保存提交'
        })
        setTimeout(() => {
          btnLoading.value = false
        }, 2000)
        return
      }

      if (dialogForm.uid) {
        syncApi = setMealUpdate(data)
        implement(syncApi, '编辑')
      } else {
        syncApi = setMealAdd(data)
        implement(syncApi, '新增')
      }
    }
  })
  setTimeout(() => {
    btnLoading.value = false
  }, 3000)
}

const implement = (fn, msg) => {
  fn.then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: msg + '成功！'
    })
    dialogFormVisible.value = false
    btnLoading.value = false
    dialogForm.uid = ''
    emit('refreshList')
    ruleFormRef.value.resetFields()
  })
}

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  dialogFormVisible.value = false
  btnLoading.value = false
  dialogForm.uid = ''
  formEl.resetFields()
  tableList.value = []
}

defineExpose({
  dialogFormVisible,
  _setMealDetail
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  .feild-left {
    font-weight: 700;
    color: #000;
    font-size: 14px;
  }
}
</style>

<style>
.isError .el-input {
  border-color: #f56c6c !important;
  --el-input-border-color: #f56c6c !important;
}
.isError input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #f56c6c !important;
}
.isError input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #f56c6c !important;
}
.isError input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #f56c6c !important;
}
.isError input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #f56c6c !important;
}
</style>
