<template>
  <div class="page-content">
    <el-pagination
      class="page-info"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :background="background"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination'
}
</script>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  background: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  total: {
    required: true,
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['pagination', 'update:page', 'update:limit'])

const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})

const pageSize = computed({
  get() {
    return props.limit
  },
  set(val) {
    emit('update:limit', val)
  }
})

const handleSizeChange = (val) => {
  emit('pagination', { page: currentPage, limt: val })
}
const handleCurrentChange = (val) => {
  emit('pagination', { page: val, limt: pageSize })
}
</script>

<style lang="scss" scoped>
.page-content {
  height: 55px;
  background: #f3f4f9;
  padding: 10px 60px;
  position: relative;
}
.page-info {
  position: absolute;
  right: 50px;
}
</style>
