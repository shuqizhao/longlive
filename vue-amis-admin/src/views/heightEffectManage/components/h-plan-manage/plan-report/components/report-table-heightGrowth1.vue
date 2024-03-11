<template>
  <table border="1">
    <thead>
      <tr>
        <th colspan="4">身高管理方案</th>
      </tr>
    </thead>
    <tr>
      <td colspan="4" style="color: rgb(54, 122, 255)">1、定期监测身高体重（每月测量身高、每周测量体重并记录保存）</td>
    </tr>
    <tr>
      <td colspan="4" style="text-align: center">
        <img src="/src/assets/img/h1.jpg" style="height: 400px" />
      </td>
    </tr>
    <tr>
      <td colspan="4" style="color: rgb(54, 122, 255)">2、身高监测结果</td>
    </tr>
    <tr>
      <td colspan="4">2.1、连续2个月未达到设计指标，请及时联系我们。</td>
    </tr>
    <tr>
      <td colspan="4">2.2、遵医嘱，定期检测骨龄，把握骨龄消耗速度，有利于达到期望身高。</td>
    </tr>
    <tr>
      <td colspan="4" style="color: rgb(54, 122, 255)">3、速度设置</td>
    </tr>
    <tr>
      <td colspan="4">3.1、速度设计</td>
    </tr>
    <tr v-if="!showNoDesign">
      <td colspan="4" class="ta-center">骨龄身高生长速度 {{ yearNeedHeight }} cm/岁骨龄</td>
    </tr>
  </table>
</template>

<script setup>
import useTableTarget from '@/hooks/useTableTarget'
import useTableTargetShow from '@/hooks/useTableTargetShow'

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

const { yearNeedHeight } = useTableTarget(props)
const { showNoDesign } = useTableTargetShow(props)
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
