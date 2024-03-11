import { computed, inject } from 'vue'

export default function useTableTargetShow(userData) {
  const customerObj = inject('customerObj')
  // 达到期望身高所需要的阶段性目标---显示隐藏
  // 男 骨龄<14岁 或 女 骨龄<12
  const targetShow = computed(() => {
    const { boneAge } = userData.boneAgeInfo
    return (
      boneAge && ((customerObj.sex === '0' && Number(boneAge) < 14)||(customerObj.sex === '1' && Number(boneAge) < 12))
    )
  })

  // 男--骨龄>=11.5，女--骨龄>=9.5,只显示方法二，隐藏方法一
  const showWayOne = computed(() => {
    const { boneAge } = userData.boneAgeInfo
    return (
      boneAge && ((customerObj.sex === '0' && Number(boneAge) < 11.5)||(customerObj.sex === '1' && Number(boneAge) < 9.5))
    )
  })

  const showNoDesign = computed(() => {
    const { boneAge } = userData.boneAgeInfo
    return (
      boneAge && ((customerObj.sex === '0' && Number(boneAge) >= 14)||(customerObj.sex === '1' && Number(boneAge) >= 12))
    )
  })

  return {
    targetShow,
    showWayOne,
    showNoDesign
  }
}
