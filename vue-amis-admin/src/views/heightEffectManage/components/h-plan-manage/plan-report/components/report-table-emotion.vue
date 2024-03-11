<template>
  <table id="divh12" border="1" cellpadding="3">
    <tr>
      <th colspan="4">情绪指导方案</th>
    </tr>
    <tr>
      <td colspan="4">
        <div v-html="tabPlanInfo.emotionGuidanceDto.remark"></div>
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
