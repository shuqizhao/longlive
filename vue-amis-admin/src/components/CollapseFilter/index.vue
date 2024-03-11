<template>
  <el-collapse v-model="activeNames" @change="filterChange" accordion>
    <el-collapse-item name="1">
      <template #title>
        <span class="show-text">{{ showFilter ? '收起筛选' : '展开筛选' }}</span>
        <el-button class="filter-item" type="primary" :icon="Search" @click.stop="onFind">查询</el-button>
        <el-button class="filter-item2" :icon="RefreshLeft" @click.stop="onReset">重置</el-button>
        <el-button class="filter-item3" :icon="Download" @click.stop="onDownload" v-if="downloadFlag" :loading="exportLoading">导出</el-button>
      </template>
      <div>
        <slot></slot>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Search, RefreshLeft,Download } from '@element-plus/icons-vue'

const props = defineProps({
  downloadFlag: {
    type: Boolean,
    defalut: false
  },
  exportLoading: {
    type: Boolean,
    defalut: false
  }
})

const showFilter = ref(true)
const activeNames = ref('1')
const emit = defineEmits(['changeFind', 'changReset','exportList']) // 声明触发事件

const filterChange = (val) => {
  showFilter.value = val ? true : false
}

const onFind = () => {
  emit('changeFind')
}

const onReset = () => {
  emit('changReset')
}

const onDownload = () => {
  emit('exportList')
}
</script>

<style lang="scss" scoped>
.filter-item,
.filter-item2,
.filter-item3{
  min-width: 90px;
  height: 30px;
}
</style>
