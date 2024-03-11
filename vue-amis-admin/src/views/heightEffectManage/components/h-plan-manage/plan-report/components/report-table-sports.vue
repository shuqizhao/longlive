<template>
  <table id="divh10" border="1" cellpadding="3">
    <tr>
      <th colspan="4">运动指导方案</th>
    </tr>
    <tbody v-for="item in tabPlanInfo.sportsGuidanceDto.sportsGuidanceTemplate1" :key="item.sportsGuidanceUid">
      <tr>
        <td class="text-center" style="width: 110px">
          {{ item.sportType }}
        </td>
        <td class="pl-1">{{ item.sportQuantity }} {{ item.sportFrequency }}</td>
      </tr>
      <tr>
        <td class="text-center" style="width: 110px">运动建议</td>
        <td class="pl-1">
          {{ item.sportAdvice }}
        </td>
      </tr>
    </tbody>
    <tr>
      <td class="text-center" style="width: 110px">备注</td>
      <td>
        <div v-html="tabPlanInfo.sportsGuidanceDto.remark"></div>
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
