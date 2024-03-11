import { ref, onMounted, watch } from 'vue'
import { validSetMealList } from '@/api/setMealManage'

export default function useOpenSetMeal(dialogForm) {
  const resSetMealData = ref([])
  const nameVisible = ref(false)

  watch(
    () => dialogForm.setMealName,
    (newVal, oldVal) => {
      if (newVal === oldVal) return
      querySearch(newVal)
    }
  )

  const querySearch = (queryString) => {
    nameVisible.value = true
    validSetMealList(queryString).then((res) => {
      resSetMealData.value = res.datas
    })
  }
  const createFilter = (queryString) => {
    // restaurant是item
    return (restaurant) => {
      return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }

  const loadAll = () => {
    validSetMealList().then((res) => {
      resSetMealData.value = res.datas
    })
  }

  const queryClear = () => {
    loadAll()
    nextTick(() => {
      inputRef.value.focus()
    })
  }

  onMounted(() => {
    loadAll()
  })

  return {
    resSetMealData,
    querySearch,
    loadAll,
    queryClear,
    nameVisible
  }
}
