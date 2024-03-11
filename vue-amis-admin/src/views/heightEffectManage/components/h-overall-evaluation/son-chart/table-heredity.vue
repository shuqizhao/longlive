<template>
  <table border="1">
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
    <tr>
      <td width="25%">遗传中位数</td>
      <td width="25%">{{ heredityInfo.geneticsHeight }} ± 6.5</td>
      <td width="25%">百分位</td>
      <td width="25%">{{ heredityInfo.geneticsHeightPercent }}</td>
    </tr>
    <tr>
      <td colspan="4">
        遗传身高和期望身高相比：{{ heightShortFilter(heredityInfo.geneticsHeight, heredityInfo.expectHeight) }}
      </td>
    </tr>
    <tr>
      <td colspan="4">
        <p v-if="Number(lastGenNum) <= Number(lastShice)">
          已达到遗传应有身高，环境因素对儿童身高起了促进作用，
          <span class="color-warning">提升身高水平较难，想要达到期望身高应该重视骨龄消耗</span>
        </p>
        <p v-else>
          目前未达到遗传应有身高，
          <span class="color-warning"
            >说明环境因素对儿童身高生长起了阻碍作用，孩子身高的遗传潜能发挥不佳。但是，另一方面也说明，要想进一步提高年龄的身高水平有可能。</span
          >
        </p>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { heightShortFilter } from '@/utils/filters'
const props = defineProps({
  heredityInfo: {
    type: Object
  },
  lastGenNum: {
    type: String
  },
  lastShice: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
