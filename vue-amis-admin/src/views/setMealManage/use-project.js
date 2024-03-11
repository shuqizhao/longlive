import { ref, onMounted } from 'vue'
import { validProjectList } from '@/api/projectManage'

export default function useProject() {
  const autoRef = ref(null)
  const resProjectList = ref([])
  const querySearch2 = (queryString, cb) => {
    const dataList = resProjectList.value
    const results = queryString ? dataList.filter(createFilter(queryString)) : dataList
    // call callback function to return suggestions
    cb(results)
  }
  const createFilter = (queryString) => {
    return (restaurant) => {
      return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }

  const loadAll = () => {
    validProjectList().then((res) => {
      resProjectList.value = res.datas
    })
  }

  onMounted(() => {
    loadAll()
  })

  return {
    autoRef,
    resProjectList,
    querySearch2
  }
}
