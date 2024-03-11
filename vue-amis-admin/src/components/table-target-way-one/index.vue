<template>
  <div>
    <table border="1" v-if="customerObj.sex === '0'">
      <tr>
        <th colspan="4" style="background: #e7f7f4; color: #000">目标骨龄身高生长实现方法(一)</th>
      </tr>
      <tr>
        <td width="60%">假设未来1年身高增长</td>
        <td width="40%">5cm</td>
      </tr>
      <tr>
        <td>
          每月身高平均增加
          <div style="color: rgb(215, 124, 75)">1年身高增长值 / 12</div>
        </td>
        <td>0.4cm</td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 6.5 ">
          骨龄必须在1年消耗&lt;=
          <div style="color: rgb(215, 124, 75)">1年身高增长值 / 至骨龄14岁平均每岁骨龄需要增长身高</div>
        </td>
        <td v-else>
          骨龄必须在1年消耗&lt;=
          <div style="color: rgb(215, 124, 75)">1年身高增长值 / 至青春期平均每岁骨龄需要增长身高</div>
        </td>
        <td>{{ oneYearConsumeTarget1 }}岁骨龄</td>
      </tr>
    </table>
    <table border="1" v-if="customerObj.sex === '1'">
      <tr>
        <th colspan="4" style="background: #e7f7f4; color: #000">目标骨龄身高生长实现方法(一)</th>
      </tr>
      <tr>
        <td width="60%">假设未来1年身高增长</td>
        <td width="40%">5cm</td>
      </tr>
      <tr>
        <td>
          每月身高平均增加
          <div style="color: rgb(215, 124, 75)">1年身高增长值 / 12</div>
        </td>
        <td>0.4cm</td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 4.5 ">
          骨龄必须在1年消耗&lt;=
          <div style="color: rgb(215, 124, 75)">1年身高增长值 / 至骨龄12岁平均每岁骨龄需要增长身高</div>
        </td>
        <td v-else>
          骨龄必须在1年消耗&lt;=
          <div style="color: rgb(215, 124, 75)">1年身高增长值 / 至青春期平均每岁骨龄需要增长身高</div>
        </td>
        <td>{{ oneYearConsumeTarget1 }}岁骨龄</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import useTableTarget from '@/hooks/useTableTarget'

const customerObj = inject('customerObj')

const props = defineProps({
  overInfo: {
    type: Object
  },
  boneAgeInfo: {
    type: Object
  },
  boneAgeInfo: {
    type: Object
  }
})

const {
  diffHeight,
  diffstillNeedHeight,
  residueBoneAge,
  yearNeedHeight,
  oneYearConsumeTarget1,
  oneYearConsumeTarget2
} = useTableTarget(props)
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
