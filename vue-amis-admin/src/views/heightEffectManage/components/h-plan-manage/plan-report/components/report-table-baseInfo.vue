<template>
  <table border="1">
    <tr>
      <th colspan="4">方案制定时的基本情况</th>
    </tr>
    <tr>
      <td width="25%">测量时间</td>
      <td width="25%">{{ currentInfo.addTime }}</td>
      <td width="25%">生活年龄</td>
      <td width="25%">{{ currentInfo.lifeAge }}</td>
    </tr>
    <tr>
      <td>目前身高(cm)</td>
      <td>{{ currentInfo.currentHeight }}</td>
      <td>百分位</td>
      <td>{{ currentInfo.heightPercent }}</td>
    </tr>
    <tr>
      <td>目前体重(kg)</td>
      <td>{{ currentInfo.currentWeight }}</td>
      <td>百分位</td>
      <td>{{ currentInfo.weightPercent }}</td>
    </tr>
    <tr v-if="currentInfo.boneAge">
      <td>当前骨龄</td>
      <td>{{ currentInfo.boneAge }}</td>
      <td colspan="2" :class="{'color-warning': Number(currentInfo.boneAge) &gt; Number(currentInfo.lifeAge)}">
        {{ overallBoneAgeFilter(currentInfo.boneAge, currentInfo.lifeAge, expectedInfo.sex, true) }}
      </td>
    </tr>
    <tr>
      <td>BMI</td>
      <td>{{ currentInfo.bmi }}</td>
      <td>百分位</td>
      <td>{{ currentInfo.bmipercent }}</td>
    </tr>
    <tr>
      <td>性发育情况</td>
      <td>{{ currentInfo.sexual ? '已发育' : '未发育' }}</td>
      <td>腹围(cm)</td>
      <td>{{ currentInfo.abdominal }}</td>
    </tr>
    <tr>
      <td colspan="4" v-html="currentInfo.conclusion"></td>
    </tr>
  </table>
</template>

<script setup>
import { statureFilter, overallBoneAgeFilter, heightPercentFilter, figureFilter } from '@/utils/filters'

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
