<template>
  <table id="divh11" class="sleep-table" border="1" cellpadding="3">
    <tr>
      <th colspan="4">睡眠指导方案</th>
    </tr>
    <tr>
      <td>5.1、睡眠节律</td>
    </tr>
    <tr>
      <td>
        <div v-html="tabPlanInfo.sleepGuidanceDto.sleepRhythm"></div>
      </td>
    </tr>
    <tr>
      <td>5.2、睡前准备建议</td>
    </tr>
    <tr>
      <td>
        <div v-html="tabPlanInfo.sleepGuidanceDto.beforeSleepAdvice" style="padding-left: 15px"></div>
      </td>
    </tr>
    <tr>
      <td>5.3、夜间睡眠建议</td>
    </tr>
    <tr>
      <td>
        <div v-html="tabPlanInfo.sleepGuidanceDto.nightSleepAdvice" style="padding-left: 15px"></div>
      </td>
    </tr>
    <tr>
      <td>5.4、午睡建议</td>
    </tr>
    <tr>
      <td>
        <div v-html="tabPlanInfo.sleepGuidanceDto.napAdvice" style="padding-left: 15px"></div>
      </td>
    </tr>
    <tr>
      <td>5.5、其他建议</td>
    </tr>
    <tr>
      <td>
        <div v-html="tabPlanInfo.sleepGuidanceDto.otherAdvice" style="padding-left: 15px"></div>
      </td>
    </tr>
    <tr>
      <td>5.6、阶段性目标</td>
    </tr>
    <tr>
      <td>
        <div v-html="tabPlanInfo.sleepGuidanceDto.stagedGoals" style="padding-left: 15px"></div>
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
