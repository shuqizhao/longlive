<template>
  <table border="1" cellpadding="3" style="width: 100%">
    <tr>
      <th colspan="4">遗传情况</th>
    </tr>
    <tr>
      <td width="25%">父亲身高</td>
      <td width="25%">{{ heredityInfo.fatherHeight }}</td>
      <td width="25%">父亲体重</td>
      <td width="25%">{{ heredityInfo.fatherWeight }}</td>
    </tr>
    <tr>
      <td width="25%">母亲身高</td>
      <td width="25%">{{ heredityInfo.motherHeight }}</td>
      <td width="25%">母亲体重</td>
      <td width="25%">{{ heredityInfo.motherWeight }}</td>
    </tr>
    <tr style="background-color: rgb(244, 228, 206)">
      <td width="25%">遗传中位数</td>
      <td width="25%">{{ heredityInfo.geneticsHeight }}</td>
      <td width="25%">百分位</td>
      <td width="25%">{{ heredityInfo.geneticsHeightPercent }}</td>
    </tr>
    <tr>
      <td>遗传上限</td>
      <td>{{ heredityInfo.potentialHeightUpper }}</td>
      <td>百分位</td>
      <td>{{ xx }}</td>
    </tr>
    <tr>
      <td>遗传下限</td>
      <td>{{ heredityInfo.potentialHeightLower }}</td>
      <td>百分位</td>
      <td>{{ xx }}</td>
    </tr>
  </table>
</template>

<script setup>
import { heightShortFilter } from '@/utils/filters'

const props = defineProps({
  heredityInfo: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
