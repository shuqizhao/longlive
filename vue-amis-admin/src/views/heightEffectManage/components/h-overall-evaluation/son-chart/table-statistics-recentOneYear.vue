<template>
  <table border="1">
    <tr>
      <th colspan="4">
        近一年发育情况（共{{ recentOneYearDevelopment.growthDays }}天）
        <span class="color-yellow"
          >（{{ recentOneYearDevelopment.beginTime }} 至 {{ recentOneYearDevelopment.endTime }}）</span
        >
      </th>
    </tr>
    <tr>
      <td width="25%">身高平均增长速度</td>
      <td width="25%">{{ recentOneYearDevelopment.averageHeightGrowthRate }}cm/月</td>
      <td width="25%">体重平均增长速度</td>
      <td width="25%">{{ recentOneYearDevelopment.averageWeightGrowthRate }} kg/月</td>
    </tr>
    <tr>
      <td>身高增长速度为全国同龄速度平均值的百分比</td>
      <td>{{ recentOneYearDevelopment.averagePercentHeightAgeForGroup }}%</td>
      <td>体重增长速度为全国同龄速度平均值的百分比</td>
      <td>{{ recentOneYearDevelopment.averagePercentWeightAgeForGroup }}%</td>
    </tr>
    <tr>
      <td>身高增长速度为设计值的百分数</td>
      <td>
        <span>{{ recentOneYearDevelopment.heightGrowthPercentageOfDesignValue }}</span>
        <span v-if="determineFn(recentOneYearDevelopment.heightGrowthPercentageOfDesignValue)">%</span>
      </td>
      <td>体重增长速度为设计值的百分数</td>
      <td>
        <span>{{ recentOneYearDevelopment.weightGrowthPercentageOfDesignValue }}</span>
        <span v-if="determineFn(recentOneYearDevelopment.weightGrowthPercentageOfDesignValue)">%</span>
      </td>
    </tr>
    <tr>
      <td>身高增长速度是否达到目标值</td>
      <td>{{ recentOneYearDevelopment.heightGrowthRateReachedTargetValue }}</td>
      <td>体重增长速度是否达到目标值</td>
      <td>{{ recentOneYearDevelopment.weightGrowthRateReachedTargetValue }}</td>
    </tr>
    <tr>
      <td colspan="4">评价：{{ recentOneYearDevelopment.evaluate }}</td>
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import { getDiffDay } from '@/utils/util'

const props = defineProps({
  recentOneYearDevelopment: {
    type: Object,
    default: () => {}
  }
})

// 判断字符串里是否是数字
const determineFn = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

// const evaluate = computed(() => {
//   const {heightGrowthPercentageOfDesignValue,weightGrowthPercentageOfDesignValue} = props.recentOneYearDevelopment
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

//   return `身高增长速度${props.recentOneYearDevelopment.heightGrowthRateReachedTargetValue}； 体重增长速度${props.recentOneYearDevelopment.weightGrowthRateReachedTargetValue}；${otherTitle} ${heightOtherTitle}`
// })
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
