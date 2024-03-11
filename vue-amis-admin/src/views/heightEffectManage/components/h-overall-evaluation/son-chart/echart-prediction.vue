<template>
  <div>
    <!-- 预测身高 -->
    <div id="prediction" ref="echartRef" class="echart"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref,onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  fourFlag: {
    type: Boolean,
    default: false
  },
  heightCompareBar: {
    type: Array,
    default: () => []
  },
  expectHeight: {
    type: String
  }
})
// 在外定义储存图表 创建和销毁 的值
let myChart = null

const echartRef = ref(null)

const beginFn = () => {
  let resData = formatData(props.heightCompareBar)
  initEchart(resData)
}

const formatData = (data) => {
  let nameData = []
  let valArr = []
  for (let i = 0; i < data.length; i++) {
    nameData.push(data[i].name)
    valArr.push(data[i].val)
  }
  let result = {
    nameData,
    valArr
  }
  return result
}

const initEchart = (dealData) => {
  myChart = echarts.init(echartRef.value)
  let option = {
    title: {
      text: '预测成年身高与遗传身高对比图',
      subtext: props.fourFlag ? '' : '注：期望身高按最新骨龄预测',
      left: 'center',
      textStyle: {
        fontSize: 15
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: props.fourFlag ? dealData.nameData.slice(0, dealData.nameData.length - 1) : dealData.nameData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: dealData.valArr,
        markLine: {
          //平均值的配置
          data: [{ yAxis: props.expectHeight }]
        },
        type: 'bar',
        barWidth: 20, //柱图宽度
        label: {
          show: true, //开启显示
          position: 'top' //柱形上方
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
  height: 320px;
  padding-top: 20px;
}
</style>
