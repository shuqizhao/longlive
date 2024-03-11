<template>
  <div class="height-plan flex-jus-between">
    <div class="form-group left-width">
      <h4 class="mb-10">1.基本情况</h4>
      <tableExpected
        class="mt-10"
        :expectedInfo="userData.dataInfo"
        :currentInfo="userData.currentInfo"
        :boneAgeInfo="userData.boneAgeInfo"
      />
      <tableBaseBegin class="mt-10" :expectedInfo="userData.dataInfo" :currentInfo="userData.currentInfo" />
      <tableYichuan class="mt-10" :heredityInfo="userData.dataInfo" />
      <tableSexual
        :customerObj="customerObj"
        :currentInfo="userData.currentInfo"
        v-if="userData.currentInfo.bodyCheck"
      />
      <HeightGrowthTarget :customerObj="customerObj" />
    </div>
    <div class="form-group right-width">
      <h4 class="mb-10">2.速度设计</h4>
      <div v-if="userData.boneAgeInfo.boneAge">
        <tableBonAgeBegin class="mt-10" :boneAgeInfo="userData.boneAgeInfo" />
        <div class="bigBoneAge" v-if="showNoDesign">
          <p>男生骨龄 &gt;= 14岁，生长空间 &lt; 5cm，不设计身高生长速度</p>
          <p>女生骨龄 &gt;= 12岁，生长空间 &lt; 5cm，不设计身高生长速度</p>
        </div>
        <div v-if="targetShow">
          <tableTargetStage
            class="mt-10"
            :overInfo="userData.dataInfo"
            :currentInfo="userData.currentInfo"
            :boneAgeInfo="userData.boneAgeInfo"
          />
          <!-- 目标骨龄身高生长实现方法(一) -->
          <div v-if="showWayOne">
            <tableTargetWayOne
              class="mt-10"
              :overInfo="userData.dataInfo"
              :currentInfo="userData.currentInfo"
              :boneAgeInfo="userData.boneAgeInfo"
            />
            <div class="weight-control">
              <div style="width: 100px">体重控制</div>
              <div>
                <div class="mb-10">
                  <label>
                    <span
                      class="m-radio__input"
                      :class="{
                        'is-checked': paramsData.weightControl1 === 'TIME'
                      }"
                    >
                      <input
                        class="m-radio__original"
                        type="radio"
                        v-model="paramsData.weightControl1"
                        value="TIME"
                        @change="handleChange"
                      />
                    </span>
                    <span class="control-label"> 按时间控制 </span>
                  </label>
                  <div style="display: inline-block; min-width: 200px">
                    <el-input v-model="weightForm.valOne" style="width: 80px" />
                    <el-select v-model="paramsData.controlUnit1" style="width: 70px; margin-left: 10px">
                      <el-option label="年" value="年">年</el-option>
                      <el-option label="月" value="月">月</el-option>
                    </el-select>
                  </div>
                  <span class="mr-10">体重控制&lt;=</span>
                  <el-input v-model="weightForm.valTwo" style="width: 80px" />
                  <span class="ml-10">kg</span>
                </div>
                <div>
                  <label>
                    <span
                      class="m-radio__input"
                      :class="{
                        'is-checked': paramsData.weightControl1 === 'HEIGHT'
                      }"
                    >
                      <input
                        class="m-radio__original"
                        type="radio"
                        v-model="paramsData.weightControl1"
                        value="HEIGHT"
                        @change="handleChange"
                      />
                    </span>
                    <span class="control-label"> 按身高控制 </span>
                  </label>
                  <div style="display: inline-block; min-width: 200px">
                    <el-input v-model="weightForm.valThree" style="width: 80px" />
                    <span class="ml-10">cm</span>
                  </div>
                  <span class="mr-10">体重控制&lt;=</span>
                  <el-input v-model="weightForm.valFour" style="width: 80px" />
                  <span class="ml-10">kg</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 目标骨龄身高生长实现方法(二) -->
          <div>
            <tableTargetWayTwo
              class="mt-10"
              :overInfo="userData.dataInfo"
              :currentInfo="userData.currentInfo"
              :boneAgeInfo="userData.boneAgeInfo"
            />
            <div class="weight-control">
              <div style="width: 100px">体重控制</div>
              <div>
                <div class="mb-10">
                  <label>
                    <span
                      class="m-radio__input"
                      :class="{
                        'is-checked': paramsData.weightControl2 === 'TIME'
                      }"
                    >
                      <input
                        class="m-radio__original"
                        type="radio"
                        v-model="paramsData.weightControl2"
                        value="TIME"
                        @change="handleChange"
                      />
                    </span>
                    <span class="control-label"> 按时间控制 </span>
                  </label>
                  <div style="display: inline-block; min-width: 200px">
                    <el-input v-model="weightForm.valSecondOne" style="width: 80px" />
                    <el-select v-model="paramsData.controlUnit2" style="width: 70px; margin-left: 10px">
                      <el-option label="年" value="年">年</el-option>
                      <el-option label="月" value="月">月</el-option>
                    </el-select>
                  </div>
                  <span class="mr-10">体重控制&lt;=</span>
                  <el-input v-model="weightForm.valSecondTwo" style="width: 80px" />
                  <span class="ml-10">kg</span>
                </div>
                <div>
                  <label>
                    <span
                      class="m-radio__input"
                      :class="{
                        'is-checked': paramsData.weightControl2 === 'HEIGHT'
                      }"
                    >
                      <input
                        class="m-radio__original"
                        type="radio"
                        v-model="paramsData.weightControl2"
                        value="HEIGHT"
                        @change="handleChange"
                      />
                    </span>
                    <span class="control-label"> 按身高控制 </span>
                  </label>
                  <div style="display: inline-block; min-width: 200px">
                    <el-input v-model="weightForm.valSecondThree" style="width: 80px" />
                    <span class="ml-10">cm</span>
                  </div>
                  <span class="mr-10">体重控制&lt;=</span>
                  <el-input v-model="weightForm.valSecondFour" style="width: 80px" />
                  <span class="ml-10">kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!userData.boneAgeInfo.boneAge">没有骨龄，不设计身高生长速度</div>
      <div class="plan-checkbox">
        <h4 class="mtb-20">3、身高干预方案 (红色为保健干预方法，蓝色为临床内分泌治疗方法)</h4>
        <div>
          <div class="item" v-for="(item, index) in state.planList" :key="item.label">
            <label>
              <span
                :style="{
                'color': index &lt; 3 ? '#D01010' : '#5677FC',
                'display': 'inline-block',
                'min-width': '270px'
              }"
              >
                <input type="checkbox" v-model="item.checked" /> {{ item.label }}
              </span>
              <span v-if="item.remarkStatus && item.checked">
                <label class="remark-input">备注：</label>
                <el-input v-model="item.remark" style="width: 500px" />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-save">
    <el-button type="primary" @click="handleSave">保 存</el-button>
  </div>
  <BackTop />
</template>

<script setup>
import { heightGrowthRateDesign } from '@/api/heightManageCom/h-plan-manage'
import { reactive, ref, inject, onMounted, computed, watch } from 'vue'
import tableExpected from './components/table-expected.vue'
import tableBonAgeBegin from './components/table-boneAge-begin.vue'
import tableBaseBegin from './components/table-base-begin.vue'
import tableYichuan from './components/table-yichuan.vue'
import tableSexual from './components/table-sexual.vue'
import HeightGrowthTarget from '@/components/HeightGrowthTarget/index.vue'
import tableTargetStage from '@/components/table-target-stage/index.vue'
import tableTargetWayOne from '@/components/table-target-way-one/index.vue'
import tableTargetWayTwo from '@/components/table-target-way-two/index.vue'
import BackTop from '@/components/BackTop/index.vue'
import useTableTargetShow from '@/hooks/useTableTargetShow'

import { ElMessage } from 'element-plus'
import { planList } from '@/utils/config'

const emit = defineEmits(['updateGuidance'])
const customerObj = inject('customerObj')
const customerUid = inject('customerUid')

const props = defineProps({
  userData: {
    type: Object
  },
  heightGrowthData: {
    type: Object
  },
  planDesignUid: {
    type: String
  }
})

const paramsDataFn = () => ({
  weightControl1: null, // 实现方法一，TIME_时间控制 ;HEIGHT_身高控制
  weightControl2: null,
  controlValue1: '', // 实现方法一数值
  controlUnit1: '年',
  controlUnit2: '年',
  weightControlValue1: '', // 实现方法一体重控制数值
  interventionPlan1: false,
  interventionPlan2: false,
  interventionPlan3: false,
  interventionPlan4: false,
  interventionPlan5: false,
  interventionPlan6: false,
  interventionPlan7: false,
  interventionPlan8: false,
  otherPlan: false,
  otherRemark: '',
  plan4Remark: '',
  plan5Remark: '',
  plan6Remark: '',
  plan7Remark: '',
  plan8Remark: ''
})

const paramsData = ref(paramsDataFn())

const weightForm = reactive({
  valOne: '0',
  valTwo: '0',
  valThree: '0',
  valFour: '0',

  valSecondOne: '0',
  valSecondTwo: '0',
  valSecondThree: '0',
  valSecondFour: '0'
})

const state = reactive({
  planList: planList
})

const handleChange = (e) => {
  // let targetVal = e.target.value
  // paramsData.weightControl1 =targetVal
}

const handleSave = () => {
  if (paramsData.value.weightControl1 == 'TIME') {
    paramsData.value.controlValue1 = weightForm.valOne
    paramsData.value.weightControlValue1 = weightForm.valTwo
  }
  if (paramsData.value.weightControl1 == 'HEIGHT') {
    paramsData.value.controlValue1 = weightForm.valThree
    paramsData.value.weightControlValue1 = weightForm.valFour
  }
  if (paramsData.value.weightControl2 == 'TIME') {
    paramsData.value.controlValue2 = weightForm.valSecondOne
    paramsData.value.weightControlValue2 = weightForm.valSecondTwo
  }
  if (paramsData.value.weightControl2 == 'HEIGHT') {
    paramsData.value.controlValue2 = weightForm.valSecondThree
    paramsData.value.weightControlValue2 = weightForm.valSecondFour
  }

  let obj = {}
  state.planList.forEach((item) => {
    obj[item.key] = item.checked
    if (item.remarkStatus) {
      obj[item.remarkKey] = item.remark
    }
  })
  let subData = {
    customerUid,
    planDesignUid: props.planDesignUid,
    uid: props.heightGrowthData.uid,
    ...paramsData.value,
    ...obj
  }
  // console.log('subData',subData);
  // return
  _heightGrowthRateDesign(subData)
}

//身高生长速度设计新增修改
const _heightGrowthRateDesign = (subData) => {
  heightGrowthRateDesign(subData).then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: '保存成功！'
    })
    emit('updateGuidance')
  })
}

const { targetShow, showWayOne, showNoDesign } = useTableTargetShow(props.userData)

onMounted(() => {
  if (props.heightGrowthData.uid) {
    paramsData.value = props.heightGrowthData

    if (paramsData.value.weightControl1 == 'TIME') {
      weightForm.valOne = paramsData.value.controlValue1
      weightForm.valTwo = paramsData.value.weightControlValue1
    }
    if (paramsData.value.weightControl1 == 'HEIGHT') {
      weightForm.valThree = paramsData.value.controlValue1
      weightForm.valFour = paramsData.value.weightControlValue1
    }
    if (paramsData.value.weightControl2 == 'TIME') {
      weightForm.valSecondOne = paramsData.value.controlValue2
      weightForm.valSecondTwo = paramsData.value.weightControlValue2
    }
    if (paramsData.value.weightControl2 == 'HEIGHT') {
      weightForm.valSecondThree = paramsData.value.controlValue2
      weightForm.valSecondFour = paramsData.value.weightControlValue2
    }
    state.planList.forEach((item) => {
      item.checked = paramsData.value[item.key]
      if (item.remarkStatus) {
        item.remark = paramsData.value[item.remarkKey]
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.left-width {
  width: 42%;
}
.right-width {
  width: 52%;
}
.weight-control {
  display: flex;
  border: 1px solid #ccc;
  padding: 10px 5px;
  .control-label {
    font-size: 15px;
    font-weight: normal;
  }
}
.plan-checkbox {
  .item {
    margin: 10px 0;
    font-size: 15px;
    line-height: 30px;
  }
  .remark-input {
    font-size: 15px;
    font-weight: normal;
  }
}
.bottom-save {
  text-align: center;
  margin-top: 20px;
}
.bigBoneAge {
  border: 1px solid #ccc;
  p {
    margin: 10px;
  }
}
</style>
