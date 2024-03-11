<template>
  <!-- 无骨龄情况 -->
  <table border="1" v-if="!boneAgeInfo.boneAge">
    <tr>
      <th colspan="4">期望身高</th>
    </tr>
    <tr>
      <td width="25%">期望身高</td>
      <td width="25%">{{ expectedInfo.expectHeight }}</td>
      <td width="25%">百分位</td>
      <td width="25%">{{ expectedInfo.expectHeightPercent }}</td>
    </tr>
    <tr>
      <td colspan="4">当前身高和期望身高的差值：{{ diffHeight }}cm</td>
    </tr>
    <tr>
      <td colspan="4">
        假设骨龄=年龄，则该水平对应的成年身高为{{ currentInfo.forecastHeight }}cm， 和期望身高差距{{ residueExpect }}cm
      </td>
    </tr>
    <tr>
      <td colspan="4">
        <span
          >假设骨龄>年龄1岁，则该水平对应的成年身高为{{ bigOneYear }}cm， 和期望身高差距{{
            twoNumDiff(expectedInfo.expectHeight, bigOneYear)
          }}cm</span
        >
      </td>
    </tr>
    <tr>
      <td colspan="4">
        <span class="color-warning">没有骨龄数据，请尽快拍摄骨龄，科学管理儿童身高</span>
      </td>
    </tr>
  </table>
  <!-- 有骨龄情况 -->
  <table border="1" v-if="boneAgeInfo.boneAge && !boneAgeFlag">
    <tr>
      <th colspan="4">期望身高</th>
    </tr>
    <tr>
      <td width="25%">期望身高</td>
      <td width="25%">{{ expectedInfo.expectHeight }}</td>
      <td width="25%">百分位</td>
      <td width="25%">{{ expectedInfo.expectHeightPercent }}</td>
    </tr>
    <tr>
      <td colspan="4">当前身高和期望身高的差值：{{ diffHeight }}cm</td>
    </tr>
    <tr>
      <td colspan="4">到身高长完剩余骨龄平均还能长：{{ residueHeight }}cm，和期望身高差{{ residueExpect }}cm</td>
    </tr>
    <tr>
      <td colspan="4">
        <div v-if="expectedInfo.sex === 0">
          <span v-if="Number(boneAgeInfo.boneAge) < 16">
            到身高长完还剩余骨龄（16-当前骨龄）= {{ twoNumDiff(16, boneAgeInfo.boneAge) }} 岁骨龄
          </span>
          <span v-if="Number(boneAgeInfo.boneAge) >= 16"> 当前骨龄{{ boneAgeInfo.boneAge }}岁，骨骺已闭合。 </span>
        </div>
        <div v-if="expectedInfo.sex === 1">
          <span v-if="Number(boneAgeInfo.boneAge) < 14">
            到身高长完还剩余骨龄（14-当前骨龄）= {{ twoNumDiff(14, boneAgeInfo.boneAge) }} 岁骨龄
          </span>
          <span v-if="Number(boneAgeInfo.boneAge) >= 14"> 当前骨龄{{ boneAgeInfo.boneAge }}岁，骨骺已闭合。 </span>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="4">
        <div v-if="expectedInfo.sex === 0">
          <!-- 男孩生活年龄11.5以下 -->
          <span v-if="Number(boneAgeInfo.boneAge) &lt; 11.5">
            至青春期剩余骨龄（11.5-当前骨龄）= {{ twoNumDiff(11.5, boneAgeInfo.boneAge) }} 岁骨龄
          </span>
          <span v-if="Number(boneAgeInfo.boneAge) >= 11.5 && Number(boneAgeInfo.boneAge) < 14">
            到骨龄14岁还剩余骨龄（14-当前骨龄）= {{ twoNumDiff(14, boneAgeInfo.boneAge) }} 岁骨龄
          </span>
          <span v-if="Number(boneAgeInfo.boneAge) >= 14"></span>
        </div>
        <div v-if="expectedInfo.sex === 1">
          <!-- 女孩生活年龄9.5以下 -->
          <span v-if="Number(boneAgeInfo.boneAge) &lt; 9.5">
            至青春期剩余骨龄（9.5-当前骨龄）= {{ twoNumDiff(9.5, boneAgeInfo.boneAge) }} 岁骨龄
          </span>
          <span v-if="Number(boneAgeInfo.boneAge) >= 9.5 && Number(boneAgeInfo.boneAge) < 12">
            到骨龄12岁还剩余骨龄（12-当前骨龄）= {{ twoNumDiff(12, boneAgeInfo.boneAge) }} 岁骨龄
          </span>
          <span v-if="Number(boneAgeInfo.boneAge) >= 12"></span>
        </div>
      </td>
    </tr>
  </table>
  <!-- 有骨龄情况，并且骨龄不是最近测的 -->
  <table border="1" v-if="boneAgeInfo.boneAge && boneAgeFlag">
    <tr>
      <th colspan="4">期望身高</th>
    </tr>
    <tr>
      <td width="25%">期望身高</td>
      <td width="25%">{{ expectedInfo.expectHeight }}</td>
      <td width="25%">百分位</td>
      <td width="25%">{{ expectedInfo.expectHeightPercent }}</td>
    </tr>
    <tr>
      <td colspan="4">当前身高和期望身高的差值：{{ diffHeight }}cm</td>
    </tr>
    <tr>
      <td colspan="4">
        骨龄对应的成年身高={{ boneAgeInfo.forecastHeight }}cm,和期望身高相比{{
          heightShortFilter(boneAgeInfo.forecastHeight, expectedInfo.expectHeight)
        }}
      </td>
    </tr>
    <tr>
      <td colspan="4">
        {{ overallBoneAgeFilter(boneAgeInfo.boneAge, boneAgeInfo.lifeAge, customerObj.sex) }}
      </td>
    </tr>
    <tr>
      <td colspan="4" class="color-warning">最近的骨龄测量时间距离现在已有{{ diffDays }}天</td>
    </tr>
  </table>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import { twoNumDiff, overallBoneAgeFilter, heightShortFilter } from '@/utils/filters'
import { getHeightCustomization } from '@/api/heightManageCom/h-birth-heredity'
import { getDiffDay } from '@/utils/util'

const props = defineProps({
  expectedInfo: {
    type: Object
  },
  currentInfo: {
    type: Object
  },
  customerObj: {
    type: Object,
    default: () => {}
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
const bigOneYear = ref(null)

const residueHeight = computed(() => {
  return (props.boneAgeInfo.forecastHeight - props.currentInfo.currentHeight).toFixed(1)
})

const residueExpect = computed(() => {
  return (props.expectedInfo.expectHeight - props.currentInfo.forecastHeight).toFixed(1)
})

const diffHeight = computed(() => {
  return (props.expectedInfo.expectHeight - props.currentInfo.currentHeight).toFixed(1)
})

const diffDays = computed(() => {
  if (props.boneAgeFlag) {
    return getDiffDay(props.boneAgeInfo.addTime, customerObj.currentTime)
  } else {
    return getDiffDay(props.currentInfo.addTime, customerObj.currentTime)
  }
})

watch(
  () => props.currentInfo.currentHeight,
  (newVal, oldVal) => {
    if (newVal) {
      _getHeightCustomization()
    }
  }
)

const _getHeightCustomization = () => {
  const data = {
    birth: props.customerObj.birthday,
    sex: props.customerObj.sex,
    height: props.currentInfo.currentHeight,
    weight: props.currentInfo.currentWeight,
    diagnosisTime: props.currentInfo.addTime, // 传添加日期
    boneAge: Number(props.currentInfo.lifeAge) + 1, // 假设骨龄>生活年龄1岁
    geneticHeight: props.expectedInfo.geneticsHeight, // 遗传身高
    expectedHeight: props.expectedInfo.expectHeight
  }
  getHeightCustomization(data).then((res) => {
    bigOneYear.value = res.datas.forecastHeight
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
