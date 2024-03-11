import { ref, reactive, inject } from 'vue'
import { growthDevelopmentStatistics } from '@/api/heightManageCom/h-overall-evaluation'

export default function useGrowthData(customerUid, setMealBillUid) {
  const customerObj = inject('customerObj')

  const statisticsData = reactive({
    boneAgesIncreased: [], // 骨龄增长
    heightGrowths: [], // 身高增长
    sexualData: [], // 性发育情况
    recentDevelopment: {}, // 近期发育情况
    recentOneYearDevelopment: {} // 近一年发育情况
  })

  //生长发育数据统计
  const _growthDevelopmentStatistics = () => {
    statisticsData.recentDevelopment = {} // 切换的时候重置
    statisticsData.recentOneYearDevelopment = {}
    growthDevelopmentStatistics(customerUid, setMealBillUid.value).then((res) => {
      let resData = res.datas
      statisticsData.boneAgesIncreased = resData.boneAgesIncreased
      statisticsData.heightGrowths = resData.heightGrowths

      let develop = resData.recentOneYearDevelopment
      if (develop.length) {
        if (develop.length == 1) {
          statisticsData.recentDevelopment = develop[0]
          statisticsData.recentOneYearDevelopment = {}
        }
        if (develop.length == 2) {
          statisticsData.recentDevelopment = develop[0]
          statisticsData.recentOneYearDevelopment = develop[1]
        }
      }

      if (customerObj.sex === '0') {
        statisticsData.sexualData = resData.historyHeightSexualMale
      }
      if (customerObj.sex === '1') {
        statisticsData.sexualData = resData.historyHeightSexualFemale
      }
    })
  }

  return {
    statisticsData,
    _growthDevelopmentStatistics
  }
}
