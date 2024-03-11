<template>
  <div>
    <div id="barEchart" ref="echartRef" class="echart"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch,onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartPerData: {
    type: Array
  },
  heightWeightBmiData: {
    type: Object
  }
})
// 在外定义储存图表 创建和销毁 的值
let myChart = null

const echartRef = ref(null)
const colors = ['#FFDCB5', '#CFE9C2', '#C2ECDA', '#C9EAED', '#C3D1FF', '#EDD7FC', '#FEE4F2', 'red']

watch(
  () => props.heightWeightBmiData,
  () => {
    beginFn()
  }
)

const beginFn = () => {
  let resData = formatData(props.chartPerData)
  initEchart(resData)
}

const formatData = (list) => {
  let nameArr = []
  let labelArr = []
  let series = []
  let shiceVal = []
  props.heightWeightBmiData.map((item) => {
    nameArr.push(item.ageStr)
    shiceVal.push(item.currentWeight)
  })

  // 过滤出需要的数据
  let needList = list.filter((item) => props.heightWeightBmiData.some((ele) => ele.age === item.age))

  let afterObj = {}
  for (var i = 0; i < needList.length; i++) {
    if (!afterObj[needList[i].weightPercentile]) {
      var arr = []
      arr.push(needList[i].weight)
      afterObj[needList[i].weightPercentile] = arr
    } else {
      afterObj[needList[i].weightPercentile].push(needList[i].weight)
    }
  }

  let wholeData = [
    { name: '97th', dataArr: afterObj[97] },
    { name: '90th', dataArr: afterObj[90] },
    { name: '75th', dataArr: afterObj[75] },
    { name: '50th', dataArr: afterObj[50] },
    { name: '25th', dataArr: afterObj[25] },
    { name: '10th', dataArr: afterObj[10] },
    { name: '3rd', dataArr: afterObj[3] },
    { name: '实测值', dataArr: shiceVal, labelShow: true }
  ]

  wholeData.forEach((ele, index) => {
    labelArr.push(ele.name)
    series.push({
      name: ele.name,
      type: 'line',
      lineStyle: {
        color: colors[index] // 折线图颜色
      },
      itemStyle: {
        color: colors[index] // 折线图点的颜色
      },
      data: ele.dataArr,
      label: {
        show: ele.labelShow,
        position: 'top'
      }
    })
  })

  return {
    nameArr,
    labelArr,
    series
  }
}

const initEchart = (data) => {
  myChart = echarts.getInstanceByDom(echartRef.value)
  if (myChart == null) {
    myChart = echarts.init(echartRef.value)
  }
  let option = {
    title: {
      text: '体重曲线图（月）',
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
      data: data.labelArr
    },
    grid: {
      left: '3%',
      right: '18%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      // type: 'category',
      boundaryGap: true,
      data: data.nameArr,
      axisLabel: {
        formatter: function (value) {
          return value.replace(/岁/g, '岁\n')
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax'
    },
    series: data.series
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
  height: 320px;
  padding-top: 20px;
}
</style>
