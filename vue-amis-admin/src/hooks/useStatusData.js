import { ref, reactive, onMounted } from 'vue'
import { getAllSetMealBillStatus } from '@/api/heightManageCom/h-home'

export default function useStatusData() {
  const allStatusData = ref(null)
  const pages = reactive({
    pageNum: 1,
    pageSize: 100
  })

  const _getAllSetMealBillStatus = () => {
    getAllSetMealBillStatus(pages).then((res) => {
      allStatusData.value = res.datas
    })
  }

  onMounted(() => {
    _getAllSetMealBillStatus()
  })

  return {
    allStatusData
  }
}
