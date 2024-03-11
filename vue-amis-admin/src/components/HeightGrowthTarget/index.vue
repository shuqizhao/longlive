<template>
  <table border="1" cellpadding="3" cellspacing="0" v-if="customerObj.sex == '0'">
    <thead>
      <tr>
        <th colspan="4">男孩子各年龄段身高生长指标</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td width="25%">年龄（岁）</td>
        <td width="25%">全国均高（cm）</td>
        <td width="25%">增长指标（cm）</td>
        <td width="25%">增长份额（%）</td>
      </tr>
      <tr>
        <td>出生</td>
        <td>50.4</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>0~3</td>
        <td>96.8</td>
        <td>46.4</td>
        <td>38%</td>
      </tr>
      <tr>
        <td>3~11.5</td>
        <td>148.4</td>
        <td>51.6</td>
        <td>42%</td>
      </tr>
      <tr>
        <td>11.5~16</td>
        <td>171.6</td>
        <td>23.2</td>
        <td>19%</td>
      </tr>
      <tr>
        <td>16~18</td>
        <td>172.7</td>
        <td>1</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
  <table border="1" cellpadding="3" cellspacing="0" v-if="customerObj.sex == '1'">
    <thead>
      <tr>
        <th colspan="4">女孩子各年龄段身高生长指标</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td width="25%">年龄（岁）</td>
        <td width="25%">全国均高（cm）</td>
        <td width="25%">增长指标（cm）</td>
        <td width="25%">增长份额（%）</td>
      </tr>
      <tr>
        <td>出生</td>
        <td>49.7</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>0~3</td>
        <td>95.6</td>
        <td>46</td>
        <td>42%</td>
      </tr>
      <tr>
        <td>3~9.5</td>
        <td>137.0</td>
        <td>41.4</td>
        <td>38%</td>
      </tr>
      <tr>
        <td>9.5~14</td>
        <td>158.6</td>
        <td>21.6</td>
        <td>20%</td>
      </tr>
      <tr>
        <td>14~18</td>
        <td>160.6</td>
        <td>2</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  customerObj: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
table {
  margin-top: 10px;
}
</style>
