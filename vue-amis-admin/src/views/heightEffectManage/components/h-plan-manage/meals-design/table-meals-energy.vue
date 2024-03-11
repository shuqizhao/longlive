<template>
  <table class="meals-table" border="1" cellpadding="3">
    <tr>
      <th colspan="5">{{ customerObj.customerName }}能量需求总量：{{ energyTotalData }} kcal/d</th>
    </tr>
    <tr>
      <td>指标</td>
      <td>能量占比</td>
      <td>需求总量(kcal)</td>
      <td>1g产能(kcal)</td>
      <td>需供总量(g)</td>
    </tr>
    <tr>
      <td>蛋白质</td>
      <td>25%</td>
      <td>{{ getMultiplyData(energyTotalData, 0.25) }}</td>
      <td>4</td>
      <td style="background: rgba(217, 161, 70, 0.22)">
        {{ getDividedData(energyTotalData, 0.25, 4) }}
      </td>
    </tr>
    <tr>
      <td>脂肪</td>
      <td>20%</td>
      <td>{{ getMultiplyData(energyTotalData, 0.2) }}</td>
      <td>9</td>
      <td style="background: rgba(217, 161, 70, 0.22)">
        {{ getDividedData(energyTotalData, 0.2, 9) }}
      </td>
    </tr>
    <tr>
      <td>碳水</td>
      <td>55%</td>
      <td>{{ getMultiplyData(energyTotalData, 0.55) }}</td>
      <td>4</td>
      <td style="background: rgba(217, 161, 70, 0.22)">
        {{ getDividedData(energyTotalData, 0.55, 4) }}
      </td>
    </tr>
  </table>
  <p class="tip-word">数据来源《中国儿童青少年推荐能量摄入量》仅为需要控制体重儿童提供数据支持，表格内容不会显示给用户。</p>
</template>

<script setup>
import { inject } from 'vue'
import { getMultiplyData, getDividedData } from '@/utils/util'
import { energyTotal } from '@/utils/filters'

const customerObj = inject('customerObj')

const props = defineProps({
  currentInfo: {
    type: Object
  }
})

const energyTotalData = energyTotal(props.currentInfo.lifeAge,customerObj.sex)

</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
.meals-table {
  width: 800px;
}
.tip-word{
  color: rgb(102, 102, 102);
  font-size: 13px;
  margin: 10px 0px 30px;
}
</style>
