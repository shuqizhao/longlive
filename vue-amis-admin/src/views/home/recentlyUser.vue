<template>
  <el-table :data="tableData" v-loading="tableLoading" border fit highlight-current-row style="min-height: 440px">
    <el-table-column label="姓名" align="center" min-width="200px">
      <template v-slot="scope">
        <span>{{ scope.row.customerName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="接诊时间" align="center" min-width="200px">
      <template v-slot="scope">
        <span>{{ scope.row.addTime }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="200">
      <template #default="scope">
        <el-button text @click.prevent="handleLook(scope.row)"> 接诊 </el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />
</template>

<script setup>
import { threeMonthsAdmission } from '@/api/myWork'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination/index.vue'

const tableData = ref([])
const total = ref(0)
const tableLoading = ref(false)

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})

const router = useRouter()

const handleLook = (rowData) => {
  router.push({
    path: '/heightEffectManage/heightManageCom',
    query: {
      customerUid: rowData.customerUid,
      setMealBillUid: rowData.setMealBillUid
    }
  })
}

const fetchData = () => {
  // threeMonthsAdmission(pages).then((res) => {
  //   tableData.value = res.datas
  //   total.value = res.total
  //   tableLoading.value = false
  // })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
