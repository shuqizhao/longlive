<template>
  <el-table :data="tableData" v-loading="tableLoading" border fit highlight-current-row style="min-height: 440px">
    <el-table-column label="姓名" align="center" min-width="150px">
      <template v-slot="scope">
        <span>{{ scope.row.customerName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="提醒时间" align="center" min-width="150px">
      <template v-slot="scope">
        <span>{{ scope.row.executeDate.slice(0, 10) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="提醒内容" align="center" min-width="150px">
      <template v-slot="scope">
        <span>{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="150">
      <template #default="scope">
        <el-button text @click.prevent="handleLook(scope.row)"> 查看 </el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />
</template>

<script setup>
import { workReminder } from '@/api/myWork'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toDay } from '@/utils/util'
import Pagination from '@/components/Pagination/index.vue'

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableLoading: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const tableData = ref([])
const total = ref(0)
const tableLoading = ref(false)

const pages = reactive({
  pageNum: 1,
  pageSize: 10
})

const handleLook = (rowData) => {
  router.push({
    path: '/heightEffectManage/heightManageCom',
    query: {
      customerUid: rowData.customerUid,
      setMealBillUid: rowData.setMealBillUid
    }
  })
}

// 获取工作提醒
const fetchData = () => {
  tableLoading.value = true
  workReminder(toDay(), pages).then((res) => {
    tableData.value = res.datas
    total.value = res.total
    tableLoading.value = false
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
