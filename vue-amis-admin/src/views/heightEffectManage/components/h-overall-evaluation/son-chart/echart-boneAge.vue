<template>
  <div>
    <!-- 骨龄对应身高生长曲线 -->
    <div ref="echartRef" class="echart"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref,onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  heightData: {
    type: Array,
    default: () => []
  },
  boneAgeData: {
    type: Array,
    default: () => []
  }
})

// 在外定义储存图表 创建和销毁 的值
let myChart = null

const echartRef = ref(null)

const colors = ['#FFDCB5', '#CFE9C2', '#C2ECDA', '#C9EAED', '#C3D1FF', '#EDD7FC', '#FEE4F2', 'red']

const beginFn = () => {
  let resData = formatData(props.heightData)
  initEchart(resData)
}

const formatData = (list) => {
  let nameArr = []
  let labelArr = []

  let series = []
  let thThreeArr = [],
    thTenArr = [],
    thTwentyFiveArr = [],
    thFiftyArr = [],
    thSeventyFiveArr = [],
    thNinetyArr = [],
    thNinetySevenArr = []

  list.forEach((item) => {
    nameArr.push(item.age / 12)
    thThreeArr.push([item.age / 12, item.thThree])
    thTenArr.push([item.age / 12, item.thTen])
    thTwentyFiveArr.push([item.age / 12, item.thTwentyFive])
    thFiftyArr.push([item.age / 12, item.thFifty])
    thSeventyFiveArr.push([item.age / 12, item.thSeventyFive])
    thNinetyArr.push([item.age / 12, item.thNinety])
    thNinetySevenArr.push([item.age / 12, item.thNinetySeven])
  })

  let wholeData = [
    { name: '97th', dataArr: thNinetySevenArr },
    { name: '90th', dataArr: thNinetyArr },
    { name: '75th', dataArr: thSeventyFiveArr },
    { name: '50th', dataArr: thFiftyArr },
    { name: '25th', dataArr: thTwentyFiveArr },
    { name: '10th', dataArr: thTenArr },
    { name: '3rd', dataArr: thThreeArr },
    { name: '实测值', dataArr: props.boneAgeData }
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
      label: {
        show: true,
        position: 'right',
        formatter: function (params) {
          if (params.dataIndex === ele.dataArr.length - 1) {
            return params.value[1] // 标签显示数据点的值
          } else {
            return ''
          }
        }
      },
      data: ele.dataArr
    })
  })

  return {
    nameArr,
    labelArr,
    series
  }
}

const initEchart = (data) => {
  myChart = echarts.init(echartRef.value)
  let option = {
    title: {
      text: '骨龄对应身高生长情况',
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
      right: '16%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      // type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 2 //设置 X 轴数据间隔几个显示一个，为0表示都显示
      },
      splitLine: {
        show: true
      },
      min: Math.min(...data.nameArr),
      max: Math.max(...data.nameArr)
      // data: data.nameArr
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
  height: 400px;
  padding-top: 20px;
}
</style>
