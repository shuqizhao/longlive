<template>
  <table border="1" cellpadding="3" style="margin-top: 0">
    <tr>
      <td colspan="4">二、减少摄入（建议少吃）</td>
    </tr>
    <tr>
      <td colspan="4">
        <div v-html="tabPlanInfo.dietaryGuidanceDto.reduceIntake"></div>
      </td>
    </tr>
    <tr>
      <td colspan="4">三、不建议摄入（最好不吃）</td>
    </tr>
    <tr>
      <td colspan="4">
        <div v-html="tabPlanInfo.dietaryGuidanceDto.notRecommended"></div>
      </td>
    </tr>
    <tr>
      <td colspan="4">四、时间调整（餐饮时间管理）</td>
    </tr>
    <tr>
      <td colspan="4">
        <div v-html="tabPlanInfo.dietaryGuidanceDto.timeAdjustment"></div>
      </td>
    </tr>
    <tr>
      <td colspan="4">五、其他建议</td>
    </tr>
    <tr>
      <td colspan="4">
        <div v-html="tabPlanInfo.dietaryGuidanceDto.otherSuggestion"></div>
      </td>
    </tr>
  </table>
</template>

<script setup>
const props = defineProps({
  tabPlanInfo: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
