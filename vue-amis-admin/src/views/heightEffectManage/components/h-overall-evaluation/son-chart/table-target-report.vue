<template>
  <table border="1" id="report5" style="width: 100%; margin-top: 5px" v-if="boneAgeInfo.boneAge">
    <tr>
      <th colspan="6">设计的阶段性目标</th>
    </tr>
    <tr>
      <td>骨龄身高生长速度(设计生长速度)</td>
      <td colspan="5">{{ yearNeedHeight }} cm/岁骨龄</td>
    </tr>
    <tr>
      <td>一、假设未来1年身高增长</td>
      <td>5cm</td>
      <td>骨龄消耗</td>
      <td>{{ oneYearConsumeTarget1 }}岁/年</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>每月增长</td>
      <td>0.4cm</td>
      <td>每个季度增长</td>
      <td>1.2cm</td>
      <td>体重控制</td>
      <td>0 kg</td>
    </tr>
    <tr>
      <td>二、假设未来1年身高增长</td>
      <td>6cm</td>
      <td>骨龄消耗</td>
      <td>{{ oneYearConsumeTarget2 }} 岁/年</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>每月增长</td>
      <td>0.5cm</td>
      <td>每个季度增长</td>
      <td>1.5cm</td>
      <td>体重控制</td>
      <td>0 kg</td>
    </tr>
  </table>
</template>

<script setup>
import useTableTarget from '@/hooks/useTableTarget'

const props = defineProps({
  overInfo: {
    type: Object
  },
  currentInfo: {
    type: Object
  },
  boneAgeInfo: {
    type: Object
  }
})

const { yearNeedHeight, oneYearConsumeTarget1, oneYearConsumeTarget2 } = useTableTarget(props)
</script>

<style lang="scss" scoped>
@import '@/styles/overall-report.scss';
</style>
