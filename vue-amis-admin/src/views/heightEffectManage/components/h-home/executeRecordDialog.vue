<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="项目执行记录"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel"
    width="1000px"
  >
    <el-table :data="recordList" v-loading="tableLoading" fit border highlight-current-row>
      <el-table-column label="行号" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行项目" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行说明" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行时间" align="center" min-width="200px">
        <template v-slot="scope">
          <span>{{ scope.row.executeDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行人" align="center" min-width="150px">
        <template v-slot="scope">
          <span>{{ scope.row.createByUserName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { executeProjectRecords } from '@/api/heightManageCom/h-home'
import { reactive, ref } from 'vue'

const emit = defineEmits(['refreshList'])

const dialogFormVisible = ref(false)
const recordList = ref([])

const pages = reactive({
  pageNum: 1,
  pageSize: 100
})

// 项目执行记录
const _executeProjectRecords = (rowData) => {
  executeProjectRecords(rowData.uid, pages).then((res) => {
    recordList.value = res.datas
  })
}

// 取消
const handleCancel = () => {
  dialogFormVisible.value = false
}

defineExpose({
  dialogFormVisible,
  _executeProjectRecords
})
</script>

<style lang="scss" scoped></style>
