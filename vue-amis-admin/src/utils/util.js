export const getQueryStringByName = function (name) {
  var result = location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

export const isEmptyObject = function (obj) {
  for (var key in obj) {
    //返回false，不为空对象
    return false
  }
  return true //返回true，为空对象
}

export const transformData = function (data) {
  const params = new FormData()
  for (const item in data) {
    params.append(item, data[item])
  }
  return params
}

export const DateFormat = function (date, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  if (date === null || typeof date === 'undefined' || date === '') {
    return null
  } else {
    // 时间要转成obj，否则报错
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

export const checkSameData = function (list) {
  let data = {}
  for (var i = 0; i < list.length; i++) {
    if (!data[list[i].executeDate]) {
      var arr = []
      arr.push(list[i])
      data[list[i].executeDate] = arr
    } else {
      data[list[i].executeDate].push(list[i])
    }
  }
  return data
}

export function toDay() {
  let _y = new Date().getUTCFullYear()
  let _m = parseInt(new Date().getMonth() + 1)
  let _d = new Date().getDate()
  if (_m < 10) _m = '0' + _m
  if (_d < 10) _d = '0' + _d
  return _y + '-' + _m + '-' + _d
}

// 比较日期大小
export function compareDate(date1, date2) {
  var oDate1 = new Date(date1)
  var oDate2 = new Date(date2)
  // 如果日期比当前日期小，就置灰
  if (oDate1.getTime() < oDate2.getTime()) {
    return true
  } else {
    return false
  }
}

export function durationTypesFn() {
  let list = []
  for (let i = 1; i < 13; i++) {
    list.push({
      label: i + '个月',
      value: i
    })
  }
  return list
}

export function countHeight(fHeight, mHeight, status, sex) {
  let value = 0
  if (!fHeight || !mHeight) return
  let fh = Number(fHeight)
  let mh = Number(mHeight)

  if (sex == '0') {
    if (status === 0) {
      value = (fh + mh + 12) / 2
    } else {
      value = (fh + mh + 13) / 2
    }
  }
  if (sex == '1') {
    if (status === 0) {
      value = (fh + mh - 12) / 2
    } else {
      value = (fh + mh - 13) / 2
    }
  }
  return value
}

// 计算容积
export function countVolume(long, width, height, sex) {
  let volumeVal = 0
  if (sex === '0') {
    volumeVal = (long * width * height * 0.71).toFixed(2)
  }
  if (sex === '1') {
    volumeVal = (long * width * height * 0.523).toFixed(2)
  }
  return volumeVal
}

// 计算时长
export function countDuration(startTime, endTime) {
  let diffTime
  if (!(startTime && endTime)) return
  let start1 = startTime.split(':')
  let startAll = parseInt(start1[0] * 60) + parseInt(start1[1])
  let end1 = endTime.split(':')
  let endAll = parseInt(end1[0] * 60) + parseInt(end1[1])
  if (startTime < endTime) {
    diffTime = (endAll - startAll) / 60
  } else if (startTime >= endTime) {
    diffTime = (endAll - startAll + 24 * 60) / 60 //如果开始时间小于等于结束时间加一天
  }
  return Math.round(diffTime)
}

// 防抖函数
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// canvas转换
export const canvasToConvert = (canvas, jsPdf) => {
  let contentWidth = canvas.width
  let contentHeight = canvas.height

  //一页pdf显示html页面生成的canvas高度;
  let pageHeight = (contentWidth / 592.28) * 841.89
  //未生成pdf的html页面高度
  let leftHeight = contentHeight
  //页面偏移
  let position = 0
  //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  let imgWidth = 595.28
  let imgHeight = (592.28 / contentWidth) * contentHeight

  let pageData = canvas.toDataURL('image/jpeg', 1.0)

  let doc = new jsPdf('', 'pt', 'a4')

  //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
  //当内容未超过pdf一页显示的范围，无需分页
  if (leftHeight < pageHeight) {
    doc.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
  } else {
    while (leftHeight > 0) {
      doc.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      leftHeight -= pageHeight
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
export const convertBase64UrlToBlob = (urlData) => {
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

// 计算日期相差天数
export const getDiffDay = (date_1, date_2) => {
  // 计算两个日期之间的差值
  let totalDays, diffDate
  let myDate_1 = Date.parse(date_1)
  let myDate_2 = Date.parse(date_2)
  // 将两个日期都转换为毫秒格式，然后做差
  diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值

  totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整

  return totalDays // 相差的天数
}

//  计算两个数的积
export const getMultiplyData = (num1, num2) => {
  let myNum1 = Number(num1)
  let myNum2 = Number(num2)

  let multiplyData = Math.round(myNum1 * myNum2)

  return multiplyData
}

//  计算两个数的商
export const getDividedData = (num1, num2, num3) => {
  let myNum1 = Number(num1)
  let myNum2 = Number(num2)
  let myNum3 = Number(num3)

  let resData = (Math.round(myNum1 * myNum2) / myNum3).toFixed(1)

  return resData
}
