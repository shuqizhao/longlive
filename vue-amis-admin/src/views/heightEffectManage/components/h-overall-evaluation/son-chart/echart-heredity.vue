<template>
  <div>
    <!-- 遗传身高&实测身高曲线图 -->
    <div id="barEchart" ref="echartRef" class="echart"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch,onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  geneticsAndshiceData: {
    type: Array,
    default: () => []
  }
})
// 在外定义储存图表 创建和销毁 的值
let myChart = null
const echartRef = ref(null)

watch(
  () => props.geneticsAndshiceData,
  () => {
    beginFn()
  }
)


const beginFn = () => {
  let resData = formatData(props.geneticsAndshiceData)
  initEchart(resData)
}

const formatData = (data) => {
  let xData = []
  let geneticsArr = [],
    shiceArr = []
  for (let i = 0; i < data.length; i++) {
    xData.push(data[i].addTime)
    geneticsArr.push(data[i].currHeightOfTargetHeight)
    shiceArr.push(data[i].currentHeight)
  }

  let result = {
    xData,
    geneticsArr,
    shiceArr
  }
  return result
}

const initEchart = (dealData) => {
  // let myChart = echarts.init(echartRef.value);
  //解决警告 There is a chart instance already initialized on the dom.
  myChart = echarts.getInstanceByDom(echartRef.value)
  if (myChart == null) {
    myChart = echarts.init(echartRef.value)
  }

  let option = {
    title: {
      text: '遗传身高&实测身高曲线图',
      left: 'center',
      textStyle: {
        fontSize: 15
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      right: 'right',
      padding: [10, 10, 0, 0],
      data: ['遗传身高', '实测身高']
    },
    grid: {
      left: '3%',
      right: '15%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: dealData.xData
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax'
    },
    series: [
      {
        name: '遗传身高',
        type: 'line',
        data: dealData.geneticsArr
      },
      {
        name: '实测身高',
        type: 'line',
        data: dealData.shiceArr,
        label: {
          show: true,
          position: 'top'
        }
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
  nextTick(() => {
    beginFn()
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
.echart {
  height: 300px;
  padding-top: 20px;
}
</style>
