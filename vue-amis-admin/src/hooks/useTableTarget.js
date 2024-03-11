import { computed, inject } from 'vue'

export default function useTableTarget(props) {
  const customerObj = inject('customerObj')

  // 到期望身高还需增长(二)
  const diffHeight = computed(() => {
    let expectHeightNum = Number(props.overInfo.expectHeight)
    let currentHeightNum = Number(props.boneAgeInfo.currentHeight)
    return (expectHeightNum - currentHeightNum).toFixed(1)
  })

  // 至骨龄14岁还需增长（四）
  const diffstillNeedHeight = computed(() => {
    let expectHeightNum = Number(props.overInfo.expectHeight)
    let currentHeightNum = Number(props.boneAgeInfo.currentHeight)
    let boneAgeNum = Number(props.boneAgeInfo.boneAge)
    let val
    if (customerObj.sex === '0') {
      if (boneAgeNum > 6.5) {
        val = 5
      } else {
        val = 23
      }
    }
    if (customerObj.sex === '1') {
      if (boneAgeNum > 4.5) {
        val = 5
      } else {
        val = 20
      }
    }
    return (expectHeightNum - currentHeightNum - val).toFixed(1)
  })

  // 至骨龄14岁剩余骨龄为（五）
  const residueBoneAge = computed(() => {
    let boneAgeNum = Number(props.boneAgeInfo.boneAge)
    let boneAgeVal
    if (customerObj.sex === '0') {
      if (boneAgeNum < 6.5) {
        boneAgeVal = 11.5
      } else {
        boneAgeVal = 14
      }
    }
    if (customerObj.sex === '1') {
      if (boneAgeNum > 4.5) {
        boneAgeVal = 12
      } else {
        boneAgeVal = 9.5
      }
    }
    return (boneAgeVal - boneAgeNum).toFixed(1)
  })

  // 至骨龄14岁平均每岁骨龄需要增长身高（六）
  const yearNeedHeight = computed(() => {
    return (diffstillNeedHeight.value / residueBoneAge.value).toFixed(1)
  })

  const oneYearConsumeTarget1 = computed(() => {
    // return (5 / yearNeedHeight.value).toFixed(1)
    let num = 5 / yearNeedHeight.value
    return Math.floor(num * 10) / 10
  })

  const oneYearConsumeTarget2 = computed(() => {
    // return (6 / yearNeedHeight.value).toFixed(1)
    let num2 = 6 / yearNeedHeight.value
    return Math.floor(num2 * 10) / 10
  })

  return {
    diffHeight,
    diffstillNeedHeight,
    residueBoneAge,
    yearNeedHeight,
    oneYearConsumeTarget1,
    oneYearConsumeTarget2
  }
}
