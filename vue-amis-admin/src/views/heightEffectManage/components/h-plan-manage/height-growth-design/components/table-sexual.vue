<template>
  <table class="mt-10" border="1" cellpadding="3" v-if="customerObj.sex === '0'">
    <tr>
      <th colspan="4">性发育情况</th>
    </tr>
    <tr>
      <td width="25%">检查日期</td>
      <td width="25%">{{ currentInfo.addTime }}</td>
      <td width="25%"></td>
      <td width="25%"></td>
    </tr>
    <tr>
      <td>生活年龄</td>
      <td>{{ currentInfo.lifeAge }}</td>
      <td>骨龄</td>
      <td>{{ currentInfo.boneAge }}</td>
    </tr>
    <tr>
      <td>性发育分期</td>
      <td>{{ sexualData.sexualStage }}</td>
      <td>同期变化</td>
      <td>{{ changesSamePeriodFn(sexualData.changesSamePeriod) }}</td>
    </tr>
    <tr>
      <td>阴毛</td>
      <td>{{ sexualData.pubicHair }}</td>
      <td>阴茎</td>
      <td>{{ sexualData.penisLong }} cm</td>
    </tr>
    <tr>
      <td>左睾丸长径cm</td>
      <td>{{ sexualData.leftTestisLongDiameter }}</td>
      <td>右睾丸长径cm</td>
      <td>{{ sexualData.rightTestisLongDiameter }}</td>
    </tr>
    <tr>
      <td>左睾丸容积ml</td>
      <td>{{ sexualData.leftTestisVolume }}</td>
      <td>右睾丸容积ml</td>
      <td>{{ sexualData.rightTestisVolume }}</td>
    </tr>
    <tr>
      <td>备注</td>
      <td colspan="3">{{ sexualData.remark }}</td>
    </tr>
  </table>
  <table class="mt-10" border="1" cellpadding="3" v-if="customerObj.sex === '1'">
    <tr>
      <th colspan="4">性发育情况</th>
    </tr>
    <tr>
      <td>检查日期</td>
      <td>{{ currentInfo.addTime }}</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>生活年龄</td>
      <td>{{ currentInfo.lifeAge }}</td>
      <td>骨龄</td>
      <td>{{ currentInfo.boneAge }}</td>
    </tr>
    <tr>
      <td>性发育分期</td>
      <td>{{ sexualData.sexualStage }}</td>
      <td>同期变化</td>
      <td>{{ changesSamePeriodFn(sexualData.changesSamePeriod) }}</td>
    </tr>
    <tr>
      <td>乳房</td>
      <td>{{ sexualData.breast }}</td>
      <td>阴毛</td>
      <td>{{ sexualData.pubicHair }}</td>
    </tr>
    <tr>
      <td>子宫大小</td>
      <td>
        <span>{{ sexualData.uterusVolume }}</span>
        <span v-if="sexualData.uterusVolume"> cm³</span>
      </td>
      <td>子宫内膜厚度</td>
      <td>
        <span>{{ sexualData.uterusInThickness }}</span>
        <span v-if="sexualData.uterusInThickness"> cm</span>
      </td>
    </tr>
    <tr>
      <td>左卵泡大小</td>
      <td>
        <span>{{ sexualData.leftFollicle }}</span>
        <span v-if="sexualData.leftFollicle"> mm</span>
      </td>
      <td>右卵泡大小</td>
      <td>
        <span>{{ sexualData.rightFollicle }}</span>
        <span v-if="sexualData.rightFollicle"> mm</span>
      </td>
    </tr>
    <tr>
      <td>备注</td>
      <td colspan="3">{{ sexualData.remark }}</td>
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
