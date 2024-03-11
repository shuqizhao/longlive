<template>
  <table border="1" cellpadding="3" cellspacing="0" style="width: 100%">
    <tr>
      <th colspan="2">制定方案时骨龄数据</th>
    </tr>
    <tr>
      <td>测量时间</td>
      <td>{{ boneAgeInfo.addTime }}</td>
    </tr>
    <tr>
      <td>生活年龄</td>
      <td>{{ boneAgeInfo.lifeAge }}岁</td>
    </tr>
    <tr>
      <td>骨龄</td>
      <td>{{ boneAgeInfo.boneAge }}岁</td>
    </tr>
    <tr>
      <td>身高</td>
      <td>{{ boneAgeInfo.currentHeight }}cm</td>
    </tr>
  </table>
</template>

<script setup>
const props = defineProps({
  boneAgeInfo: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
