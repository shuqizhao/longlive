<template>
  <div class="modal-body">
    <div class="main-view" id="pdfdom">
      <div class="main-title">个性化身高评估信息</div>
      <table border="1">
        <tr>
          <td>评价时间：{{ customerObj.currentTime }}</td>
          <td>联系方式：{{ customerObj.phone }}</td>
          <td>测量时间：{{ currentInfo.addTime }}</td>
        </tr>
      </table>
      <table border="1" cellpadding="3">
        <tr>
          <td rowspan="2" style="width: 120px">姓名</td>
          <td rowspan="2" style="width: 60px">性别</td>
          <td rowspan="2">年龄(岁)</td>
          <td rowspan="2">骨龄(岁)</td>
          <td colspan="4" style="text-align: center">出生情况</td>
          <td colspan="2" style="text-align: center">父亲</td>
          <td colspan="2" style="text-align: center">母亲</td>
        </tr>
        <tr>
          <td style="width: 130px">年月日</td>
          <td>孕周</td>
          <td>身长(cm)</td>
          <td>体重(kg)</td>
          <td>身高(cm)</td>
          <td>体重(kg)</td>
          <td>身高(cm)</td>
          <td>体重(kg)</td>
        </tr>
        <tr>
          <td>{{ customerObj.customerName }}</td>
          <td>{{ sexFilter(customerObj.sex) }}</td>
          <td>{{ currentInfo.lifeAge }}</td>
          <td>{{ currentInfo.boneAge }}</td>
          <td>{{ overInfo.birthday }}</td>
          <td>{{ overInfo.gestationalAge }}</td>
          <td>{{ overInfo.height }}</td>
          <td>{{ overInfo.weight }}</td>
          <td>{{ overInfo.fatherHeight }}</td>
          <td>{{ overInfo.fatherWeight }}</td>
          <td>{{ overInfo.motherHeight }}</td>
          <td>{{ overInfo.motherWeight }}</td>
        </tr>
      </table>
      <div class="mt-20">
        <div v-if="customerObj.sex === '0'">
          遗传身高计算公式：
          <span v-if="overInfo.geneticFormula === 0">男生遗传身高 = （父亲身高 + 母亲身高 + 12）/ 2</span>
          <span v-if="overInfo.geneticFormula === 1">男生遗传身高 = （父亲身高 + 母亲身高 + 13）/ 2</span>
        </div>
        <div v-if="customerObj.sex === '1'">
          遗传身高计算公式：
          <span v-if="overInfo.geneticFormula === 0">女生遗传身高 = （父亲身高 + 母亲身高 - 12）/ 2</span>
          <span v-if="overInfo.geneticFormula === 1">女生遗传身高 = （父亲身高 + 母亲身高 - 13）/ 2</span>
        </div>
        <table border="1" cellpadding="3">
          <tr style="text-align: center">
            <td>体格指标</td>
            <td>身高cm</td>
            <td>百分位</td>
            <td>初次评估</td>
          </tr>
          <tr>
            <td style="color: rgb(241, 112, 112)">期望身高</td>
            <td style="color: rgb(241, 112, 112)">{{ overInfo.expectHeight }}</td>
            <td style="color: rgb(241, 112, 112)">{{ overInfo.expectHeightPercent }}</td>
            <td style="border-bottom: none">
              1、
              <span v-show="currentInfo.boneAge">
                按骨龄预估成年身高和期望身高 相比：{{
                  heightShortFilter(currentInfo.forecastHeight, overInfo.expectHeight)
                }}
              </span>
              <span v-show="!currentInfo.boneAge">没有骨龄数据，请尽快拍摄骨龄，科学管理儿童身高</span>
            </td>
          </tr>
          <tr>
            <td style="color: rgb(60, 60, 212)">预估成年身高<br />(骨龄对应的成年身高)</td>
            <td style="color: rgb(60, 60, 212)">
              <span v-show="currentInfo.boneAge">{{ currentInfo.forecastHeight }}</span>
            </td>
            <td style="color: rgb(60, 60, 212)">
              <span v-show="currentInfo.boneAge">{{ currentInfo.forecastHeightPer }}</span>
            </td>
            <td style="border-bottom: none; border-top: none">
              2、当前体形：{{
                statureFilter(currentInfo.bmipercent, currentInfo.heightPercent, currentInfo.weightPercent)
              }}
              <br />（体形没有好坏之分，但是对骨龄和身高有影响。）
            </td>
          </tr>
          <tr>
            <td style="color: green">遗传身高</td>
            <td style="color: green">{{ overInfo.geneticsHeight }}</td>
            <td style="color: green">{{ overInfo.geneticsHeightPercent }}</td>
            <td style="border-bottom: none; border-top: none">
              3、<span v-show="currentInfo.boneAge">{{ ageDiff }}</span>
              <span v-show="!currentInfo.boneAge">复核骨龄 随访</span>
            </td>
          </tr>
          <tr>
            <td>当前身高</td>
            <td>{{ currentInfo.currentHeight }}</td>
            <td>{{ currentInfo.heightPercent }}</td>
            <td class="text-left" style="border-bottom: none; border-top: none">
              4、
              成长环境对儿童身高生长的作用：有益&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无益&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;阻碍
            </td>
          </tr>
          <tr>
            <td>当前体重</td>
            <td>{{ currentInfo.currentWeight }}</td>
            <td>{{ currentInfo.weightPercent }}</td>
            <td class="text-left" style="border-bottom: none; border-top: none">
              5、实现期望身高的难度：
              较容易&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;较难&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;很难&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;极难
            </td>
          </tr>
          <tr>
            <td>BMI</td>
            <td>{{ currentInfo.bmi }}</td>
            <td>{{ currentInfo.bmipercent }}</td>
            <td style="border-top: none"></td>
          </tr>
        </table>
      </div>
      <div class="mt-10">0-18岁儿童青少年身高百分位数值表（{{ sexFilter(customerObj.sex) }}）</div>
      <table border="1" cellpadding="3">
        <tr>
          <td></td>
          <td>3rd</td>
          <td>10th</td>
          <td>25th</td>
          <td>50th</td>
          <td>75th</td>
          <td>90th</td>
          <td>97th</td>
        </tr>
        <tr>
          <td>{{ currentInfo.lifeAge }}</td>
          <td v-for="(item, index) in currentAgeOfArr" :key="index">{{ item }}</td>
        </tr>
        <tr>
          <td>18岁</td>
          <td v-for="(item, index) in eighteenAgeOfArr" :key="index">{{ item }}</td>
        </tr>
      </table>
      <div style="display: flex; margin-top: 10px" v-show="boneAgeInfo.boneAge">
        <table border="1" cellpadding="3" style="width: 580px">
          <tr>
            <th colspan="4">拟达到期望身高-生长设计方案</th>
          </tr>
          <tr>
            <td>骨龄身高生长速度</td>
            <td colspan="3">{{ yearNeedHeight }} cm/岁骨龄</td>
          </tr>
          <tr>
            <td>一、假设未来1年身高增长</td>
            <td>5cm</td>
            <td>骨龄消耗</td>
            <td>{{ oneYearConsumeTarget1 }}岁/年</td>
          </tr>
          <tr>
            <td>二、假设未来1年身高增长</td>
            <td>6cm</td>
            <td>骨龄消耗</td>
            <td>{{ oneYearConsumeTarget2 }}岁/年</td>
          </tr>
        </table>
        <img src="/src/assets/img/formula.jpg" style="width: 330px" alt="" />
      </div>
      <div class="mt-20">
        <div class="fw-blod">身高管理的内容:</div>
        <ul class="ul-box">
          <li>1、促进身高生长速度。目标：身高生长速度保持在5~7cm/年的正常范围</li>
          <li>2、延缓骨龄增长速度。目标：1年时间骨龄增长&lt;=1岁</li>
          <li>3、每月测量身高、体重，每3个月做身高体重评估；6-12月监测骨龄，每次评估骨龄</li>
        </ul>
      </div>
      <div class="mt-20">
        <div class="fw-blod">身高小知识讲解:</div>
        <ul class="ul-box">
          <li>1、身高是测量值，需要准确测量，身高一天早晚相差 1-2cm</li>
          <li>
            2、骨龄是决定孩子身高的生物年龄。男孩骨龄16岁、女孩骨龄14岁身高基本停止。男孩骨龄14岁、女孩骨龄12岁平均5cm身高潜能.
          </li>
          <li>3、身高有早长晚长之分，骨龄一年增长 0.3~2岁/年</li>
          <li>4、唯有骨龄身高能真实的评价孩子的身高高矮</li>
          <li>5、身高测评参照标准是我国2005年《0-18岁儿童青少年身高、体重百分位数值表》</li>
        </ul>
      </div>
      <div style="text-align: right; margin: 75px 0 20px">
        <span style="width: 230px; text-align: left; display: inline-block">测量人员：</span>
        <span style="width: 230px; text-align: left; display: inline-block">评估人员：</span>
      </div>
    </div>
    <div class="modal-footer">
      <el-button
        id="print-button"
        class="btn"
        type="primary"
        @click="handleSavePdf"
        v-loading.fullscreen.lock="btnLoading"
        element-loading-text="正在导出，请稍后..."
        >保存报告</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { heightPercentileByAge } from '@/api/heightManageCom/h-overall-evaluation';
import { ref, computed, inject } from 'vue'
import useCanvasToPdf from '@/hooks/useCanvasToPdf'
import useTableTarget from '@/hooks/useTableTarget'
import { statureFilter, heightShortFilter, sexFilter } from '@/utils/filters'

const props = defineProps({
  currentInfo: {
    type: Object
  },
  overInfo: {
    type: Object
  },
  chartPerData: {
    type: Array,
    default: () => []
  },
  heightWeightBmiData: {
    type: Array,
    default: () => []
  },
  boneAgeInfo: {   // useTableTarget使用
    type: Object
  }
})

const customerObj = inject('customerObj')
const currentAgeOfArr = ref([])
const eighteenAgeOfArr = ref([])

const { yearNeedHeight, oneYearConsumeTarget1, oneYearConsumeTarget2 } = useTableTarget(props)

const ageDiff = computed(() => {
  let diff = (props.currentInfo.boneAge - props.currentInfo.lifeAge).toFixed(1)
  if (diff > 0) {
    return `骨龄 > 年龄${Math.abs(diff)}岁`
  } else if (diff < 0) {
    return `骨龄 < 年龄${Math.abs(diff)}岁`
  } else {
    return `骨龄和年龄相同`
  }
})

const formatData = () => {
  let data = {
    age: props.currentInfo.lifeAge,
    gender: sexFilter(customerObj.sex)
  }
  heightPercentileByAge(data).then(res => {
    let resList = res.datas
    let afterObj = {}
    for (var i = 0; i < resList.length; i++) {
      if (!afterObj[resList[i].heightPercentile]) {
        var arr = []
        arr.push(resList[i].height)
        afterObj[resList[i].heightPercentile] = arr
      } else {
        afterObj[resList[i].heightPercentile].push(resList[i].height)
      }
    }
    let wholeData = [
      { name: '3rd', dataArr: afterObj[3] },
      { name: '10th', dataArr: afterObj[10] },
      { name: '25th', dataArr: afterObj[25] },
      { name: '50th', dataArr: afterObj[50] },
      { name: '75th', dataArr: afterObj[75] },
      { name: '90th', dataArr: afterObj[90] },
      { name: '97th', dataArr: afterObj[97] }
    ]
    
    let begArr = []
    let lastArr = []
    wholeData.forEach((item) => {
      if (item.dataArr.length) {
        begArr.push(item.dataArr[0])
        lastArr.push(item.dataArr[1])
      }
    })
    currentAgeOfArr.value = begArr
    eighteenAgeOfArr.value = lastArr
  })
}

// const formatData = () => {
//   if (props.chartPerData.length === 0 || props.heightWeightBmiData.length === 0) {
//     return []
//   }
//   currentAgeOfArr.value = [] // 每次清空

//   let list = props.chartPerData
//   // 过滤出需要的数据
//   let needList = list.filter((item) => props.heightWeightBmiData.some((ele) => ele.age === item.age))
//   console.log('need',needList);
//   if (needList.length === 0) return
//   let afterObj = {}
//   for (var i = 0; i < needList.length; i++) {
//     if (!afterObj[needList[i].heightPercentile]) {
//       var arr = []
//       arr.push(needList[i].height)
//       afterObj[needList[i].heightPercentile] = arr
//     } else {
//       afterObj[needList[i].heightPercentile].push(needList[i].height)
//     }
//   }

//   let wholeData = [
//     { name: '3rd', dataArr: afterObj[3] },
//     { name: '10th', dataArr: afterObj[10] },
//     { name: '25th', dataArr: afterObj[25] },
//     { name: '50th', dataArr: afterObj[50] },
//     { name: '75th', dataArr: afterObj[75] },
//     { name: '90th', dataArr: afterObj[90] },
//     { name: '97th', dataArr: afterObj[97] }
//   ]
//   // 最新测量对应的身高百分位数
//   let begArr = []
//   wholeData.forEach((item) => {
//     if (item.dataArr.length) {
//       begArr.push(item.dataArr.pop())
//     }
//   })
//   currentAgeOfArr.value = begArr
// }

const { btnLoading, handleSavePdf } = useCanvasToPdf('PERSONAL', 'pdfdom')

defineExpose({
  formatData
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-report.scss';
</style>
