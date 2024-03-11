<template>
  <div class="app-container h-history-list">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="近一年" name="first">
        <ProjectList
          ref="projectRef"
          :tableData="tableData"
          :total="total"
          :tableLoading="tableLoading"
          @on-change="changeProjectRow"
          @refreshList="refreshProject"
        />
        <Pagination
          :total="total"
          v-model:page="pages.pageNum"
          v-model:limit="pages.pageSize"
          @pagination="fetchData()"
        />
      </el-tab-pane>
      <el-tab-pane label="当前套餐" name="second">
        <ProjectList
          ref="projectRef"
          :tableData="tableData"
          :total="total"
          :tableLoading="tableLoading"
          @on-change="changeProjectRow"
          @refreshList="refreshProject"
        />
        <Pagination
          :total="total"
          v-model:page="pages.pageNum"
          v-model:limit="pages.pageSize"
          @pagination="fetchData()"
        />
      </el-tab-pane>
      <el-tab-pane label="全部套餐" name="third">
        <ProjectList
          ref="projectRef"
          :tableData="tableData"
          :total="total"
          :tableLoading="tableLoading"
          @on-change="changeProjectRow"
          @refreshList="refreshProject"
        />
        <Pagination
          :total="total"
          v-model:page="pages.pageNum"
          v-model:limit="pages.pageSize"
          @pagination="fetchData()"
        />
      </el-tab-pane>
    </el-tabs>
    <el-button class="h-history-btn" type="primary" @click="handleAdd" :disabled="isCloseStatus"
      >添加身高体重信息</el-button
    >
    <!-- 添加身高体重信息 -->
    <HeightWeightInfoDialog ref="hwInfoDialogRef" :diaTitle="diaTitle" @refreshList="refreshProject" />
  </div>
</template>

<script setup>
import { historyHeightList } from '@/api/heightManageCom/h-history-height'
import { onMounted, reactive, ref, inject } from 'vue'
import ProjectList from './project-list.vue'
import HeightWeightInfoDialog from './heightWeightInfoDialog.vue'
import Pagination from '@/components/Pagination/index.vue'

const customerUid = inject('customerUid')
const isCloseStatus = inject('isCloseStatus')

const activeName = ref('first')
const diaTitle = ref('')
const hwInfoDialogRef = ref(null)
const projectRef = ref(null)

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
  let data = {}
  if (activeName.value == 'first') {
    data = {
      customerUid: customerUid,
      historyHeightQueryType: 'YEAR'
    }
  }
  if (activeName.value == 'second') {
    data = {
      customerUid: customerUid,
      historyHeightQueryType: 'CURRENT'
    }
  }
  if (activeName.value == 'third') {
    data = {
      customerUid: customerUid,
      historyHeightQueryType: 'ALL'
    }
  }
  historyHeightList(data, pages).then((res) => {
    tableData.value = res.datas
    total.value = res.total
    tableLoading.value = false
  })
}

const handleClick = (tab) => {
  activeName.value = tab
  fetchData()
}

const handleAdd = () => {
  diaTitle.value = '添加身高体重信息'
  hwInfoDialogRef.value.dialogFormVisible = true
}

const changeProjectRow = ({ rowData, copyFlag }) => {
  if (copyFlag) {
    // 复制
    diaTitle.value = '复制身高体重信息'
  } else {
    diaTitle.value = '编辑身高体重信息'
  }
  hwInfoDialogRef.value.dialogFormVisible = true
  hwInfoDialogRef.value._historyHeightDetail(rowData.uid, copyFlag)
}

const refreshProject = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.el-tabs--card {
  :deep(.el-tabs__header) {
    border-bottom: none;
  }
  :deep(.el-tabs__nav) {
    border-bottom: 1px solid #e4e7ed;
  }
  :deep(.el-tabs__item.is-active) {
    background: $panGreen;
    color: #fff;
  }
}

.h-history-list {
  position: relative;
  .h-history-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0 10px !important;
  }
  :deep(.el-table) {
    border-top: none;
  }
}
</style>
