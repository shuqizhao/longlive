<template>
  <div class="app-container">
    <div class="filter-container">
      <collapse-filter @changeFind="changeFind" @changReset="changReset">
        <el-form :model="searchForm" label-width="120px" class="filter-mian">
          <el-row>
            <el-col :span="6">
              <el-form-item label="套餐名称：">
                <el-input v-model.trim="searchForm.name" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </collapse-filter>
      <div class="filter-bottom">
        <el-button class="filter-item" type="primary" color="#3BAE9D" @click="handleAdd"> 新增 </el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading" fit highlight-current-row>
      <el-table-column label="序号" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.$index + (pages.pageNum - 1) * pages.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐名称" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐时长" align="center" min-width="150px">
        <template v-slot="scope">
          <span>{{ scope.row.duration }}个月</span>
        </template>
      </el-table-column>
      <el-table-column label="计算价格(元)" align="center" min-width="150px">
        <template v-slot="scope">
          <span>￥{{ scope.row.originalPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊定价(元)" align="center" min-width="150px">
        <template v-slot="scope">
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="200px">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.active"
            active-text="启用"
            inactive-text="停用"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button text @click.prevent="lookRow(scope.row)"> 查看 </el-button>
          <el-button text @click.prevent="editRow(scope.row)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />
    <!-- dialog框 -->
    <SetMealDialog ref="setMealDialogRef" :title="diaTitle" :isDisabled="isDisabled" @refreshList="fetchData()" />
  </div>
</template>

<script>
export default {
  name: 'SetMealManage'
}
</script>

<script setup>
import { setMealList, setMealActive } from '@/api/setMealManage'
import { onMounted, reactive, ref } from 'vue'
import CollapseFilter from '@/components/CollapseFilter/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import SetMealDialog from './setMealDialog.vue'

const setMealDialogRef = ref(null)
const diaTitle = ref('')
const isDisabled = ref(false)
const searchForm = reactive({
  name: ''
})

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})
const tableLoading = ref(false)
const tableData = ref([])
const total = ref(0)

// 获取列表数据
const fetchData = () => {
  tableLoading.value = true
  setMealList(searchForm, pages).then((res) => {
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
  searchForm.name = ''
  fetchData()
}

//改变状态
const changeStatus = (rowData) => {
  setMealActive(rowData.uid, rowData.active).then((res) => {})
}

const handleAdd = () => {
  diaTitle.value = '新增套餐'
  isDisabled.value = false
  setMealDialogRef.value.dialogFormVisible = true
}

const editRow = (rowData) => {
  diaTitle.value = '编辑套餐'
  isDisabled.value = false
  setMealDialogRef.value.dialogFormVisible = true
  setMealDialogRef.value._setMealDetail(rowData.uid)
}

const lookRow = (rowData) => {
  diaTitle.value = '查看套餐'
  isDisabled.value = true
  setMealDialogRef.value.dialogFormVisible = true
  setMealDialogRef.value._setMealDetail(rowData.uid)
}
</script>

<style lang="scss" scoped></style>
