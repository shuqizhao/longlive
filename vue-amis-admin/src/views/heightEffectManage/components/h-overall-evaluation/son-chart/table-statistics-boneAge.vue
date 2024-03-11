<template>
  <table border="1">
    <tr>
      <th colspan="12">骨龄增长情况</th>
    </tr>
    <tr>
      <td>检测日期</td>
      <td>生活年龄</td>
      <td>骨龄</td>
      <td>身高（cm）</td>
      <td>身高百分位</td>
      <td>体重（kg）</td>
      <td>体重百分位</td>
      <td>BMI</td>
      <td>BMI百分位</td>
      <td>腹围</td>
      <td>预测身高</td>
    </tr>
    <tr v-for="item in bonAgeList" :key="item.uid">
      <td>{{ item.addTime }}</td>
      <td>{{ item.lifeAge }}</td>
      <td>{{ item.boneAge }}</td>
      <td>{{ item.currentHeight }}</td>
      <td>{{ item.heightPercent }}</td>
      <td>{{ item.currentWeight }}</td>
      <td>{{ item.weightPercent }}</td>
      <td>{{ item.bmi }}</td>
      <td>{{ item.bmipercent }}</td>
      <td>{{ item.abdominal }}</td>
      <td>{{ item.forecastHeight }}</td>
    </tr>
  </table>
  <div class="situation" v-if="evaluationReportType != 'QUARTER' && state.dateInterval > 200">
    <p class="situation-item">
      最近一年骨龄所对应的身高生长速度（实际生长速度）= {{ state.actualGrowthRate }} cm/骨龄年
    </p>
    <p class="situation-item">最近一年骨龄发育速度：{{ state.bonAgeDevelopRage }} 岁/年</p>
    <p class="situation-item" v-if="!fourFlag">
      骨龄对应的身高生长速度是否达到目标：
      <span v-if="!boneAgeInfo.boneAge || noDesign">未设计</span>
      <span v-else>
        {{Number(state.actualGrowthRate) &gt; Number(yearNeedHeight) ? '已达标' : '未达标' }}
      </span>
    </p>
  </div>
</template>

<script setup>
import { getDiffDay } from '@/utils/util'
import { computed, onMounted, reactive, watch, inject } from 'vue'
import useTableTarget from '@/hooks/useTableTarget'

const customerObj = inject('customerObj')

const props = defineProps({
  bonAgeList: {
    type: Array
  },
  overInfo: {
    type: Object
  },
  fourFlag: {
    type: Boolean
  },
  evaluationReportType: {
    type: String
  },
  boneAgeInfo: {
    type: Object
  }
})

const state = reactive({
  dateInterval: 0,
  diffHeight: '',
  diffBonAge: '',
  diffAge: '',
  actualGrowthRate: '', // 实际生长速度
  bonAgeDevelopRage: '', // 骨龄发育速度
  isStandard: false
})

const { yearNeedHeight } = useTableTarget(props)

watch(
  () => props.bonAgeList,
  (newVal, oldVal) => {
    if (newVal) {
      countBonAgeFn(newVal)
    }
  },
  { deep: true }
)

const noDesign = computed(() => {
  return (
    (customerObj.sex === '0' && props.boneAgeInfo.boneAge >= 14) ||
    (customerObj.sex === '1' && props.boneAgeInfo.boneAge >= 12)
  )
})

// 处理骨龄数据
const countBonAgeFn = (list) => {
  let dateArr = [],
    heightArr = [],
    bonAgeArr = [],
    ageArr = []

  list.forEach((item) => {
    dateArr.push(item.addTime)
    heightArr.push(item.currentHeight)
    bonAgeArr.push(item.boneAge)
    ageArr.push(item.lifeAge)
  })
  let fisrtDate = dateArr[0]
  let lastDate = dateArr[dateArr.length - 1]
  state.dateInterval = getDiffDay(lastDate, fisrtDate)

  let heightMax = Math.max(...heightArr)
  let heightMin = Math.min(...heightArr)
  state.diffHeight = (heightMax - heightMin).toFixed(1)

  let bonAgeMax = Math.max(...bonAgeArr)
  let bonAgeMin = Math.min(...bonAgeArr)
  if (bonAgeMax - bonAgeMin < 0.3) {
    state.diffBonAge = 0.3
  } else {
    state.diffBonAge = (bonAgeMax - bonAgeMin).toFixed(1)
  }
  // 实际生长速度
  state.actualGrowthRate = (state.diffHeight / state.diffBonAge).toFixed(1)

  let ageMax = Math.max(...ageArr)
  let ageMin = Math.min(...ageArr)
  state.diffAge = (ageMax - ageMin).toFixed(1)

  // 骨龄发育速度
  state.bonAgeDevelopRage = (state.diffBonAge / state.diffAge).toFixed(1)
}

onMounted(() => {
  countBonAgeFn(props.bonAgeList)
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
.situation {
  border-left: 1px solid #808080;
  border-right: 1px solid #808080;
  .situation-item {
    border-bottom: 1px solid #808080;
    padding: 5px;
  }
}
</style>
