export const upAction = import.meta.env.VITE_UPLOAD_API + ''
export const groupUrl = import.meta.env.VITE_UPLOAD_API + ''

export const domain = '/'

export const sexTypes = [
  { label: '男', value: 0 },
  { label: '女', value: 1 }
]

export const idCardTypes = [
  { label: '身份证', value: 0 },
  { label: '护照', value: 1 }
]

// 性发育分期
export const sexDevelopmentStages = [
  { label: 'I期 前期', value: 1 },
  { label: 'II期 早期', value: 2 },
  { label: 'III期 中期', value: 3 },
  { label: 'IV期 后期', value: 4 },
  { label: 'V期 成人期', value: 5 }
]

export const boySameTermTypes = [
  { label: '腋毛', value: 'armpitHair' },
  { label: '生长突增', value: 'growthSpurt' },
  { label: '胡须', value: 'beard' },
  { label: '喉结', value: 'adamApple' },
  { label: '变声', value: 'voiceChanger' },
  { label: '遗精', value: 'nocturnalEmission' },
  { label: '其他', value: 'other' }
]

export const girlSameTermTypes = [
  { label: '腋毛', value: 'armpitHair' },
  { label: '生长突增', value: 'growthSpurt' },
  { label: '初潮', value: 'menarche' },
  { label: '其他', value: 'other' }
]

// export const sameTermTypes = ['腋毛','生长突增','初潮','其他']

export const breastTypes = [
  { value: 1, label: 'Ⅰ期 期前（幼儿型）' },
  { value: 2, label: 'Ⅱ期 早期（牙胞状隆起，乳房增长）' },
  { value: 3, label: 'Ⅲ期 中期（乳房、乳晕增大，半圆形）' },
  { value: 4, label: 'Ⅳ期 后期（乳晕突出乳房面）' },
  { value: 5, label: 'Ⅴ期 成人期（成人型，乳晕、乳房在同一丘面）' }
]

// 男阴毛
export const boyPubicHairTypes = [
  { value: 1, label: 'Ⅰ期 期前（无）' },
  { value: 2, label: 'Ⅱ期 早期（稀疏直毛，限阴茎根部）' },
  { value: 3, label: 'Ⅲ期 中期（耻骨联合上）' },
  { value: 4, label: 'Ⅳ期 后期（卷曲、增多、增粗）' },
  { value: 5, label: 'Ⅴ期 成人期（成人菱形型分布）' }
]

// 女阴毛
export const girlPubicHairTypes = [
  { value: 1, label: 'Ⅰ期 期前（无）' },
  { value: 2, label: 'Ⅱ期 早期（稀少，分布于大阴唇）' },
  { value: 3, label: 'Ⅲ期 中期（卷曲，耻骨联合上可见）' },
  { value: 4, label: 'Ⅳ期 后期（卷曲、增多、增粗）' },
  { value: 5, label: 'Ⅴ期 成人期（成人倒三角形分布）' }
]

// 生活方式记录-----------------------------------------------------
// 是否喝奶
export const drinkMilkTypes = [
  { label: '不喝奶', value: 'NO' },
  { label: '偶尔喝', value: 'OCCASIONALLY' },
  { label: '每天喝', value: 'EVERY_DAY' }
]

// 牛奶种类
export const allMilkTypes = [
  { label: '纯牛奶', value: 'PURE_MILK' },
  { label: '配方奶', value: 'FORMULA_MILK' },
  { label: '水解配方奶', value: 'HYDROLYZED_MILK' },
  { label: '氨基酸配方奶', value: 'AMINO_MILK' },
  { label: '无乳糖配方奶', value: 'LACTOSE_FREE_MILK' },
  { label: '无乳糖纯牛奶(舒化奶)', value: 'LACTOSE_FREE_PURE_MILK' },
  { label: '其他', value: 'OTHER' }
]

// 鸡蛋
export const allEggTypes = [
  { label: '不吃', value: 'NO' },
  { label: '3次/周', value: 'THREE_TIMES_WEEK' },
  { label: '偶尔吃', value: 'OCCASIONALLY' },
  { label: '只吃蛋白', value: 'ONLY_PROTEIN' },
  { label: '只吃蛋黄', value: 'ONLY_YOLK' },
  { label: '吃', value: 'EAT_EGG' }
]

// 白肉类
export const whiteMeatTypes = [
  { label: '鸡', value: 'chicken', chickenQuantity: 0, chickenFrequency: '次/周' },
  { label: '鸭', value: 'duck', duckQuantity: 0, duckFrequency: '次/周' },
  { label: '鱼', value: 'fish', fishQuantity: 0, fishFrequency: '次/周' },
  { label: '虾', value: 'shrimp', shrimpQuantity: 0, shrimpFrequency: '次/周' }
]

// 单位
export const controlTypes = [
  { value: 1, label: '次/周' },
  { value: 2, label: '次/月' },
  { value: 3, label: '次/日' },
  { value: 4, label: 'g/周' },
  { value: 5, label: 'g/日' }
]

// 红肉类
export const redMeatTypes = [
  { label: '猪', value: 'pig' },
  { label: '牛', value: 'cattle' },
  { label: '羊', value: 'sheep' }
]

// 蔬菜类
export const vegetableTypes = [
  { label: '绿色蔬菜', value: 'greenVegetable' },
  { label: '淀粉类', value: 'starch' }
]

// 饮料，果汁
export const allDrinkTypes = [
  { label: '不喝', value: 'NO' },
  { label: '偶尔喝', value: 'OCCASIONALLY' },
  { label: '经常喝', value: 'OFTEN' },
  { label: '每天喝', value: 'EVERY_DAY' }
]

// 执行力
export const executionTypes = [
  { label: '优', value: 'EXCELLENT' },
  { label: '良', value: 'GOOD' },
  { label: '中', value: 'MIDDLE' },
  { label: '差', value: 'POOR' }
]

// 孩子个人史
export const childPersonHistory = [
  { label: '过敏体质', value: 'ALLERGIES' },
  { label: '肠道功能异常', value: 'ANORECTAL' },
  { label: '手术外伤史', value: 'SURGICAL_TRAUMA' },
  { label: '性早熟治疗史', value: 'PRECOCIOUS_PUBERTY' },
  { label: '生长激素治疗史', value: 'GROWTH_HORMONE' },
  { label: '无以上情况或不清楚', value: 'NONE' }
]

// 孩子形体
export const childBodyTypes = [
  { label: '高低肩', value: 'HIGH_LOW_SHOULDERS' },
  { label: '扁平足', value: 'FLATFOOT' },
  { label: 'X或O型腿', value: 'OX_SHAPED' },
  { label: '脊柱侧弯', value: 'SPINAL_CURVATURE' },
  { label: '无以上情况或不清楚', value: 'NONE' }
]

// 身材矮小情况
export const shortStatureTypes = [
  { label: '无', value: 'NONE' },
  { label: '1个', value: 'ONE' },
  { label: '2-3个', value: 'TWO_THREE' },
  { label: '>3个', value: 'GREATER_THREE' }
]

// 疾病情况
export const diseaseTypes = [
  { label: '高血压', value: 'HYPERTENSION' },
  { label: '高血脂', value: 'HYPERLIPIDEMIA' },
  { label: '糖尿病', value: 'diabetes' },
  { label: '痛风', value: 'VENTILATION' },
  { label: '肿瘤史', value: 'TUMOR' },
  { label: '甲状腺疾病', value: 'thyroid' },
  { label: '无以上情况或不清楚', value: 'NONE' }
]

// 总体评估
export const overallTypes = [
  { label: '优秀', value: 'EXCELLENT' },
  { label: '良好', value: 'GOOD' },
  { label: '尚可', value: 'PASSABLE' },
  { label: '欠佳', value: 'POOR' },
  { label: '较差', value: 'RELATIVELY_POOR' }
]

//运动
export const overall_sportTypes = [
  { label: '没有固定运动', value: 'NO_FIXED' },
  { label: '运动时长和强度不足', value: 'INSUFFICIENT_DURATION' },
  { label: '尚可', value: 'PASSABLE' },
  { label: '优秀', value: 'EXCELLENT' }
]

// 睡眠
export const overall_sleepTypes = [
  { label: '节律良好', value: 'GOOD_RHYTHM' },
  { label: '入睡太晚，未优化', value: 'SLEEP_LATE_NOT_OPTIMIZED' },
  { label: '起床太晚', value: 'GET_UP_LATE' },
  { label: '睡眠启动时间>=30分钟', value: 'MORE_THAN_30' },
  { label: '睡眠中断', value: 'INTERRUPTED_SLEEP' }
]

// 体重
export const overall_weightTypes = [
  { label: '严格控制体重', value: 'STRICT_CONTROL' },
  { label: '体重控制不佳', value: 'POOR_CONTROL' },
  { label: '体重增长超标', value: 'EXCEED' },
  { label: '体重控制良好', value: 'GOOD_CONTROL' }
]

// 运动类型
export const sportsTypes = [
  { label: '游泳', value: 'swim' },
  { label: '跳绳', value: 'skip' },
  { label: '篮球', value: 'basketball' },
  { label: '其他', value: 'other' }
]

// 运动频次量
export const sportsFrequencyTypes = [
  { label: '次/周', value: '1' },
  { label: '次/天', value: '2' },
  { label: '个/周', value: '3' },
  { label: '个/天', value: '4' },
  { label: '分钟/天', value: '5' },
  { label: '分钟/周', value: '6' }
]

// 营养素
export const nutrientsTypes = [
  { label: '无', value: 'NO' },
  { label: '自行补充', value: 'SUPPLY_YOURSELF' },
  { label: '按医生制定的方案补充', value: 'DOCTOR_FORMULATED' }
]

// 营养素单位
export const nutrientsFrequencyTypes = [
  { label: 'ml', value: '1' },
  { label: '粒', value: '2' },
  { label: '滴', value: '3' },
  { label: 'g', value: '4' },
  { label: 'mg', value: '5' },
  { label: '片', value: '6' },
  { label: 'IU', value: '7' },
  { label: '包', value: '8' },
  { label: '袋', value: '9' }
]

// ----------方案设计管理----------------
export const plan_allMilkTypes = [
  { label: '牛奶', value: 'milk', Numkey: 'milkQuantity', typeKey: 'milkFrequency', isCheck: false },
  {
    label: '配方奶',
    value: 'formula_milk',
    Numkey: 'formulaMilkQuantity',
    typeKey: 'formulaMilkFrequency',
    isCheck: false
  },
  { label: '奶酪', value: 'cheese', Numkey: 'cheeseQuantity', typeKey: 'cheeseFrequency', isCheck: false },
  {
    label: '水解配方奶',
    value: 'hydrolyzed',
    Numkey: 'hydrolyzedQuantity',
    typeKey: 'hydrolyzedFrequency',
    isCheck: false
  },
  {
    label: '无乳糖配方奶',
    value: 'lactose_free',
    Numkey: 'lactoseFreeQuantity',
    typeKey: 'lactoseFreeFrequency',
    isCheck: false
  },
  { label: '舒化奶', value: 'shuhua', Numkey: 'shuhuaQuantity', typeKey: 'shuhuaFrequency', isCheck: false }
]

// 方案----方案类型
export const planTypes = [
  { id: '1', label: '身高生长速度设计', key: 'heightGrowthRateDesign' },
  { id: '2', label: '营养素指导方案', key: 'nutrientGuidance' },
  { id: '3', label: '膳食指导方案', key: 'dietaryGuidance' },
  { id: '4', label: '运动指导方案', key: 'sportsGuidance' },
  { id: '5', label: '睡眠指导方案', key: 'sleepGuidance' },
  { id: '6', label: '情绪指导方案', key: 'emotionGuidance' }
]

export const planList = [
  { id: 1, checked: false, key: 'interventionPlan1', label: '1号方案（合理饮食、充足睡眠、适宜运动、良好情绪）' },
  { id: 2, checked: false, key: 'interventionPlan2', label: '2号方案（控制体重、调整饮食）' },
  { id: 3, checked: false, key: 'interventionPlan3', label: '3号方案（补充适宜的营养素）' },
  {
    id: 4,
    checked: false,
    key: 'interventionPlan4',
    label: '4号方案（中药调理）',
    remarkStatus: true,
    remark: '',
    remarkKey: 'plan4Remark'
  },
  {
    id: 5,
    checked: false,
    key: 'interventionPlan5',
    label: '5号方案（生长激素替代治疗）',
    remarkStatus: true,
    remark: '',
    remarkKey: 'plan5Remark'
  },
  {
    id: 6,
    checked: false,
    key: 'interventionPlan6',
    label: '6号方案（甲状腺素替代治疗）',
    remarkStatus: true,
    remark: '',
    remarkKey: 'plan6Remark'
  },
  {
    id: 7,
    checked: false,
    key: 'interventionPlan7',
    label: '7号方案（性发育抑制剂治疗）',
    remarkStatus: true,
    remark: '',
    remarkKey: 'plan7Remark'
  },
  {
    id: 8,
    checked: false,
    key: 'interventionPlan8',
    label: '8号方案（芳香化酶抑制剂治疗）',
    remarkStatus: true,
    remark: '',
    remarkKey: 'plan8Remark'
  },
  { id: 9, checked: false, key: 'otherPlan', label: '其他', remarkStatus: true, remark: '', remarkKey: 'otherRemark' }
]

// 奶类型
export const milkTypes = [
  { value: 1, label: 'ml/日' },
  { value: 2, label: '次/周' },
  { value: 3, label: '次/月' },
  { value: 4, label: '次/日' },
  { value: 5, label: 'g/周' }
]

// 鸡蛋类型
export const eggTypes = [
  { value: 1, label: '个/日' },
  { value: 2, label: '个/周' },
  { value: 3, label: '次/周' },
  { value: 4, label: '次/月' },
  { value: 5, label: '次/日' },
  { value: 6, label: 'g/周' }
]

// 碳水类型
export const carbonWaterTypes = [
  { value: 1, label: 'g/日' },
  { value: 2, label: 'g/周' }
]
