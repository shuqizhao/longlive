import { ref, reactive, onMounted } from 'vue'
import { setMealList } from '@/api/setMealManage'

export default function useSetMealData() {
  const setMealData = ref([])
  const pages = reactive({
    pageNum: 1,
    pageSize: 100
  })

  const _setMealList = () => {
    setMealList({}, pages).then((res) => {
      setMealData.value = res.datas
    })
  }

  onMounted(() => {
    _setMealList()
  })

  return {
    setMealData
  }
}
