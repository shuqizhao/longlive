<template>
  <div class="app-container">
    <div class="filter-container">
      <collapse-filter 
        :downloadFlag="true" 
        :exportLoading="exportLoading"
        @changeFind="changeFind" 
        @changReset="changReset"
        @exportList="exportList"
      >
        <el-form :model="searchForm" label-width="140px" class="filter-mian">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户：">
                <el-input v-model.trim="searchForm.customerName" placeholder="姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄：">
                <el-input-number
                  v-model="searchForm.ageLower"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 47%"
                />
                <span style="margin: 0 2%">-</span>
                <el-input-number
                  v-model="searchForm.ageUpper"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 46%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：">
                <el-select v-model="searchForm.sex" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="item in sexTypes" :key="item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="套餐：">
                <el-select v-model="searchForm.setMealUid" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="item in setMealData" :key="item.uid" :label="item.name" :value="item.uid" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="管理结束日期：">
                <el-date-picker
                  v-model="searchForm.expiredDate"
                  type="daterange"
                  unlink-panels
                  @change="getExpireStartEnd"
                  range-separator="-"
                  value-format="YYYY-MM-DD"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最近接诊日期：">
                <el-date-picker
                  v-model="searchForm.addTimeDate"
                  type="daterange"
                  unlink-panels
                  @change="getAddTimeStartEnd"
                  range-separator="-"
                  value-format="YYYY-MM-DD"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最近接诊医生：">
                <el-input v-model.trim="searchForm.doctorName" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <el-select v-model="searchForm.status" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="(value, key) in allStatusData" :key="key" :label="value" :value="key" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </collapse-filter>
    </div>
    <el-table :data="tableData" v-loading="tableLoading" fit border highlight-current-row>
      <el-table-column label="行号" align="center" min-width="50px">
        <template v-slot="scope">
          <span>{{ scope.$index + (pages.pageNum - 1) * pages.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" min-width="60px">
        <template v-slot="scope">
          <el-popover placement="bottom-start" :width="500" trigger="hover">
            <div v-loading="showLoading" class="pover" element-loading-spinner="el-icon-loading">
              {{ showMsg }}
            </div>
            <template #reference>
              <el-button class="m-2" text @mouseover="showInfo(scope.row)" @mouseleave="closeInfo">{{
                scope.row.name
              }}</el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ scope.row.setMealName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理结束时间" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.expiredEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="100px">
        <template v-slot="scope">
          <span v-if="scope.row.status">{{ allStatusData[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态备注" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近接诊时间" align="center" min-width="100px">
        <template v-slot="scope">
          <span v-if="scope.row.addTime">{{ scope.row.addTime.slice(0, 10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近接诊医生" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button text @click.prevent="handleManage(scope.row)"> 管理 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />
  </div>
</template>

<script>
export default {
  name: 'CustomerStatus'
}
</script>

<script setup>
import { customerStatusList } from '@/api/heightManageCom/list'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CollapseFilter from '@/components/CollapseFilter/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { sexTypes } from '@/utils/config'
import useSetMealData from '@/hooks/useSetMealData'
import useStatusData from '@/hooks/useStatusData'
import useShowMoreUser from '@/hooks/useShowMoreUser'
import useExport from '@/hooks/useExport'

const { setMealData } = useSetMealData()
const { allStatusData } = useStatusData()
const { showLoading, showMsg, _showInfo, closeInfo } = useShowMoreUser()

const router = useRouter()
const diaTitle = ref('')
const tenantDialogRef = ref(null)

const searchFormFn = () => {
  let formInfo = JSON.parse(sessionStorage.getItem('customerParams'))
  if (formInfo) {
    return formInfo
  } else {
    return {
      customerName: '',
      ageLower: null,
      ageUpper: null,
      sex: '',
      setMealUid: '',
      expiredDate: [],
      expiredEndDateLower: '', // 管理结束日期
      expiredEndDateUpper: '',
      addTimeDate: [],
      addTimeLower: '', // 最近接诊日期
      addTimeUpper: '',
      doctorName: '',
      status: ''
    }
  }
}
const searchForm = reactive(searchFormFn())

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})
const tableLoading = ref(false)
const tableData = ref([])
const total = ref(0)

// 管理结束日期
const getExpireStartEnd = (val) => {
  if (searchForm.expiredDate === null) {
    searchForm.expiredDate = []
    searchForm.expiredEndDateLower = ''
    searchForm.expiredEndDateUpper = ''
  } else {
    searchForm.expiredEndDateLower = val[0]
    searchForm.expiredEndDateUpper = val[1]
  }
}

// 最近接诊日期
const getAddTimeStartEnd = (val) => {
  if (searchForm.addTimeDate === null) {
    searchForm.addTimeDate = []
    searchForm.addTimeLower = ''
    searchForm.addTimeUpper = ''
  } else {
    searchForm.addTimeLower = val[0]
    searchForm.addTimeUpper = val[1]
  }
}

// 获取列表数据
const fetchData = () => {
  tableLoading.value = true
  customerStatusList(searchForm, pages).then((res) => {
    tableData.value = res.datas
    total.value = res.total
    tableLoading.value = false
  })
}

// 查找
const changeFind = () => {
  sessionStorage.setItem('customerParams', JSON.stringify(searchForm))
  fetchData()
}

// 重置
const changReset = () => {
  sessionStorage.removeItem('customerParams')
  searchFormFn()
  Object.assign(searchForm, searchFormFn())
  fetchData()
}

const handleManage = (rowData) => {
  router.push({
    path: '/heightEffectManage/heightManageCom',
    query: {
      customerUid: rowData.customerUid,
      setMealBillUid: rowData.setMealBillUid
    }
  })
}

const showInfo = (value) => {
  _showInfo(value)
}

const { exportLoading,exportList } = useExport(searchForm,'客户状态列表')

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
