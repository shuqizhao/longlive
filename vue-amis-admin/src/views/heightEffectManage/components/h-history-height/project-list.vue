<template>
  <div class="app-container">
    <el-table :data="tableData" v-loading="tableLoading" fit highlight-current-row>
      <el-table-column label="行号" align="center" min-width="80px">
        <template v-slot="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测量时间" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.addTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生活年龄" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.lifeAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身高(cm)" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.currentHeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身高百分位" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.heightPercent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体重(kg)" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.currentWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体重百分位" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.weightPercent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="bmi" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.bmi }}</span>
        </template>
      </el-table-column>
      <el-table-column label="bmi百分位" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.bmipercent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="骨龄" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.boneAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性发育情况" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.sexual ? '已发育' : '未发育' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否查体" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.bodyCheck ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结论" align="center" min-width="220px">
        <template v-slot="scope">
          <div v-html="scope.row.conclusion"></div>
        </template>
      </el-table-column>
      <el-table-column label="录入人" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.createByUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button text @click.prevent="editRow(scope.row)"> 编辑 </el-button>
          <el-button type="bdx-delete" @click.prevent="deleteRow(scope.row)"> 删除 </el-button>
          <el-button text @click.prevent="copyRow(scope.row)" v-if="!isCloseStatus"> 复制 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { deleteHistoryHeightList } from '@/api/heightManageCom/h-history-height'
import { reactive, ref, computed, inject } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  tableLoading: {
    type: Boolean,
    default: false
  }
})

const isCloseStatus = inject('isCloseStatus')

const emits = defineEmits(['on-change', 'refreshList'])

const editRow = (rowData) => {
  emits('on-change', {
    rowData,
    copyFlag: false
  })
}

const copyRow = (rowData) => {
  emits('on-change', {
    rowData,
    copyFlag: true
  })
}

const deleteRow = (rowData) => {
  ElMessageBox.confirm('确定删除该身高管理吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action == 'confirm') {
        deleteHistoryHeightList(rowData.uid).then((res) => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          emits('refreshList')
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped></style>
