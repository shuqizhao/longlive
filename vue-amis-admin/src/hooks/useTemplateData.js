import { ref, onMounted } from 'vue'
import { guidanceTemplateByType } from '@/api/heightManageCom/h-plan-manage'

export default function useTemplateData(type) {
  const templateList = ref([])

  const _guidanceTemplateByType = () => {
    guidanceTemplateByType(type).then((res) => {
      templateList.value = res.datas
    })
  }

  onMounted(() => {
    _guidanceTemplateByType()
  })

  return {
    templateList
  }
}
