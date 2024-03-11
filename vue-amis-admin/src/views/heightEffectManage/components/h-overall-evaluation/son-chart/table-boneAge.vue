<template>
  <table border="1">
    <tr>
      <th colspan="4">骨龄评价</th>
    </tr>
    <tr>
      <td>1、骨龄={{ boneAgeInfo.boneAge }}岁</td>
    </tr>
    <tr>
      <td>2、{{ overallBoneAgeFilter(boneAgeInfo.boneAge, boneAgeInfo.lifeAge, customerObj.sex) }}</td>
    </tr>
    <tr>
      <td>3、当前骨龄身高百分位数{{ boneAgeInfo.forecastHeightPer }}th</td>
    </tr>
    <tr>
      <td>4、当前骨龄对应的成年身高{{ boneAgeInfo.forecastHeight }}cm</td>
    </tr>
    <tr>
      <td>5、预测的成年身高和期望身高的差值 (成年身高-期望身高)= {{ diffHeight }} cm</td>
    </tr>
    <tr>
      <td>
        6、实现期望身高的难易程度：{{ expectHeightDiff(expectedInfo.expectHeight, boneAgeInfo.forecastHeight) }}
        <span v-if="boneAgeInfo.boneAge &lt; 4">儿童年龄越小，实现期望身高的难度越小</span>
      </td>
    </tr>
    <tr>
      <td>建议：至少每一年监测骨龄，评价骨龄变化。</td>
    </tr>
    <tr>
      <td class="color-warning">最近的骨龄测量时间距离现在已有{{ diffDays }}天</td>
    </tr>
  </table>
</template>

<script setup>
import { computed, inject } from 'vue'
import { overallBoneAgeFilter, expectHeightDiff } from '@/utils/filters'
import { getDiffDay } from '@/utils/util'
const props = defineProps({
  expectedInfo: {
    type: Object
  },
  boneAgeFlag: {
    type: Boolean,
    deflut: false
  },
  boneAgeInfo: {
    type: Object
  }
})
const customerObj = inject('customerObj')

const diffHeight = computed(() => {
  return (props.boneAgeInfo.forecastHeight - props.expectedInfo.expectHeight).toFixed(1)
})

const diffDays = computed(() => {
  return getDiffDay(props.boneAgeInfo.addTime, customerObj.currentTime)
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
