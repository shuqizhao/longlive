import { watch, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default function useCountSex(long, width, height, sex) {
  // 计算左睾丸大小
  watch(
    () => maleSexulForm.leftTestisLong,
    (newVal, oldVal) => {
      let { leftTestisLong, leftTestisWidth, leftTestisHigh } = maleSexulForm
      if (!leftTestisLong || !leftTestisWidth || !leftTestisHigh) {
        return
      }
      maleSexulForm.leftTestisVolume = countVolume(leftTestisLong, leftTestisWidth, leftTestisHigh, customerObj.sex)
    },
    { deep: true }
  )

  watch(
    () => maleSexulForm.leftTestisWidth,
    (newVal, oldVal) => {
      let { leftTestisLong, leftTestisWidth, leftTestisHigh } = maleSexulForm
      if (!leftTestisLong || !leftTestisWidth || !leftTestisHigh) {
        return
      }
      maleSexulForm.leftTestisVolume = countVolume(leftTestisLong, leftTestisWidth, leftTestisHigh, customerObj.sex)
    },
    { deep: true }
  )

  watch(
    () => maleSexulForm.leftTestisHigh,
    (newVal, oldVal) => {
      let { leftTestisLong, leftTestisWidth, leftTestisHigh } = maleSexulForm
      if (!leftTestisLong || !leftTestisWidth || !leftTestisHigh) {
        return
      }
      maleSexulForm.leftTestisVolume = countVolume(leftTestisLong, leftTestisWidth, leftTestisHigh, customerObj.sex)
    },
    { deep: true }
  )

  // 计算右睾丸大小
  watch(
    () => maleSexulForm.rightTestisLong,
    (newVal, oldVal) => {
      let { rightTestisLong, rightTestisWidth, rightTestisHigh } = maleSexulForm
      if (!rightTestisLong || !rightTestisWidth || !rightTestisHigh) {
        return
      }
      maleSexulForm.rightTestisVolume = countVolume(rightTestisLong, rightTestisWidth, rightTestisHigh, customerObj.sex)
    },
    { deep: true }
  )

  watch(
    () => maleSexulForm.rightTestisWidth,
    (newVal, oldVal) => {
      let { rightTestisLong, rightTestisWidth, rightTestisHigh } = maleSexulForm
      if (!rightTestisLong || !rightTestisWidth || !rightTestisHigh) {
        return
      }
      maleSexulForm.rightTestisVolume = countVolume(rightTestisLong, rightTestisWidth, rightTestisHigh, customerObj.sex)
    },
    { deep: true }
  )

  watch(
    () => maleSexulForm.rightTestisHigh,
    (newVal, oldVal) => {
      let { rightTestisLong, rightTestisWidth, rightTestisHigh } = maleSexulForm
      if (!rightTestisLong || !rightTestisWidth || !rightTestisHigh) {
        return
      }
      maleSexulForm.rightTestisVolume = countVolume(rightTestisLong, rightTestisWidth, rightTestisHigh, customerObj.sex)
    },
    { deep: true }
  )

  return {
    hospitalOptions
  }
}
