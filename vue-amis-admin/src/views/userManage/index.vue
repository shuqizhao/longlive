<template>
  <div class="app-container">
    <div class="filter-container">
      <collapse-filter @changeFind="changeFind" @changReset="changReset">
        <el-form :model="searchForm" label-width="120px" class="filter-mian">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户：">
                <el-input v-model.trim="searchForm.nameOrPhone" placeholder="姓名/手机号" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期：">
                <el-date-picker
                  v-model="searchForm.birthday"
                  type="daterange"
                  unlink-panels
                  @change="getStartEnd"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
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
          </el-row>
        </el-form>
      </collapse-filter>
      <div class="filter-bottom">
        <el-button class="filter-item" type="primary" color="#3BAE9D" @click="handleAdd"> 新增 </el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading" fit border highlight-current-row>
      <el-table-column label="姓名" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ sexFilter(scope.row.sex) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" align="center" min-width="140px">
        <template v-slot="scope">
          <span>{{ scope.row.birthdayStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center" min-width="150px">
        <template v-slot="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件类型" align="center" min-width="140px">
        <template v-slot="scope">
          <span>{{ idTypeFilter(scope.row.idType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.idNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住址" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记人" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.createByUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记时间" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近修改人" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.lastModifiedByUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近修改时间" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.lastModifiedDate }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button text @click.prevent="editRow(scope.row)"> 编辑 </el-button>
          <el-button text @click.prevent="handleSetMeal(scope.row)"> 开套餐 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />
    <!-- dialog对话框 -->
    <userDialog ref="userDialogRef" :title="diaTitle" @refreshList="fetchData()" />
    <!-- 开套餐 -->
    <OpenSetMeal ref="openSetMealRef" />
  </div>
</template>

<script>
export default {
  name: 'UserManage'
}
</script>

<script setup>
import { customerList } from '@/api/userManage'
import { onMounted, reactive, ref } from 'vue'
import { sexTypes } from '@/utils/config'
import { sexFilter, idTypeFilter } from '@/utils/filters'
import CollapseFilter from '@/components/CollapseFilter/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import UserDialog from '@/components/UserDialog/userDialog.vue'
import OpenSetMeal from '@/components/OpenSetMeal/openSetMeal.vue'

const diaTitle = ref('')
const userDialogRef = ref(null)
const openSetMealRef = ref(null)

const searchFormFn = () => ({
  nameOrPhone: '',
  birthday: [],
  birthdayStart: '',
  birthdayEnd: '',
  sex: ''
})
const searchForm = reactive(searchFormFn())

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})
const tableLoading = ref(false)
const tableData = ref([])
const total = ref(0)

const getStartEnd = () => {
  if (searchForm.birthday === null) {
    searchForm.birthday = ''
    searchForm.birthdayStart = ''
    searchForm.birthdayEnd = ''
  } else {
    searchForm.birthdayStart = searchForm.birthday[0]
    searchForm.birthdayEnd = searchForm.birthday[1]
  }
}

// 获取列表数据
const fetchData = () => {
  tableLoading.value = true
  customerList(searchForm, pages).then((res) => {
    tableData.value = res.datas
    total.value = res.total
    tableLoading.value = false
  })
}

onMounted(() => {
  fetchData()
})

const changeFind = () => {
  fetchData()
}

const changReset = () => {
  searchFormFn()
  Object.assign(searchForm, searchFormFn())
  fetchData()
}

const handleAdd = () => {
  diaTitle.value = '登记用户'
  userDialogRef.value.dialogFormVisible = true
}

const editRow = (rowData) => {
  diaTitle.value = '编辑用户'
  userDialogRef.value.dialogFormVisible = true
  userDialogRef.value._customerDetail(rowData.uid)
}

// 开套餐
const handleSetMeal = (rowData) => {
  openSetMealRef.value.dialogFormVisible = true
  openSetMealRef.value._customerDetail(rowData.uid)
}
</script>

<style lang="scss" scoped>
.birthday-item {
  .el-form-item__content {
    display: flex;
  }
}
</style>
