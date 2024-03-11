<template>
  <table border="1">
    <tr>
      <th colspan="4">期望身高</th>
    </tr>
    <tr>
      <td width="25%">期望身高(cm)</td>
      <td width="25%">{{ expectedInfo.expectHeight }}</td>
      <td width="25%">百分位</td>
      <td width="25%">{{ expectedInfo.expectHeightPercent }}</td>
    </tr>
    <tr>
      <td colspan="4">
        当前身高和期望身高的差值：{{ twoNumDiff(expectedInfo.expectHeight, currentInfo.currentHeight) }}cm
      </td>
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import { twoNumDiff } from '@/utils/filters'

const props = defineProps({
  expectedInfo: {
    type: Object
  },
  currentInfo: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
