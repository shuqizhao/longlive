<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="执行"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel(ruleFormRef)"
    width="800px"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules" ref="ruleFormRef">
      <div class="develop-title">
        <span class="line"></span>
        <div class="title">基本信息</div>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开单医生：">
              <span>{{ userName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开单时间：">
              <span>2023年02月13日</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <span>{{ customerObj.customerName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄：">
              <span>{{ customerObj.ageStr }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：">
              <span>{{ customerObj.sexStr }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：">
              <span>{{ customerObj.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="develop-title">
        <span class="line"></span>
        <div class="title">执行项目</div>
      </div>
      <div class="execute">
        <div class="execute-title color-orange">
          已执行/总次数：{{ executeRowObj.executedNum }} / {{ executeRowObj.projectNum }}
        </div>
        <el-row class="execute-row">
          <el-col :span="8">
            <el-form-item label="项目名称：">
              <span>{{ executeRowObj.projectName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开单科室：">
              <span>儿童发育科室</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开单医生：">
              <span>{{ userName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="执行说明：" prop="remark">
        <el-input v-model="dialogForm.remark" type="textarea" :rows="5" placeholder="请输入" maxlength="200" />
      </el-form-item>
      <el-form-item label="执行时间：" prop="executeDate">
        <el-date-picker
          v-model="dialogForm.executeDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">确定执行</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { executeProject } from '@/api/heightManageCom/h-home'
import { inject, reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { toDay } from '@/utils/util'
import { useStore } from 'vuex'

const props = defineProps({
  executeRowObj: {
    type: Object,
    default: () => {}
  }
})
const customerObj = inject('customerObj')
const emit = defineEmits(['refreshList'])
const store = useStore()
const userName = computed(() => store.state.user.name)

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let dialogForm = reactive({
  remark: '',
  executeDate: toDay()
})

const rules = reactive({
  remark: [{ required: true, message: '请输入执行说明', trigger: 'blur' }],
  executeDate: [{ required: true, message: '请选择执行时间', trigger: 'change' }]
})

// 保存
const handleSubmit = async (formEl) => {
  dialogForm.setMealBillProjectUid = props.executeRowObj.setMealBillProjectUid
  if (!formEl) return
  let syncApi
  await formEl.validate((valid) => {
    if (valid) {
      syncApi = executeProject(dialogForm)
      implement(syncApi, '执行')
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
.develop-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .line {
    width: 4px;
    height: 20px;
    background: $panGreen;
  }
  .title {
    padding-left: 5px;
  }
}
.execute {
  text-align: center;
  .execute-title {
    margin: 10px 0;
    padding: 10px 0;
    background: $light-blue;
  }
  .execute-row {
    background: $light-blue;
    margin-bottom: 10px;
  }
}
.el-form-item {
  margin-bottom: 12px;
}
</style>
