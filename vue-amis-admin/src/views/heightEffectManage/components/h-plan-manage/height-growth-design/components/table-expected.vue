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
    <tr>
      <td colspan="4" v-if="expectedInfo.sex === 0">
        <span v-if="!boneAgeInfo.boneAge">暂无骨龄数据</span>
        <span v-if="boneAgeInfo.boneAge && boneAgeInfo.boneAge < 11.5">
          当前骨龄和进入青春期骨龄的差值：{{ twoNumDiff(11.5, boneAgeInfo.boneAge) }}年
        </span>
        <span v-if="boneAgeInfo.boneAge && boneAgeInfo.boneAge >= 11.5">
          当前骨龄已进入青春期：{{ twoNumDiff(boneAgeInfo.boneAge, 11.5) }}年
        </span>
      </td>
      <td colspan="4" v-if="expectedInfo.sex === 1">
        <span v-if="!boneAgeInfo.boneAge">暂无骨龄数据</span>
        <span v-if="boneAgeInfo.boneAge && boneAgeInfo.boneAge < 9.5">
          当前骨龄和进入青春期骨龄的差值：{{ twoNumDiff(9.5, boneAgeInfo.boneAge) }}年
        </span>
        <span v-if="boneAgeInfo.boneAge && boneAgeInfo.boneAge >= 9.5">
          当前骨龄已进入青春期：{{ twoNumDiff(boneAgeInfo.boneAge, 9.5) }}年
        </span>
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
  },
  boneAgeInfo: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
