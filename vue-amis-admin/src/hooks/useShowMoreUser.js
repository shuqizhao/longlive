import { ref } from 'vue'
import { customerDetail } from '@/api/userManage'

export default function useShowMoreUser() {
  const showLoading = ref(false)
  const showMsg = ref('')

  const _showInfo = (value) => {
    showLoading.value = true
    customerDetail(value.customerUid).then((res) => {
      let data = res.datas
      showLoading.value = false
      showMsg.value = `姓名:${data.name}, 性别:${data.sex == 0 ? '男' : '女'}, 出生日期:${data.birthdayStr}, 
                      证件号:${data.idNumber ? data.idNumber : '无'}, 
                      电话:${data.phone ? data.phone : '无'}`
    })
  }

  const closeInfo = () => {
    showMsg.value = ''
  }

  return {
    showLoading,
    showMsg,
    _showInfo,
    closeInfo
  }
}
