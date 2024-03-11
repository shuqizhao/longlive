<template>
  <table border="1">
    <tr>
      <th colspan="4">当前情况</th>
    </tr>
    <tr>
      <td width="25%">测量时间</td>
      <td width="25%">{{ currentInfo.addTime }}</td>
      <td width="25%">生活年龄</td>
      <td width="25%">{{ currentInfo.lifeAge }}</td>
    </tr>
    <tr>
      <td>目前身高(cm)</td>
      <td>{{ currentInfo.currentHeight }}</td>
      <td>百分位</td>
      <td>{{ currentInfo.heightPercent }}</td>
    </tr>
    <tr v-if="currentInfo.boneAge">
      <td>当前骨龄</td>
      <td>{{ currentInfo.boneAge }}</td>
      <td colspan="2" :class="{'color-warning': Number(currentInfo.boneAge) &gt; Number(currentInfo.lifeAge)}">
        <!-- 骨龄大于生活年龄 显示红色 -->
        {{ overallBoneAgeFilter(currentInfo.boneAge, currentInfo.lifeAge, customerObj.sex, true) }}
      </td>
    </tr>
    <tr>
      <td>目前体重(kg)</td>
      <td>{{ currentInfo.currentWeight }}</td>
      <td>百分位</td>
      <td>{{ currentInfo.weightPercent }}</td>
    </tr>
    <tr>
      <td>BMI</td>
      <td>{{ currentInfo.bmi }}</td>
      <td>百分位</td>
      <td>{{ currentInfo.bmipercent }}</td>
    </tr>
    <tr>
      <td>体形</td>
      <td>{{ bodyComp }}</td>
      <td>腹围(cm)</td>
      <td>{{ currentInfo.abdominal }}</td>
    </tr>
    <tr>
      <td>性发育情况</td>
      <td>{{ currentInfo.sexual ? '已发育' : '未发育' }}</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4">
        评价： {{ heightPercentFilter(currentInfo.heightPercent) }} <br />
        <span>
          当前体形：{{ bodyComp }}身材
          <span v-if="!currentInfo.boneAge && bodyComp">{{
            bodyComp.includes('匀称')
              ? '，骨龄等于年龄的可能性较大'
              : bodyComp.includes('苗条')
              ? '，骨龄小于年龄的可能性较大'
              : '，骨龄>生活年龄的可能性比较大，降低了实现期望身高的可能'
          }}</span>
          <br />
        </span>
        {{ figureFilter(currentInfo.heightPercent, expectedInfo.geneticsHeightPercent) }}
      </td>
    </tr>
  </table>
</template>

<script setup>
import { statureFilter, overallBoneAgeFilter, heightPercentFilter, figureFilter } from '@/utils/filters'
import { computed, inject } from 'vue'
const props = defineProps({
  expectedInfo: {
    type: Object
  },
  currentInfo: {
    type: Object
  }
})

const customerObj = inject('customerObj')

const bodyComp = computed(() => {
  return statureFilter(props.currentInfo.bmipercent, props.currentInfo.heightPercent, props.currentInfo.weightPercent)
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
