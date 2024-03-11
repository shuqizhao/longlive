<template>
  <div class="life-way">
    <div class="filter-bottom">
      <el-button
        class="filter-item h-history-btn"
        type="primary"
        color="#3BAE9D"
        @click="handleAdd"
        :disabled="isCloseStatus"
      >
        添加生活方式记录
      </el-button>
    </div>
    <el-table :data="tableData" v-loading="tableLoading" fit highlight-current-row>
      <el-table-column label="行号" align="center" min-width="50px">
        <template v-slot="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center" min-width="90px">
        <template v-slot="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="膳食" align="center" min-width="100px">
        <template v-slot="scope">
          <div>
            <span>是否喝奶：{{ liftWayTypesFilter(drinkMilkTypes, scope.row.drinkMilk) }}</span>
            <span v-if="scope.row.drinkMilk == 'EVERY_DAY'">{{ scope.row.drinkMilkQuantity }}ml/日</span>
          </div>
          <div>
            <span>鸡蛋：{{ liftWayTypesFilter(allEggTypes, scope.row.egg) }}</span>
            <span v-if="scope.row.egg === 'EAT_EGG'">{{ scope.row.eggQuantity }}个/日</span>
          </div>
          <div v-if="scope.row.mealRemark">备注：{{ scope.row.mealRemark }}</div>
        </template>
      </el-table-column>
      <el-table-column label="睡眠" align="center" min-width="150px">
        <template v-slot="scope">
          <div v-if="scope.row.bedTime">入睡时间：{{ scope.row.bedTime }}</div>
          <div v-if="scope.row.wakeUpTime">起床时间：{{ scope.row.wakeUpTime }}</div>
          <div v-if="scope.row.sleepDuration">时长：{{ scope.row.sleepDuration }}h</div>
          <div>入睡困难超过30分钟：{{ scope.row.sleepMoreThan30 ? '是' : '否' }}</div>
          <div>午睡：{{ scope.row.nap ? '是' : '否' }}</div>
          <div v-if="scope.row.sleepRemark">备注：{{ scope.row.sleepRemark }}</div>
        </template>
      </el-table-column>
      <el-table-column label="固定运动" align="center" min-width="100px">
        <template v-slot="scope">
          <div v-for="item in scope.row.lifeStyleSports" :key="item.uid">
            <span v-if="item.sportsStyle != 'other'">{{ liftWayTypesFilter(sportsTypes, item.sportsStyle) }}</span>
            &nbsp; <span v-else>{{ item.sportsStyleOther }}</span> &nbsp;
            <span>{{ item.sportsFrequency }}{{ item.sportsQuantity }}</span>
          </div>
          <div v-if="scope.row.sportsRemark">备注：{{ scope.row.sportsRemark }}</div>
        </template>
      </el-table-column>
      <el-table-column label="营养素" align="center" min-width="100px">
        <template v-slot="scope">
          <div>{{ liftWayTypesFilter(nutrientsTypes, scope.row.supplyNutrients) }}</div>
          <div v-for="item in scope.row.lifeStyleNutrients" :key="item.uid">
            <span>{{ item.nutrientsName }}</span> &nbsp;
            <span>{{ item.nutrientsQuantity }}{{ item.nutrientsUnit }}</span>
          </div>
          <div v-if="scope.row.nutrientsRemark">备注：{{ scope.row.nutrientsRemark }}</div>
        </template>
      </el-table-column>
      <el-table-column label="情绪" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.mood }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行力" align="center" min-width="100px">
        <template v-slot="scope">
          <div>{{ liftWayTypesFilter(executionTypes, scope.row.execution) }}</div>
          <div v-if="scope.row.executionDifficulty">原因：{{ scope.row.executionDifficulty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="疾病情况" align="center" min-width="100px">
        <template v-slot="scope">
          <span>{{ scope.row.diseaseRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近期生长发育总体分析" align="center" min-width="200px">
        <template v-slot="scope">
          <span v-if="scope.row.lifeStyleGrowth.totalEvaluate?.length &lt; 50">
            {{ scope.row.lifeStyleGrowth.totalEvaluate }}
          </span>
          <span v-else-if="!scope.row.lifeStyleGrowth.totalEvaluate?.length"> --- </span>
          <el-popover
            placement="top"
            :width="500"
            trigger="hover"
            effect="dark"
            :content="scope.row.lifeStyleGrowth.totalEvaluate"
            v-else
          >
            <template #reference>
              <span>
                {{ scope.row.lifeStyleGrowth.totalEvaluate.substr(0, 50) + '...' }}
              </span>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="其他情况备注" align="center" min-width="150px">
        <!-- <template v-slot="scope">
          <span>{{ scope.row.otherRemark }}</span>
        </template> -->
        <template v-slot="scope">
          <span v-if="scope.row.otherRemark?.length &lt; 50">
            {{ scope.row.otherRemark }}
          </span>
          <span v-else-if="!scope.row.otherRemark?.length"> --- </span>
          <el-popover
            placement="top"
            :width="500"
            trigger="hover"
            effect="dark"
            :content="scope.row.otherRemark"
            v-else
          >
            <template #reference>
              <span>
                {{ scope.row.otherRemark.substr(0, 50) + '...' }}
              </span>
            </template>
          </el-popover>
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

    <Pagination :total="total" v-model:page="pages.pageNum" v-model:limit="pages.pageSize" @pagination="fetchData()" />

    <LifeWayDialog ref="lifeWayDialogRef" :diaTitle="diaTitle" :copyStatus="copyStatus" @refreshList="fetchData()" />
  </div>
</template>

<script setup>
import { lifeStyletList, deleteLifeStyleBaseUid } from '@/api/heightManageCom/h-life-way'
import { liftWayTypesFilter } from '@/utils/filters'
import { drinkMilkTypes, nutrientsTypes, executionTypes, allEggTypes, sportsTypes } from '@/utils/config'
import { onMounted, reactive, ref, inject } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import LifeWayDialog from './lifeWayDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const customerUid = inject('customerUid')
const isCloseStatus = inject('isCloseStatus')

const lifeWayDialogRef = ref(null)
const diaTitle = ref('')
const copyStatus = ref(false)

const searchForm = reactive({
  customerUid
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
  lifeStyletList(searchForm, pages).then((res) => {
    tableData.value = res.datas
    total.value = res.total
    tableLoading.value = false
  })
}

// 添加生活方式记录
const handleAdd = () => {
  diaTitle.value = '添加生活方式记录'
  copyStatus.value = false
  lifeWayDialogRef.value.dialogFormVisible = true
}

const editRow = (rowData) => {
  diaTitle.value = '编辑生活方式记录'
  copyStatus.value = false
  lifeWayDialogRef.value.dialogFormVisible = true
  lifeWayDialogRef.value._lifeStyleDetail(rowData.uid)
}

// 复制
const copyRow = (rowData) => {
  diaTitle.value = '复制生活方式记录'
  copyStatus.value = true
  lifeWayDialogRef.value.dialogFormVisible = true
  lifeWayDialogRef.value._lifeStyleDetail(rowData.uid)
}

const deleteRow = (rowData) => {
  ElMessageBox.confirm('确定删除该身高管理吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action == 'confirm') {
        deleteLifeStyleBaseUid(rowData.uid).then((res) => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          fetchData()
        })
      }
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.life-way {
  border: 1px solid #ccc;
  border-top: none;
}
.h-history-btn {
  padding: 0 10px !important;
}
</style>
