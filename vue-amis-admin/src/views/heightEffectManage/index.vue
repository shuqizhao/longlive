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
                <el-input v-model.trim="searchForm.customerName" placeholder="姓名/手机号" clearable />
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
                <span style="margin: 0 1%">-</span>
                <el-input-number
                  v-model="searchForm.ageUpper"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 47%"
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
              <el-form-item label="初始身高百分位：">
                <el-input-number
                  v-model="searchForm.heightPercentLower"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 47%"
                />
                <span style="margin: 0 1%">-</span>
                <el-input-number
                  v-model="searchForm.heightPercentUpper"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 47%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="初始BMI百分位：">
                <el-input-number
                  v-model="searchForm.bmiPercentLower"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 47%"
                />
                <span style="margin: 0 1%">-</span>
                <el-input-number
                  v-model="searchForm.bmiPercentUpper"
                  class="mx-4"
                  :min="0"
                  controls-position="right"
                  @change="handleChange"
                  style="width: 47%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="管理结束日期：">
                <el-date-picker
                  v-model="searchForm.expiredDate"
                  type="daterange"
                  unlink-panels
                  @change="getManageStartEnd"
                  range-separator="-"
                  value-format="YYYY-MM-DD"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="最近接诊医生：">
                <el-input v-model.trim="searchForm.doctorName" placeholder="请输入" clearable />
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
      <el-table-column label="姓名" align="center" min-width="80px">
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
      <el-table-column label="遗传身高(cm)" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.geneticsHeight || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始测试年龄" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.firstAge || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始身高(cm)" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.firstHeight || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始体重(kg)" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.firstWeight || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始BMI百分位" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.bmiPercent || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始身高百分位" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.heightPercent || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始体重百分位" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.weightPercent || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初次管理时间" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ scope.row.firstAddTime || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近管理时间" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ scope.row.recentAddTime || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理天数" align="center" min-width="60px">
        <template v-slot="scope">
          <span v-if="scope.row.managementDays == 0 || !scope.row.managementDays">{{ '-' }}</span>
          <span v-else>{{ scope.row.managementDays }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身高增长(cm)" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.heightGrowth || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体重增长(kg)" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.weightGrowth || '-' }}</span>
        </template>
      </el-table-column>
      <!-- 分割 -->
      <el-table-column label="平均月身高增长速度(cm/月)" align="center" min-width="60px">
        <template v-slot="scope">
          <span class="red" v-if="scope.row.monthHeightGrowth <= 0.3">{{ scope.row.monthHeightGrowth }}</span>
          <span class="orange" v-else-if="scope.row.monthHeightGrowth >= 1">{{ scope.row.monthHeightGrowth }}</span>
          <span v-else>{{ scope.row.monthHeightGrowth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平均月体重增长速度(kg/月)" align="center" min-width="60px">
        <template v-slot="scope">
          <span class="red" v-if="scope.row.monthWeightGrowth >= 0.5">{{ scope.row.monthWeightGrowth }}</span>
          <span v-else>{{ scope.row.monthWeightGrowth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="3个月平均月身高增长速度(cm/月)" align="center" min-width="60px">
        <template v-slot="scope">
          <span class="red" v-if="scope.row.threeMonthHeightGrowth <= 0.3">{{ scope.row.threeMonthHeightGrowth }}</span>
          <span class="orange" v-else-if="scope.row.threeMonthHeightGrowth >= 1">{{
            scope.row.threeMonthHeightGrowth
          }}</span>
          <span v-else>{{ scope.row.threeMonthHeightGrowth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="3个月平均月体重增长速度(kg/月)" align="center" min-width="60px">
        <template v-slot="scope">
          <span class="red" v-if="scope.row.threeMonthWeightGrowth >= 0.5">{{ scope.row.threeMonthWeightGrowth }}</span>
          <span v-else>{{ scope.row.threeMonthWeightGrowth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐" align="center" min-width="60px">
        <template v-slot="scope">
          <span>{{ scope.row.setMealName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理结束时间" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ scope.row.expiredEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近接诊时间" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ scope.row.addTime || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近接诊医生" align="center" min-width="70px">
        <template v-slot="scope">
          <span>{{ scope.row.doctorName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
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
  name: 'HeightEffectManage'
}
</script>

<script setup>
import { heightEffectList } from '@/api/heightManageCom/list'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CollapseFilter from '@/components/CollapseFilter/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { sexTypes } from '@/utils/config'
import useSetMealData from '@/hooks/useSetMealData'
import useShowMoreUser from '@/hooks/useShowMoreUser'
import useExport from '@/hooks/useExport'

const { setMealData } = useSetMealData()
const { showLoading, showMsg, _showInfo, closeInfo } = useShowMoreUser()

const router = useRouter()

const searchFormFn = () => {
  if (JSON.parse(sessionStorage.getItem('heightEffectManageParams'))) {
    return JSON.parse(sessionStorage.getItem('heightEffectManageParams'))
  } else {
    return {
      customerName: '',
      ageLower: null,
      ageUpper: null,
      sex: '',
      setMealUid: '',
      heightPercentLower: null, // 初始身高百分位上限
      heightPercentUpper: null,
      bmiPercentLower: null,
      bmiPercentUpper: null,
      expiredDate: [],
      expiredEndDateLower: '', // 管理结束日期查询起期
      expiredEndDateUpper: '',
      addTimeDate: [],
      doctorName: '',
      addTimeLower: '',
      addTimeUpper: ''
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

const getManageStartEnd = (val) => {
  if (searchForm.expiredDate === null) {
    searchForm.expiredDate = []
    searchForm.expiredEndDateLower = ''
    searchForm.expiredEndDateUpper = ''
  } else {
    searchForm.expiredEndDateLower = val[0]
    searchForm.expiredEndDateUpper = val[1]
  }
}

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
  heightEffectList(searchForm, pages).then((res) => {
    tableData.value = res.datas
    total.value = res.total
    tableLoading.value = false
  })
}

// 查找
const changeFind = () => {
  sessionStorage.setItem('heightEffectManageParams', JSON.stringify(searchForm))
  fetchData()
}

// 重置
const changReset = () => {
  sessionStorage.removeItem('heightEffectManageParams')
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

const { exportLoading,exportList } = useExport(searchForm,'身高效果列表')

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.red {
  color: red;
  font-weight: 700;
}
.orange {
  color: orange;
  font-weight: 700;
}
</style>
