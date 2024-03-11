import { ref } from 'vue'
import { heightEffectListExport,customerStatusListExport } from '@/api/heightManageCom/list'

export default function useExport(searchForm,fileName) {
  const exportLoading = ref(false)
  let exportApi;
  if(fileName==='身高效果列表') {
    exportApi = heightEffectListExport
  } else {
    exportApi = customerStatusListExport
  }
  const exportList = () => {
    exportLoading.value = true
    exportApi(searchForm).then(res => {
      let blob = new Blob([res])
      let downloadFilename = fileName + ".xlsx";//设置导出的文件名
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //兼容ie浏览器
        window.navigator.msSaveOrOpenBlob(blob, downloadFilename)
      } else {
        let url = window.URL.createObjectURL(blob);
        let downloadElement = document.createElement("a");
        downloadElement.style.display = "none";
        downloadElement.href = url;
        downloadElement.download = downloadFilename;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(url);
      }
      exportLoading.value = false
    }).finally(() => {
      exportLoading.value = false
    })
  }

  return {
    exportLoading,
    exportList
  }
}