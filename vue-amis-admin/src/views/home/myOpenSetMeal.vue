<template>
  <div class="echart-line">
    <div class="ta-right">
      <el-select v-model="selectData" class="m-2" placeholder="请选择" @change="handleChange">
        <el-option v-for="item in optionsData" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div ref="echartRef" class="echart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive,nextTick,onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { mySetMealBills } from '@/api/myWork'

// 在外定义储存图表 创建和销毁 的值
let myChart = null
const echartRef = ref(null)
const selectData = ref('2024')
const optionsData = ref([])

const handleChange = (value) => {
  selectData.value = value
  initData()
}

const initData = () => {
  let formData = {
    beginDate: selectData.value + '-01-01',
    endDate: selectData.value + '-12-31'
  }
  // mySetMealBills(formData).then((res) => {
  //   let resData = res.datas
  //   initEchart(formatData(resData))
  // })
}

const formatData = (list) => {
  let xArr = []
  let valArr = []
  for (let i = 0; i < list.length; i++) {
    xArr.push(list[i].date)
    valArr.push(list[i].count)
  }

  return {
    xArr,
    valArr
  }
}

const initEchart = (data) => {
  myChart = echarts.init(echartRef.value)
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.xArr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.valArr,
        type: 'line'
      }
    ]
  }
  option && myChart.setOption(option)

  //自适应大小
  window.onresize = function () {
    if(myChart) {
      myChart.resize()
    }
  }
}

onMounted(() => {
  for (let i = 2023; i < 2100; i++) {
    optionsData.value.push(i)
  }
  nextTick(() => {
    initData()
  })
})

onBeforeUnmount(() => {
  if (myChart) {
    //echarts销毁函数
    echarts.dispose(myChart)
    myChart = null
  }
})
</script>

<style lang="scss" scoped>
.echart-line {
  height: 250px;
  .echart {
    height: 100%;
  }
}
</style>
