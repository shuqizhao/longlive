<template>
  <table class="mt-10" border="1" v-if="customerObj.sex === '0'">
    <tr>
      <th colspan="10">性发育情况</th>
    </tr>
    <tr>
      <td>检测日期</td>
      <td>生活年龄</td>
      <td>骨龄</td>
      <td>性发育分期</td>
      <td>同期变化</td>
      <td>阴毛</td>
      <td>阴茎(cm)</td>
      <td>左睾丸(ml)</td>
      <td>右睾丸(ml)</td>
      <td>结论</td>
    </tr>
    <tr>
      <td>{{ currentInfo.addTime }}</td>
      <td>{{ currentInfo.lifeAge }}</td>
      <td>{{ currentInfo.boneAge }}</td>
      <td>{{ sexualData.sexualStage }}</td>
      <td>{{ changesSamePeriodFn(sexualData.changesSamePeriod) }}</td>
      <td>{{ sexualData.pubicHair }}</td>
      <td>{{ sexualData.penisLong }}</td>
      <td>{{ sexualData.leftTestisVolume }}</td>
      <td>{{ sexualData.rightTestisVolume }}</td>
      <td>{{ sexualData.conclusion }}</td>
    </tr>
  </table>
  <table class="mt-10" border="1" v-if="customerObj.sex === '1'">
    <tr>
      <th colspan="13">性发育情况</th>
    </tr>
    <tr style="background-color: rgba(62, 186, 155, 0.06); font-weight: bold; font-size: 15px">
      <td>检测日期</td>
      <td>生活年龄</td>
      <td>骨龄</td>
      <td>性发育分期</td>
      <td>同期变化</td>
      <td>乳房</td>
      <td>阴毛</td>
      <td>子宫(cm³)</td>
      <td>子宫内膜(cm)</td>
      <td>左卵泡(mm)</td>
      <td>右卵泡(mm)</td>
      <td width="15%">结论</td>
    </tr>
    <tr>
      <td>{{ currentInfo.addTime }}</td>
      <td>{{ currentInfo.lifeAge }}</td>
      <td>{{ currentInfo.boneAge }}</td>
      <td>{{ sexualData.sexualStage }}</td>
      <td>{{ changesSamePeriodFn(sexualData.changesSamePeriod) }}</td>
      <td>{{ sexualData.breast }}</td>
      <td>{{ sexualData.pubicHair }}</td>
      <td>{{ sexualData.uterusVolume }}</td>
      <td>{{ sexualData.uterusInThickness }}</td>
      <td>{{ sexualData.leftFollicle }}</td>
      <td>{{ sexualData.rightFollicle }}</td>
      <td>{{ sexualData.conclusion }}</td>
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import { boySameTermTypes, girlSameTermTypes } from '@/utils/config'

const props = defineProps({
  customerObj: {
    type: Object,
    default: () => {}
  },
  currentInfo: {
    type: Object
  }
})

const sexualData = computed(() => {
  if (props.customerObj.sex === '0') {
    return props.currentInfo.historyHeightSexualMale
  }
  if (props.customerObj.sex === '1') {
    return props.currentInfo.historyHeightSexualFemale
  }
})

const changesSamePeriodFn = (val) => {
  if (!val) return ''
  let tempArr = val.split(',')
  let titleArr = []
  let changeSameArr = []
  if (props.customerObj.sex === '0') {
    changeSameArr = boySameTermTypes
  } else {
    changeSameArr = girlSameTermTypes
  }
  changeSameArr.forEach((item) => {
    tempArr.forEach((ele) => {
      if (item.value === ele) {
        titleArr.push(item.label)
      }
    })
  })
  return titleArr.join(',')
}
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
