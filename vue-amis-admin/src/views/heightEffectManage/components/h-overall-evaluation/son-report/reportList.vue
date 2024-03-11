<template>
  <div>
    <el-table :data="reportList" v-loading="tableLoading" fit border highlight-current-row>
      <el-table-column label="行号" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.$index + (pages.pageNum - 1) * pages.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报告生成时间" align="center" min-width="150px">
        <template v-slot="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报告类型" align="center" min-width="150px">
        <template v-slot="scope">
          <span>{{ reportTypeFilter(scope.row.evaluationReportType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报告地址" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.reportName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报告生成者" align="center" min-width="150px">
        <template v-slot="scope">
          <span>{{ scope.row.createByUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button text @click.prevent="handleLook(scope.row)"> 查看 </el-button>
          <el-button type="bdx-delete" @click="handleDelete(scope.row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :total="total"
      v-model:page="pages.pageNum"
      v-model:limit="pages.pageSize"
      @pagination="_evaluationReport()"
    />
  </div>
</template>

<script setup>
import { evaluationReport, deleteReport } from '@/api/heightManageCom/h-overall-evaluation'
import Pagination from '@/components/Pagination/index.vue'
import { onMounted, reactive, ref, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reportTypeFilter } from '@/utils/filters'

const customerUid = inject('customerUid')

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})

const tableLoading = ref(false)
const reportList = ref([])
const total = ref(0)

const _evaluationReport = () => {
  evaluationReport(customerUid, pages).then((res) => {
    reportList.value = res.datas
    total.value = res.total
  })
}

const handleLook = (rowData) => {
  window.open(rowData.reportUrl)
}

const handleDelete = (rowData) => {
  ElMessageBox.confirm('确定删除该该报告吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action == 'confirm') {
        deleteReport(rowData.uid).then((res) => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          _evaluationReport()
        })
      }
    }
  })
}

defineExpose({
  _evaluationReport
})
</script>

<style lang="scss" scoped></style>
