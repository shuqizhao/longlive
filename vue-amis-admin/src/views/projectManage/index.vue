<template>
  <div class="app-container">
    <div class="filter-container">
      <collapse-filter @changeFind="changeFind" @changReset="changReset">
        <el-form :model="searchForm" label-width="120px" class="filter-mian">
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目名称：">
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
      <el-table-column label="项目名称" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center" min-width="200px">
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
          <el-button text @click.prevent="editRow(scope.row)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />
    <!-- dialog对话框 -->
    <ProjectDialog ref="projectDialogRef" :title="diaTitle" @refreshList="fetchData()" />
  </div>
</template>

<script>
export default {
  name: 'ProjectManage'
}
</script>

<script setup>
import { projectList, projectActive } from '@/api/projectManage'
import { onMounted, reactive, ref } from 'vue'
import CollapseFilter from '@/components/CollapseFilter/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import ProjectDialog from './projectDialog.vue'

const projectDialogRef = ref(null)
const diaTitle = ref('')
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
  projectList(searchForm, pages).then((res) => {
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
  projectActive(rowData.uid, rowData.active).then((res) => {})
}

const handleAdd = () => {
  diaTitle.value = '新增项目'
  projectDialogRef.value.dialogFormVisible = true
}

const editRow = (rowData) => {
  diaTitle.value = '编辑项目'
  projectDialogRef.value.dialogFormVisible = true
  projectDialogRef.value._projectDetail(rowData.uid)
}
</script>

<style lang="scss" scoped></style>
