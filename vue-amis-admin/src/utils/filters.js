export function filtersDepart(arr, departOptions) {
  if (departOptions.length < 1) return
  let arr1 = []
  if (arr && arr.length) {
    arr.forEach((item) => {
      departOptions.forEach((ele) => {
        if (item == ele.uid) {
          arr1.push(ele.departmentName)
        }
      })
    })
  }
  return arr1.join('、')
}

export function sexFilter(val) {
  let statusName = ''
  switch (val) {
    case '0': {
      statusName = '男'
      break
    }
    case '1': {
      statusName = '女'
      break
    }
    default:
      statusName = '--'
  }
  return statusName
}

export function idTypeFilter(val) {
  let statusName = ''
  switch (val) {
    case 0: {
      statusName = '身份证'
      break
    }
    case 1: {
      statusName = '护照'
      break
    }
    default:
      statusName = '--'
  }
  return statusName
}

// 生活方式列表过滤函数
export function liftWayTypesFilter(arr, val) {
  if (!val) return
  if (arr.length === 0) return
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === val) {
      return arr[i].label
    }
  }
}

// 根据bmi百分位看身材
export function statureFilter(bmiPer, heightPer, weightPer) {
  if (!bmiPer) return
  let onlyNum = Number(bmiPer.match(/\d+(.\d+)?/g)[0]) // 提取字符串中的数字
  let hOnlyNum = Number(heightPer.match(/\d+(.\d+)?/g)[0])
  let wOnlyNum = Number(weightPer.match(/\d+(.\d+)?/g)[0])

  let statusName = ''
  if (onlyNum < 85) {
    // 身高百分比对应值 - 体重百分比对应值
    var t = 0
    t =
      hOnlyNum < 3
        ? 1
        : 3 == hOnlyNum
        ? 2
        : hOnlyNum < 10
        ? 3
        : 10 == hOnlyNum
        ? 4
        : hOnlyNum < 25
        ? 5
        : 25 == hOnlyNum
        ? 6
        : hOnlyNum < 50
        ? 7
        : 50 == hOnlyNum
        ? 8
        : hOnlyNum < 75
        ? 9
        : 75 == hOnlyNum
        ? 10
        : hOnlyNum < 90
        ? 11
        : 90 == hOnlyNum
        ? 12
        : hOnlyNum < 97
        ? 13
        : 97 == hOnlyNum
        ? 14
        : 15
    var e = 0
    e =
      wOnlyNum < 3
        ? 1
        : 3 == wOnlyNum
        ? 2
        : wOnlyNum < 10
        ? 3
        : 10 == wOnlyNum
        ? 4
        : wOnlyNum < 25
        ? 5
        : 25 == wOnlyNum
        ? 6
        : wOnlyNum < 50
        ? 7
        : 50 == wOnlyNum
        ? 8
        : wOnlyNum < 75
        ? 9
        : 75 == wOnlyNum
        ? 10
        : wOnlyNum < 90
        ? 11
        : 90 == wOnlyNum
        ? 12
        : wOnlyNum < 97
        ? 13
        : 97 == wOnlyNum
        ? 14
        : 15
    statusName = t - e >= 2 ? '苗条型' : t - e < -2 ? '粗壮型' : '匀称型'
  } else if (onlyNum >= 85 && onlyNum < 90) {
    statusName = '超重'
  } else if (onlyNum >= 90) {
    statusName = '肥胖'
  } else {
    statusName = '--'
  }
  return statusName
}

// 骨龄评价--身高管理专用
export function boneAgeFilter(boneAge, lifeAge) {
  if (!boneAge || !lifeAge) return
  let numBonAge = Number(boneAge)
  let numLifeAge = Number(lifeAge)

  let result = (numBonAge - numLifeAge).toFixed(1)
  let resMabs = Math.abs(numBonAge - numLifeAge).toFixed(1)

  let statusName = ''
  if (result == 0) {
    statusName = '骨龄和年龄同步生长，根据骨龄的身高进行评价'
  } else if (result >= -1.3 && result <= 1.3) {
    statusName = `骨龄和年龄相差1.3岁以内，正常生长，需根据骨龄的身高进行评价并持续进行身高监测`
  } else if (result > 1.3 && result <= 2) {
    statusName = `骨龄>生活年龄${resMabs}岁，有可能是早发育，身高生长潜能较小，需根据其他检查结果进行评价`
  } else if (result > 2) {
    statusName = `骨龄>生活年龄${resMabs}岁，预示着儿童未来成年身高水平或许会低于目前身高水平，应立即排除早发育的可能`
  } else if (result >= -2 && result < -1.3) {
    statusName = `骨龄<生活年龄${resMabs}岁，身高生长有一定潜能，需根据骨龄的身高进行评价，但影响身高因素较多，需持续的进行身高监测评价`
  } else if (result < -2) {
    statusName = `骨龄<生活年龄${resMabs}岁，应排除生长激素缺乏或甲状腺激素缺乏等疾病`
  } else {
    statusName = '--'
  }
  return statusName
}

// 骨龄评价----总体测评专用
export function overallBoneAgeFilter(boneAge, lifeAge, sex, current) {
  if (!boneAge || !lifeAge) return
  let numBonAge = Number(boneAge)
  let numLifeAge = Number(lifeAge)
  if (sex == 0 && numBonAge >= 16) {
    return `当前骨龄${boneAge}岁，骨骺已闭合。`
  }
  if (sex == 1 && numBonAge >= 14) {
    return `当前骨龄${boneAge}岁，骨骺已闭合。`
  }
  let result = (numBonAge - numLifeAge).toFixed(1)
  let resMabs = Math.abs(numBonAge - numLifeAge).toFixed(1)

  let statusName = ''
  let currentTips = ''

  if (result == 0) {
    currentTips = '骨龄等于生活年龄'
    statusName = '骨龄等于生活年龄，正常生长，需根据骨龄的身高进行评价并持续进行身高监测'
  } else if (result <= -2) {
    currentTips = `骨龄<生活年龄${resMabs}岁`
    let specialTit = ''
    if (sex == 0) {
      specialTit =
        numLifeAge >= 12 ? `年龄>=12，存在青春期延迟的风险` : `存在生长迟缓或矮小的风险，请尽快就诊，完善内分泌相关检查`
    }
    if (sex == 1) {
      specialTit =
        numLifeAge >= 10 ? `年龄>=10，存在青春期延迟的风险` : `存在生长迟缓或矮小的风险，请尽快就诊，完善内分泌相关检查`
    }
    statusName = `骨龄<生活年龄${resMabs}岁，${specialTit}`
  } else if (result > -2 && result < -1.3) {
    currentTips = `骨龄<生活年龄${resMabs}岁`
    statusName = `骨龄<生活年龄${resMabs}岁，存在骨龄发育异常的可疑风险`
  } else if (result >= -1.3 && result <= -1) {
    currentTips = `骨龄<生活年龄${resMabs}岁`
    statusName = `骨龄<生活年龄${resMabs}岁，为骨龄晚发育`
  } else if (result > -1 && result < 1) {
    currentTips = `骨龄${result > 0 ? '>' : '<'}生活年龄${resMabs}岁`
    statusName = `骨龄${
      result > 0 ? '>' : '<'
    }生活年龄${resMabs}岁，正常生长，需根据骨龄的身高进行评价并持续进行身高监测`
  } else if (result >= 1 && result < 1.3) {
    currentTips = `骨龄>生活年龄${resMabs}岁`
    statusName = `骨龄>生活年龄${resMabs}岁，为骨龄早发育,降低身高生长效能，并降低骨龄身高水平`
  } else if (result >= 1.3 && result < 2) {
    currentTips = `骨龄>生活年龄${resMabs}岁`
    statusName = `骨龄>生活年龄${resMabs}岁，存在骨龄发育异常的可疑风险`
  } else if (result >= 2) {
    currentTips = `骨龄>生活年龄${resMabs}岁`
    let bigTwoTitle = ''
    if (sex == 0) {
      bigTwoTitle = numLifeAge <= 9 ? '年龄<=9岁，存在性早熟的风险' : '年龄>9岁，存在身高生长潜能降低的风险'
    }
    if (sex == 1) {
      bigTwoTitle = numLifeAge <= 8 ? '年龄<=8岁，存在性早熟的风险' : '年龄>8岁，存在身高生长潜能降低的风险'
    }
    statusName = `骨龄>生活年龄${resMabs}岁，${bigTwoTitle}`
  } else {
    currentTips = '--'
    statusName = '--'
  }
  if (current) {
    return currentTips
  } else {
    return statusName
  }
}

// 身高风险
// 男：预计成年身高<160;女：预计成年身高<150
export function heightRiskFilter(fHeight, sex) {
  if (!fHeight) return
  let onlyNum = Number(fHeight)

  let statusName
  if (onlyNum < 160 && sex === '0') {
    statusName = '成年身高低于160cm的风险较大'
  } else if (onlyNum < 150 && sex === '1') {
    statusName = '成年身高低于150cm的风险较大'
  } else {
    statusName = ''
  }
  return statusName
}

// 性早熟情况
export function sexualFilter(lifeAge, sex) {
  if (!lifeAge) return
  let numLifeAge = Number(lifeAge)

  let statusName
  if ((sex == '0' && numLifeAge <= 9) || (sex == '1' && numLifeAge <= 8)) {
    statusName = '存在性早熟的风险'
  }
  return statusName
}

// 骨龄和期望身高比较
// 遗传身高和期望身高相比
export function heightShortFilter(forecastHeight, expectHeight) {
  if (!forecastHeight || !expectHeight) return
  let statusName
  let diff = forecastHeight - expectHeight
  let countNum = Math.abs(forecastHeight - expectHeight).toFixed(1)
  if (diff > 0) {
    statusName = '偏高' + countNum + 'cm'
  } else if (diff < 0) {
    statusName = '偏矮' + countNum + 'cm'
  } else {
    statusName = '相同'
  }
  return statusName
}

export function filterSameArr(arr1, arr2) {
  const arr = [...arr1, ...arr2]
  const newArr = arr.filter((t) => {
    return !(arr1.includes(t) && arr2.includes(t))
  })
  return newArr
}

// 实现期望身高的难易程度 (期望身高-骨龄对应的成年身高)
export function expectHeightDiff(expectHeight, forecastHeight) {
  if (!forecastHeight || !expectHeight) return
  let statusName
  let diff = expectHeight - forecastHeight
  if (diff < 2) {
    statusName = '较容易'
  } else if (diff >= 2 && diff < 5) {
    statusName = '较难'
  } else if (diff >= 5 && diff < 10) {
    statusName = '很难'
  } else if (diff >= 10) {
    statusName = '极难'
  } else {
    statusName = ''
  }
  return statusName
}

// 当前情况评价(身高百分比)
export function heightPercentFilter(val) {
  if (!val) return
  let onlyNum = Number(val.match(/\d+(.\d+)?/g)[0]) // 提取字符串中的数字

  let statusName = ''
  if (onlyNum < 3) {
    statusName = '当前身高或处于疾病高风险水平'
  } else if (onlyNum >= 3 && onlyNum < 50) {
    statusName = '当前身高处于正常范围内中下水平'
  } else if (onlyNum >= 50 && onlyNum < 75) {
    statusName = '当前身高处于正常范围内正常水平'
  } else if (onlyNum >= 75 && onlyNum < 97) {
    statusName = '当前身高处于正常范围内中上水平'
  } else if (onlyNum >= 97) {
    statusName = '当前身高处于正常范围内上等水平'
  } else {
    statusName = '--'
  }
  return statusName
}

// 当前情况的总结 （根据目前身高百分比，遗传身高百分比）
export function figureFilter(cHeightPer, eHeightPer) {
  if (!cHeightPer || !eHeightPer) return

  let cOnlyNum = Number(cHeightPer.match(/\d+(.\d+)?/g)[0]) // 提取字符串中的数字
  let eOnlyNum = Number(eHeightPer.match(/\d+(.\d+)?/g)[0])

  let statusName = ''
  if (cOnlyNum == eOnlyNum) {
    statusName = '环境因素对儿童身高没有起作用'
  } else if (cOnlyNum > eOnlyNum) {
    statusName = '环境因素对儿童身高起了促进作用'
  } else if (cOnlyNum < eOnlyNum) {
    statusName = '环境因素对儿童身高起了阻碍作用'
  } else {
    statusName = '--'
  }
  return statusName
}

// 遗传潜能(遗传身高-期望身高)  (身高百分比，遗传身高百分比)
export function geneticPotentialFilter(geneticsHeight, expectHeight, heightPercentile, geneticsHeightPercent) {
  if (!geneticsHeight || !expectHeight || !heightPercentile || !geneticsHeightPercent) return

  let diff = geneticsHeight - expectHeight
  let countNum = Math.abs(diff).toFixed(1)

  let hPercentNum = Number(heightPercentile.match(/\d+(.\d+)?/g)[0]) // 提取字符串中的数字
  let gPercentNum = Number(geneticsHeightPercent.match(/\d+(.\d+)?/g)[0])

  let heightImpact =
    hPercentNum > gPercentNum
      ? '有促进作用'
      : hPercentNum == gPercentNum
      ? '没有明显影响'
      : hPercentNum < gPercentNum - 20
      ? '存在影响身高疾病的风险'
      : '有阻碍作用'

  let statusName = ''
  if (diff > 0) {
    statusName = `遗传：遗传身高和期望身高相比：偏高${countNum}cm。遗传潜能不错，目前成长环境对儿童身高生长${heightImpact}`
  } else if (diff < 0) {
    statusName = `遗传：遗传身高和期望身高相比：偏矮${countNum}cm。遗传潜能较差，目前成长环境对儿童身高生长${heightImpact}`
  } else {
    statusName = `遗传：遗传身高和期望身高相比：相同。遗传潜能一般，目前成长环境对儿童身高生长${heightImpact}`
  }
  return statusName
}

// 达到期望身高所需要的阶段性目标----还需增长
// 期望身高-当前身高- 青春期平均生长潜能
export function needGrowthFilter(num1, num2, num3) {
  if (!num1 || !num2 || !num3) return

  let diff = (num1 - num2 - num3).toFixed(1)
  return diff
}

// 剩余骨龄为
// 进入青春期骨龄 - 当前骨龄
export function residueBonAgeFilter(num1, num2) {
  if (!num1 || !num2) return

  let diff = (num1 - num2).toFixed(1)
  return diff
}

// 报告类型
export function reportTypeFilter(val) {
  let statusName = ''
  switch (val) {
    case 'PERSONAL': {
      statusName = '个性化身高评估信息'
      break
    }
    case 'YEAR': {
      statusName = '年度效果评估报告'
      break
    }
    case 'QUARTER': {
      statusName = '季度效果评估报告'
      break
    }
    default:
      statusName = '--'
  }
  return statusName
}

// 两个数差值
export function twoNumDiff(num1, num2) {
  if (!num1 || !num2) return

  let valNum1 = Number(num1)
  let valNum2 = Number(num2)

  let diff = (valNum1 - valNum2).toFixed(1)
  return diff
}

export function energyTotal(age,sex) {
  let recordAge = Math.floor(age);
  let kcal=[],kcald=0

  if(sex =='1'){
    kcal=[90,80,800,1000,1200,1250,1300,1450,1550,1700,1800,1900,2050,2300,2100]
  } else{
    kcal=[90,80,900,1100,1250,1300,1400,1600,1700,1850,2000,2050,2350,2850,2600]
  }

  if(recordAge<0.5){
    kcald=kcal[0]
  }else if(recordAge>=14){
    kcald=kcal[14]
  }else{
    kcald=kcal[recordAge+1]
  }
  return kcald
}
