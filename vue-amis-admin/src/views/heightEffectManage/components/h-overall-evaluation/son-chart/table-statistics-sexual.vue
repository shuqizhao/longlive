<template>
  <table border="1" v-if="customerObj.sex === '0'">
    <tr>
      <th colspan="10">性发育情况</th>
    </tr>
    <tr>
      <td>检测日期</td>
      <td>生活年龄</td>
      <td>骨龄</td>
      <td>性发育分期</td>
      <td>同期变化</td>
      <td style="width: 130px">阴毛</td>
      <td>阴茎(cm)</td>
      <td>左睾丸(ml)</td>
      <td>右睾丸(ml)</td>
      <td>结论</td>
    </tr>
    <tr v-for="item in sexualData" :key="item.uid">
      <td>{{ item.addTime }}</td>
      <td>{{ item.lifeAge }}</td>
      <td>{{ item.boneAge }}</td>
      <td>{{ item.sexualStage }}</td>
      <td>{{ changesSamePeriodFn(item.changesSamePeriod) }}</td>
      <td>{{ item.pubicHair }}</td>
      <td>{{ item.penisLong }}</td>
      <td>{{ item.leftTestisVolume }}</td>
      <td>{{ item.rightTestisVolume }}</td>
      <td>{{ item.conclusion }}</td>
    </tr>
  </table>
  <table border="1" v-if="customerObj.sex === '1'">
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
      <td style="width: 130px">阴毛</td>
      <td>子宫（ml）</td>
      <td>子宫内膜(cm)</td>
      <td>左卵泡(mm)</td>
      <td>右卵泡(mm)</td>
      <td>结论</td>
    </tr>
    <tr v-for="item in sexualData" :key="item.uid">
      <td>{{ item.addTime }}</td>
      <td>{{ item.lifeAge }}</td>
      <td>{{ item.boneAge }}</td>
      <td>{{ item.sexualStage }}</td>
      <td>{{ changesSamePeriodFn(item.changesSamePeriod) }}</td>
      <td>{{ item.breast }}</td>
      <td>{{ item.pubicHair }}</td>
      <td>{{ item.uterusVolume }}</td>
      <td>{{ item.uterusInThickness }}</td>
      <td>{{ item.leftFollicle }}</td>
      <td>{{ item.rightFollicle }}</td>
      <td>{{ item.conclusion }}</td>
    </tr>
  </table>
</template>

<script setup>
import { boySameTermTypes, girlSameTermTypes } from '@/utils/config'

const props = defineProps({
  customerObj: {
    type: Object,
    default: () => {}
  },
  sexualData: {
    type: Array,
    default: () => []
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
