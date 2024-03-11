<template>
  <table border="1">
    <tr>
      <th colspan="4">实现期望身高的难度</th>
    </tr>
    <tr>
      <td>
        1、当前身高：当前年龄所对应的身高百分位为{{ currentInfo.heightPercent }}th，{{
          heightPercentFilter(currentInfo.heightPercent)
        }}
      </td>
    </tr>
    <tr>
      <td>
        2、当前体形：{{ bodyComp }}身材
        <!-- 没有骨龄情况下 -->
        <span v-if="!boneAgeInfo.boneAge && bodyComp">{{
          bodyComp.includes('匀称')
            ? '，骨龄等于年龄的可能性较大'
            : bodyComp.includes('苗条')
            ? '，骨龄小于年龄的可能性较大'
            : '，骨龄>生活年龄的可能性比较大，降低了实现期望身高的可能'
        }}</span>
      </td>
    </tr>
    <tr>
      <td>
        3、{{
          geneticPotentialFilter(
            overInfo.geneticsHeight,
            overInfo.expectHeight,
            currentInfo.heightPercent,
            overInfo.geneticsHeightPercent
          )
        }}
      </td>
    </tr>
    <tr>
      <td>
        4、
        <span v-if="boneAgeInfo.boneAge">
          当前骨龄所对应的成年身高为{{ boneAgeInfo.forecastHeight }}cm，和期望身高相比{{
            heightShortFilter(boneAgeInfo.forecastHeight, overInfo.expectHeight)
          }}
        </span>
        <span v-else>无骨龄数据，请尽快拍摄骨龄，以便更为准确的了解孩子的身高增长情况</span>
      </td>
    </tr>
    <tr v-if="boneAgeInfo.boneAge">
      <td>5、{{ overallBoneAgeFilter(boneAgeInfo.boneAge, boneAgeInfo.lifeAge, customerObj.sex) }}</td>
    </tr>
    <tr v-if="boneAgeInfo.boneAge">
      <td>
        {{ result }}
      </td>
    </tr>
    <tr v-if="boneAgeInfo.boneAge">
      <td>
        6、实现期望身高的难易程度：{{ expectHeightDiff(overInfo.expectHeight, boneAgeInfo.forecastHeight) }}
        <span v-if="boneAgeInfo.boneAge &lt; 4">儿童年龄越小，实现期望身高的难度越小</span>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { computed, inject } from 'vue'
import {
  heightPercentFilter,
  statureFilter,
  heightShortFilter,
  overallBoneAgeFilter,
  expectHeightDiff,
  geneticPotentialFilter
} from '@/utils/filters'
import { getDiffDay } from '@/utils/util'

const props = defineProps({
  overInfo: {
    type: Object
  },
  currentInfo: {
    type: Object
  },
  boneAgeFlag: {
    type: Boolean,
    deflut: false
  },
  boneAgeInfo: {
    type: Object
  }
})

const customerObj = inject('customerObj')

const bodyComp = computed(() => {
  return statureFilter(props.currentInfo.bmipercent, props.currentInfo.heightPercent, props.currentInfo.weightPercent)
})

const residueExpect = computed(() => {
  return (props.overInfo.expectHeight - props.currentInfo.forecastHeight).toFixed(1)
})

const diffDays = computed(() => {
  if (props.boneAgeFlag) {
    return getDiffDay(props.boneAgeInfo.addTime, customerObj.currentTime)
  } else {
    return getDiffDay(props.currentInfo.addTime, customerObj.currentTime)
  }
})

const result = computed(() => {
  let num = Number(props.boneAgeInfo.boneAge)
  if (num < 3) {
    return `上次骨龄测量时间距离现在已有${diffDays.value}天，婴儿期的孩子至少每一年做一次骨龄评价，以便了解孩子骨龄消耗速度，为孩子身高速度设计提供依据`
  } else if (
    (props.overInfo.sex == 0 && num >= 3 && num < 11.5) ||
    (props.overInfo.sex == 1 && num >= 3 && num < 9.5)
  ) {
    return `上次骨龄测量时间距离现在已有${diffDays.value}天，平台期的孩子至少每一年做一次骨龄评价，以便了解孩子骨龄消耗速度，为孩子身高速度设计提供依据`
  } else if (
    (props.overInfo.sex == 0 && num >= 11.5 && num < 16) ||
    (props.overInfo.sex == 1 && num >= 9.5 && num < 14)
  ) {
    return `上次骨龄测量时间距离现在已有${diffDays.value}天，青春期的孩子至少每半年至一年做一次骨龄评价，以便了解孩子骨龄消耗速度，为孩子身高速度设计提供依据`
  } else {
    return `上次骨龄测量时间距离现在已有${diffDays.value}天，孩子骨骺可能已闭合`
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
