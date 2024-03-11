<template>
  <table border="1">
    <tr>
      <th colspan="4">
        近期发育情况（共{{ recentDevelopment.growthDays }}天）
        <span class="color-yellow">（{{ recentDevelopment.beginTime }} 至 {{ recentDevelopment.endTime }}）</span>
      </th>
    </tr>
    <tr>
      <td width="25%">身高平均增长速度</td>
      <td width="25%">{{ recentDevelopment.averageHeightGrowthRate }}cm/月</td>
      <td width="25%">体重平均增长速度</td>
      <td width="25%">{{ recentDevelopment.averageWeightGrowthRate }} kg/月</td>
    </tr>
    <tr>
      <td>身高增长速度为全国同龄速度平均值的百分比</td>
      <td>{{ recentDevelopment.averagePercentHeightAgeForGroup }}%</td>
      <td>体重增长速度为全国同龄速度平均值的百分比</td>
      <td>{{ recentDevelopment.averagePercentWeightAgeForGroup }}%</td>
    </tr>
    <tr>
      <td>身高增长速度为设计值的百分数</td>
      <td>
        <span>{{ recentDevelopment.heightGrowthPercentageOfDesignValue }}</span>
        <span v-if="determineFn(recentDevelopment.heightGrowthPercentageOfDesignValue)">%</span>
      </td>
      <td>体重增长速度为设计值的百分数</td>
      <td>
        <span>{{ recentDevelopment.weightGrowthPercentageOfDesignValue }}</span>
        <span v-if="determineFn(recentDevelopment.weightGrowthPercentageOfDesignValue)">%</span>
      </td>
    </tr>
    <tr>
      <td>身高增长速度是否达到目标值</td>
      <td>{{ recentDevelopment.heightGrowthRateReachedTargetValue }}</td>
      <td>体重增长速度是否达到目标值</td>
      <td>{{ recentDevelopment.weightGrowthRateReachedTargetValue }}</td>
    </tr>
    <tr>
      <td colspan="4">评价：{{ recentDevelopment.evaluate }}</td>
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import { getDiffDay } from '@/utils/util'

const props = defineProps({
  recentDevelopment: {
    type: Object,
    default: () => {}
  }
})

// 判断字符串里是否是数字
const determineFn = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

// const evaluate = computed(() => {
//   const {heightGrowthPercentageOfDesignValue,weightGrowthPercentageOfDesignValue} = props.recentDevelopment
//   let otherTitle='';
//   let heightOtherTitle='';
//   if(determineFn(heightGrowthPercentageOfDesignValue) && determineFn(weightGrowthPercentageOfDesignValue)) {
//     let heightVal = Number(heightGrowthPercentageOfDesignValue)
//     let weightVal = Number(weightGrowthPercentageOfDesignValue)
//     let diffVal = weightVal - heightVal
//     if(diffVal >= 0.1) {
//       otherTitle = '体重的增长速度>=身高的增长速度10%；骨龄发育速度一年超过1岁的可能性较大；'
//     }
//     if(heightVal < 0.7) {
//       heightOtherTitle = '身高的生长速度<平均的70%，有生长异常，存在生长迟缓的可能；'
//     }
//   }

//   return `身高增长速度${props.recentDevelopment.heightGrowthRateReachedTargetValue}； 体重增长速度${props.recentDevelopment.weightGrowthRateReachedTargetValue}；${otherTitle} ${heightOtherTitle}`
// })
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
