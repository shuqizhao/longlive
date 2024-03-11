<template>
  <table border="1">
    <tr>
      <th colspan="5">身高增长情况</th>
    </tr>
    <tr style="background: #e7f7f4; color: #000">
      <td width="25%">增长情况</td>
      <td width="25%">身高月增长速度(cm/月)</td>
      <td width="25%">身高(cm)</td>
      <td width="25%">体重(kg)</td>
    </tr>
    <tr v-for="(item, index) in heightGrowths.slice(0, -1)" :key="index">
      <td>
        <span>第{{ index + 1 }}季度（{{ item.growthDays }}天）</span>
      </td>
      <td>{{ item.heightMonthlyGrowthRate }}</td>
      <td>{{ item.height }}</td>
      <td>{{ item.weight }}</td>
    </tr>
    <tr>
      <td>
        <span>近一年管理（{{ last.growthDays }}天）</span>
      </td>
      <td>{{ last.heightMonthlyGrowthRate }}</td>
      <td>{{ last.height }}</td>
      <td>{{ last.weight }}</td>
    </tr>
  </table>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  heightGrowths: Array
})

const last = ref(props.heightGrowths[props.heightGrowths.length - 1])

watch(
  () => props.heightGrowths,
  (newVal, oldVal) => {
    if (newVal) {
      last.value = props.heightGrowths[props.heightGrowths.length - 1]
    }
  }
)
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
