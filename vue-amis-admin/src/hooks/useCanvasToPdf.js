import { ref, inject, unref } from 'vue'
import { fileUpload } from '@/api/upload'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
import { groupUrl } from '@/utils/config'
import { saveEvaluationReport } from '@/api/heightManageCom/h-overall-evaluation'
import { saveGuidanceReport } from '@/api/heightManageCom/h-plan-manage'
import { ElMessage } from 'element-plus'

export default function useCanvasToPdf(type, idName, fromName) {
  const customerUid = inject('customerUid')
  const setMealBillUid = inject('setMealBillUid')
  const planDesignUid = inject('planDesignUid')

  const pdfUrl = ref('')
  const btnLoading = ref(false)
  const pageHeight = ref(0)

  const A4_WIDTH = 592.28
  const A4_HEIGHT = 841.89

  const handleSavePdf = () => {
    btnLoading.value = true
    let domElement = document.getElementById(idName)

    // 原始页面的宽
    let contentWidth = domElement.getBoundingClientRect().width
    // 一页pdf显示html页面生成的canvas高度
    pageHeight.value = (contentWidth / A4_WIDTH) * A4_HEIGHT //1421

    // 获取分割dom，此处为class类名为item的dom
    let lableListID = document.getElementsByClassName('item')

    for (let i = 0; i < lableListID.length; i++) {
      let multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].offsetHeight) / pageHeight.value)
      if (isSplit(lableListID, i, multiple * pageHeight.value)) {
        let divParent = lableListID[i].parentNode // 获取该div的父节点
        let newNode = document.createElement('div')
        newNode.className = 'emptyDiv'
        newNode.style.background = '#fff'
        let _H = multiple * pageHeight.value - (lableListID[i].offsetTop + lableListID[i].offsetHeight)
        newNode.style.height = _H + 30 + 'px'
        newNode.style.width = '100%'
        let next = lableListID[i].nextSibling // 获取div的下一个兄弟节点
        // 判断兄弟节点是否存在
        console.log(next)
        if (next) {
          // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
          divParent.insertBefore(newNode, next)
        } else {
          // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
          divParent.appendChild(newNode)
        }
      }
    }

    html2canvas(domElement, { useCORS: true }).then((canvas) => {
      let PDF = canvasToConvert(canvas)

      //转成base64
      let pdf64 = PDF.output('datauristring')
      //base64转成blob文件
      let path = convertBase64UrlToBlob(pdf64)

      //上传到服务器
      let formdata = new FormData()
      //第三个参数传一个不一定会用到的文件名，但是得有。注意后缀
      formdata.append('file', path, '报表.pdf')

      fileUpload(formdata)
        .then((res) => {
          let path = res.datas[0].relativePath
          pdfUrl.value = groupUrl + path
          btnLoading.value = false
          saveReport()
          // document.getElementsByClassName("emptyDiv")[0].parentNode.removeChild(document.getElementsByClassName("emptyDiv")[0]);
          window.open(pdfUrl.value)
        })
        .finally(() => {
          btnLoading.value = false
        })
    })
  }

  const saveReport = () => {
    let reportApi
    if (fromName == 'plan-report') {
      let data = {
        customerUid,
        planDesignUid: planDesignUid.value,
        reportUrl: pdfUrl.value
      }
      reportApi = saveGuidanceReport(data)
    } else {
      // unref() 如果参数是一个ref则返回它的value，否则返回参数本身
      const reportType = unref(type)
      let data = {
        customerUid,
        setMealBillUid,
        evaluationReportType: reportType,
        reportUrl: pdfUrl.value
      }
      reportApi = saveEvaluationReport(data)
    }
    reportApi.then((res) => {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '保存报告成功！'
      })
    })
  }

  // 判断是否需要添加空白div
  const isSplit = (nodes, index, pageHeight) => {
    // 计算当前这块dom是否跨越了a4大小，以此分割
    if (
      nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight &&
      nodes[index + 1] &&
      nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight
    ) {
      return true
    }
    return false
  }

  // canvas转换
  const canvasToConvert = (canvas) => {
    let canvasWidth = canvas.width
    let canvasHeight = canvas.height

    //未生成pdf的html页面高度
    let leftHeight = canvasHeight
    //页面偏移
    let position = 0
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    let imgWidth = 595.28
    // 根据a4比例计算出需要分割的实际dom位置 const height = (width / canvasWidth) * canvasHeight
    let imgHeight = (A4_WIDTH / canvasWidth) * canvasHeight

    let pageData = canvas.toDataURL('image/jpeg', 1.0)

    let doc = new jsPdf('', 'pt', 'a4')

    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight.value) {
      doc.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        doc.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight.value
        position -= 841.89
        //避免添加空白页
        if (leftHeight > 0) {
          doc.addPage()
        }
      }
    }
    return doc
  }

  // base64转blob
  const convertBase64UrlToBlob = (urlData) => {
    var arr = urlData.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  return {
    btnLoading,
    handleSavePdf
  }
}
