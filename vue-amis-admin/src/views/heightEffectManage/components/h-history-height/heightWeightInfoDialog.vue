<template>
  <el-dialog
    v-model="dialogFormVisible"
    :close-on-click-modal="false"
    destroy-on-close
    width="1000px"
    top="70px"
    @close="handleCancel(ruleFormRef)"
  >
    <template #header>
      <span>{{ diaTitle }}</span>
      <span style="color: yellow; font-size: 14px"
        >（孩子的身高体重数据是生长发育的重要指标，请测量准确，不要轻易修改）</span
      >
    </template>
    <el-form ref="ruleFormRef" :model="dialogForm" :label-width="sexLabelWidth" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="添加日期：" prop="addTime">
            <el-date-picker
              v-model="dialogForm.addTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择"
              :disabled-date="disabledDate"
              style="width: 90%"
              @change="changeDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生活年龄：" prop="lifeAge">
            <el-input v-model="dialogForm.lifeAge" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="目前身高：" prop="currentHeight">
            <el-input v-model="dialogForm.currentHeight" placeholder="请输入" maxlength="5" style="width: 90%" />
            <span class="end-unit">cm</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身高百分位：" prop="heightPercent">
            <el-input v-model="dialogForm.heightPercent" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="目前体重：" prop="currentWeight">
            <el-input v-model="dialogForm.currentWeight" placeholder="请输入" maxlength="5" style="width: 90%" />
            <span class="end-unit">kg</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="体重百分位：" prop="weightPercent">
            <el-input v-model="dialogForm.weightPercent" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="骨龄：" prop="boneAge">
            <el-input v-model="dialogForm.boneAge" placeholder="请输入" maxlength="5" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="BMI：" prop="bmi">
            <el-input v-model="dialogForm.bmi" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="腹围：" prop="abdominal">
            <el-input v-model="dialogForm.abdominal" placeholder="请输入" maxlength="5" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="BMI百分位：" prop="bmiPercent">
            <el-input v-model="dialogForm.bmiPercent" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否检查身体：" prop="bodyCheck">
            <el-radio-group v-model="dialogForm.bodyCheck" @change="handleChangeActive">
              <el-radio :label="false">未检查</el-radio>
              <el-radio :label="true">已检查</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性发育情况：" prop="sexual">
            <el-radio-group v-model="dialogForm.sexual" @change="handleChangeActive">
              <el-radio :label="false">未发育</el-radio>
              <el-radio :label="true">已发育</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="dialogForm.bodyCheck">
        <div class="develop-title">
          <span class="line"></span>
          <div class="title">性发育情况</div>
        </div>
        <!-- 男性发育情况 -->
        <div v-if="customerObj.sex === '0'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="性发育分期：" prop="sexualStage">
                <el-select v-model="maleSexulForm.sexualStage" placeholder="请选择" clearable style="width: 100%">
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="同期变化：">
                <el-checkbox-group v-model="maleSexulForm.changesSamePeriod" @change="changeCheck">
                  <el-checkbox v-for="(item, index) in boySameTermTypes" :key="index" :label="item.value">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <template v-for="item in boySameTermTypes" :key="item.value">
                <el-form-item :label="item.label" v-if="maleSexulForm.changesSamePeriod.includes(item.value)">
                  <el-input v-model="maleSexulForm[item.value]" placeholder="请输入" />
                </el-form-item>
              </template>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="阴毛：" prop="pubicHair">
                <el-select v-model="maleSexulForm.pubicHair" placeholder="请选择" clearable style="width: 100%">
                  <el-option
                    v-for="item in boyPubicHairTypes"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="阴茎长度：" prop="penisLong">
                <el-input v-model="maleSexulForm.penisLong" style="width: 85%" />
                <span class="end-unit">cm</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="阴茎长度Tanner分期：" prop="penisTanner">
                <el-select v-model="maleSexulForm.penisTanner" placeholder="请选择" clearable style="width: 100%">
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="左睾丸长径：" prop="leftTestisLongDiameter">
                <el-input v-model="maleSexulForm.leftTestisLongDiameter" style="width: 85%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="左睾丸长径Tanner分期：" prop="leftTestisLongDiameterTanner">
                <el-select
                  v-model="maleSexulForm.leftTestisLongDiameterTanner"
                  placeholder="请选择"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="左睾丸大小：">
                <el-input v-model="maleSexulForm.leftTestisLong" style="width: 75px" />
                <span class="end-unit">*</span>
                <el-input v-model="maleSexulForm.leftTestisWidth" style="width: 75px" />
                <span class="end-unit">*</span>
                <el-input v-model="maleSexulForm.leftTestisHigh" style="width: 75px" />
                <span class="end-unit">cm³</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="左睾丸容积：" prop="leftTestisVolume">
                <el-input v-model="maleSexulForm.leftTestisVolume" style="width: 85%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="左睾丸容积Tanner分期：" prop="leftTestisVolumeTanner">
                <el-select
                  v-model="maleSexulForm.leftTestisVolumeTanner"
                  placeholder="请选择"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="右睾丸长径：" prop="rightTestisLongDiameter">
                <el-input v-model="maleSexulForm.rightTestisLongDiameter" style="width: 85%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="右睾丸长径Tanner分期：" prop="rightTestisLongDiameterTanner">
                <el-select
                  v-model="maleSexulForm.rightTestisLongDiameterTanner"
                  placeholder="请选择"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="右睾丸大小：">
                <el-input v-model="maleSexulForm.rightTestisLong" style="width: 75px" />
                <span class="end-unit">*</span>
                <el-input v-model="maleSexulForm.rightTestisWidth" style="width: 75px" />
                <span class="end-unit">*</span>
                <el-input v-model="maleSexulForm.rightTestisHigh" style="width: 75px" />
                <span class="end-unit">cm³</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="右睾丸容积：" prop="rightTestisVolume">
                <el-input v-model="maleSexulForm.rightTestisVolume" placeholder="请输入" style="width: 85%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="右睾丸容积Tanner分期：" prop="rightTestisVolumeTanner">
                <el-select
                  v-model="maleSexulForm.rightTestisVolumeTanner"
                  placeholder="请选择"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="结论(家长可见)：">
            <el-input
              v-model="maleSexulForm.conclusion"
              type="textarea"
              :rows="3"
              placeholder="限500字符"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              v-model="maleSexulForm.remark"
              type="textarea"
              :rows="3"
              placeholder="限500字符"
              maxlength="500"
            />
          </el-form-item>
        </div>
        <!-- 女性发育情况 -->
        <div v-if="customerObj.sex === '1'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="性发育分期：" prop="sexualStage">
                <el-select v-model="FemaleSexualForm.sexualStage" placeholder="请选择" clearable style="width: 100%">
                  <el-option
                    v-for="item in sexDevelopmentStages"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="同期变化：">
                <el-checkbox-group v-model="FemaleSexualForm.changesSamePeriod" @change="changeCheck">
                  <el-checkbox v-for="(item, index) in girlSameTermTypes" :key="index" :label="item.value">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <template v-for="item in girlSameTermTypes" :key="item.value">
                <el-form-item :label="item.label" v-if="FemaleSexualForm.changesSamePeriod.includes(item.value)">
                  <el-input v-model="FemaleSexualForm[item.value]" placeholder="请输入" />
                </el-form-item>
              </template>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="乳房：" prop="breast">
                <el-select v-model="FemaleSexualForm.breast" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="item in breastTypes" :key="item.label" :label="item.label" :value="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="阴毛：" prop="pubicHair">
                <el-select v-model="FemaleSexualForm.pubicHair" placeholder="请选择" clearable style="width: 100%">
                  <el-option
                    v-for="item in girlPubicHairTypes"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="子宫大小：">
                <el-input v-model="FemaleSexualForm.uterusLong" style="width: 80px" />
                <span class="end-unit">*</span>
                <el-input v-model="FemaleSexualForm.uterusWidth" style="width: 80px" />
                <span class="end-unit">*</span>
                <el-input v-model="FemaleSexualForm.uterusHigh" style="width: 80px" />
                <span class="end-unit">cm³</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="子宫容积：" prop="uterusVolume">
                <el-input v-model="FemaleSexualForm.uterusVolume" style="width: 82%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="子宫内膜厚度：" prop="uterusInThickness">
                <el-input v-model="FemaleSexualForm.uterusInThickness" style="width: 82%" />
                <span class="end-unit">cm</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="左卵巢大小：">
                <el-input v-model="FemaleSexualForm.leftOvaryLong" style="width: 80px" />
                <span class="end-unit">*</span>
                <el-input v-model="FemaleSexualForm.leftOvaryWidth" style="width: 80px" />
                <span class="end-unit">*</span>
                <el-input v-model="FemaleSexualForm.leftOvaryHigh" style="width: 80px" />
                <span class="end-unit">cm³</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="右卵巢大小：">
                <el-input v-model="FemaleSexualForm.rightOvaryLong" style="width: 80px" />
                <span class="end-unit">*</span>
                <el-input v-model="FemaleSexualForm.rightOvaryWidth" style="width: 80px" />
                <span class="end-unit">*</span>
                <el-input v-model="FemaleSexualForm.rightOvaryHigh" style="width: 80px" />
                <span class="end-unit">cm³</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="左卵巢容积：" prop="leftOvaryVolume">
                <el-input v-model="FemaleSexualForm.leftOvaryVolume" placeholder="请输入" style="width: 82%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="右卵巢容积：" prop="rightOvaryVolume">
                <el-input v-model="FemaleSexualForm.rightOvaryVolume" placeholder="请输入" style="width: 82%" />
                <span class="end-unit">ml</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="左卵泡大小：" prop="leftFollicle">
                <el-input v-model="FemaleSexualForm.leftFollicle" placeholder="请输入" style="width: 82%" />
                <span class="end-unit">mm</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="右卵泡大小：" prop="rightFollicle">
                <el-input v-model="FemaleSexualForm.rightFollicle" placeholder="请输入" style="width: 82%" />
                <span class="end-unit">mm</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="结论(家长可见)：">
            <el-input
              v-model="FemaleSexualForm.conclusion"
              type="textarea"
              :rows="3"
              placeholder="限500字符"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              v-model="FemaleSexualForm.remark"
              type="textarea"
              :rows="3"
              placeholder="限500字符"
              maxlength="500"
            />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="上传附件：" prop="urls">
        <UploadMultipleImage v-model="dialogForm.urls" />
      </el-form-item>
      <div class="all-reslut">
        <label>结论：</label>
        <div v-html="dialogForm.conclusion"></div>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  addHistoryHeight,
  updateHistoryHeight,
  historyHeightDetail,
  calculateLifeAge
} from '@/api/heightManageCom/h-history-height'
import { getHeightCustomization, getBirthGenetics } from '@/api/heightManageCom/h-birth-heredity'
import { reactive, ref, inject, computed, watch, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  sexTypes,
  sexDevelopmentStages,
  boySameTermTypes,
  girlSameTermTypes,
  breastTypes,
  boyPubicHairTypes,
  girlPubicHairTypes
} from '@/utils/config'
import UploadMultipleImage from '@/components/UploadMultipleImage/index.vue'
import { countVolume, toDay } from '@/utils/util'
import {
  statureFilter,
  boneAgeFilter,
  heightRiskFilter,
  heightShortFilter,
  filterSameArr,
  sexualFilter
} from '@/utils/filters'

const props = defineProps({
  diaTitle: {
    type: String,
    default: ''
  }
})
const customerObj = inject('customerObj')
const customerUid = inject('customerUid')

const emit = defineEmits(['refreshList'])

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

const lifeAgeShowFinish = ref(false)

const forecastHeight = ref(0) // 预测成年身高
const forecastHeightPer = ref(null)
const expectHeight = ref(0) // 期望身高
const geneticsHeight = ref(0) // 遗传身高
const currHeightOfTargetHeight = ref(0)

const dialogForm = reactive({
  addTime: toDay(),
  lifeAge: '0',
  currentHeight: '',
  heightPercent: '0',
  currentWeight: '',
  weightPercent: '0',
  boneAge: null,
  bmi: '0',
  abdominal: '',
  bmiPercent: '0',
  bodyCheck: false, // 是否检查身体
  sexual: false, // 性发育情况
  urls: [], // 上传附件
  conclusion: '',
  uid: '',
  customerUid: '',
  dietaryEnergyRequirement: '' // 能量
})

// 男--发育情况
const createmaleData = () => ({
  changesSamePeriod: [],
  armpitHair: null, // 腋毛
  beard: null, // 胡须
  adamApple: null, // 喉结
  growthSpurt: null, // 生长突増
  voiceChanger: null, // 变声
  nocturnalEmission: null, // 遗精
  other: null, // 其他
  leftTestisLong: 0,
  leftTestisWidth: 0,
  leftTestisHigh: 0,
  leftTestisLongDiameter: '',
  leftTestisLongDiameterTanner: '',
  leftTestisVolume: '',
  leftTestisVolumeTanner: '',
  penisLong: '',
  penisTanner: '',
  pubicHair: '',
  remark: '',
  rightTestisLong: 0,
  rightTestisWidth: 0,
  rightTestisHigh: 0,
  rightTestisLongDiameter: '',
  rightTestisLongDiameterTanner: '',
  rightTestisVolume: '',
  rightTestisVolumeTanner: '',
  sexualStage: '',
  conclusion: ''
})

const maleSexulForm = ref(createmaleData())

// 女--发育情况
const createFemaleData = () => ({
  sexualStage: '',
  changesSamePeriod: [], // 同期变化
  armpitHair: null,
  growthSpurt: null,
  menarche: null,
  other: null,
  breast: '',
  pubicHair: '',
  uterusLong: 0, // 子宫长
  uterusWidth: 0,
  uterusHigh: 0,
  uterusVolume: '', // 子宫容积
  uterusInThickness: '',
  leftOvaryLong: 0,
  leftOvaryWidth: 0,
  leftOvaryHigh: 0,
  leftOvaryVolume: '', // 左卵巢容积
  rightOvaryLong: 0,
  rightOvaryWidth: 0,
  rightOvaryHigh: 0,
  rightOvaryVolume: '', // 右卵巢容积
  leftFollicle: '',
  rightFollicle: '',
  conclusion: '', // 结论（家长可见）
  remark: ''
})

const FemaleSexualForm = ref(createFemaleData())

const rules = reactive({
  addTime: [{ required: true, message: '请选择添加日期', trigger: 'change' }],
  currentHeight: [
    { required: true, message: '请填写目前身高', trigger: 'blur' },
    {
      type: 'string',
      pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
      message: '请输入正确的身高',
      trigger: 'blur'
    }
  ],
  currentWeight: [
    { required: true, message: '请填写目前体重', trigger: 'blur' },
    {
      type: 'string',
      pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
      message: '请输入正确的体重',
      trigger: 'blur'
    }
  ],
  boneAge: [
    {
      type: 'string',
      pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
      message: '请输入大于0的数',
      trigger: 'blur'
    }
  ]
})

const sexLabelWidth = computed(() => {
  return customerObj.sex === '0' ? '180px' : '150px'
})

// 计算左睾丸大小
watch(
  () => maleSexulForm.value.leftTestisLong,
  (newVal, oldVal) => {
    leftTestisVolumeCommon()
  },
  { deep: true }
)

watch(
  () => maleSexulForm.value.leftTestisWidth,
  (newVal, oldVal) => {
    leftTestisVolumeCommon()
  },
  { deep: true }
)

watch(
  () => maleSexulForm.value.leftTestisHigh,
  (newVal, oldVal) => {
    leftTestisVolumeCommon()
  },
  { deep: true }
)

const leftTestisVolumeCommon = () => {
  let { leftTestisLong, leftTestisWidth, leftTestisHigh } = maleSexulForm.value
  if (!leftTestisLong || !leftTestisWidth || !leftTestisHigh) {
    return
  }
  if (leftTestisLong == 0 || leftTestisWidth == 0 || leftTestisHigh == 0) {
    return
  }
  maleSexulForm.value.leftTestisVolume = countVolume(leftTestisLong, leftTestisWidth, leftTestisHigh, customerObj.sex)
}

// 计算右睾丸大小
watch(
  () => maleSexulForm.value.rightTestisLong,
  (newVal, oldVal) => {
    rightTestisVolumeCommon()
  },
  { deep: true }
)

watch(
  () => maleSexulForm.value.rightTestisWidth,
  (newVal, oldVal) => {
    rightTestisVolumeCommon()
  },
  { deep: true }
)

watch(
  () => maleSexulForm.value.rightTestisHigh,
  (newVal, oldVal) => {
    rightTestisVolumeCommon()
  },
  { deep: true }
)

const rightTestisVolumeCommon = () => {
  let { rightTestisLong, rightTestisWidth, rightTestisHigh } = maleSexulForm.value
  if (!rightTestisLong || !rightTestisWidth || !rightTestisHigh) {
    return
  }
  if (rightTestisLong == 0 || rightTestisWidth == 0 || rightTestisHigh == 0) {
    return
  }
  maleSexulForm.value.rightTestisVolume = countVolume(
    rightTestisLong,
    rightTestisWidth,
    rightTestisHigh,
    customerObj.sex
  )
}

// 计算子宫大小
watch(
  () => FemaleSexualForm.value.uterusLong,
  (newVal, oldVal) => {
    uterusCommon()
  },
  { deep: true }
)

watch(
  () => FemaleSexualForm.value.uterusWidth,
  (newVal, oldVal) => {
    uterusCommon()
  },
  { deep: true }
)

watch(
  () => FemaleSexualForm.value.uterusHigh,
  (newVal, oldVal) => {
    uterusCommon()
  },
  { deep: true }
)

const uterusCommon = () => {
  let { uterusLong, uterusWidth, uterusHigh } = FemaleSexualForm.value
  if (!uterusLong || !uterusWidth || !uterusHigh) {
    return
  }
  if (uterusLong == 0 || uterusWidth == 0 || uterusHigh == 0) {
    return
  }
  FemaleSexualForm.value.uterusVolume = countVolume(uterusLong, uterusWidth, uterusHigh, customerObj.sex)
}

// 计算左卵巢大小
watch(
  () => FemaleSexualForm.value.leftOvaryLong,
  (newVal, oldVal) => {
    leftOvaryCommon()
  },
  { deep: true }
)

watch(
  () => FemaleSexualForm.value.leftOvaryWidth,
  (newVal, oldVal) => {
    leftOvaryCommon()
  },
  { deep: true }
)

watch(
  () => FemaleSexualForm.value.leftOvaryHigh,
  (newVal, oldVal) => {
    leftOvaryCommon()
  },
  { deep: true }
)

const leftOvaryCommon = () => {
  let { leftOvaryLong, leftOvaryWidth, leftOvaryHigh } = FemaleSexualForm.value
  if (!leftOvaryLong || !leftOvaryWidth || !leftOvaryHigh) {
    return
  }
  if (leftOvaryLong == 0 || leftOvaryWidth == 0 || leftOvaryHigh == 0) {
    return
  }
  FemaleSexualForm.value.leftOvaryVolume = countVolume(leftOvaryLong, leftOvaryWidth, leftOvaryHigh, customerObj.sex)
}

// 计算右卵巢大小
watch(
  () => FemaleSexualForm.value.rightOvaryLong,
  (newVal, oldVal) => {
    rightOvaryCommon()
  },
  { deep: true }
)

watch(
  () => FemaleSexualForm.value.rightOvaryWidth,
  (newVal, oldVal) => {
    rightOvaryCommon()
  },
  { deep: true }
)

watch(
  () => FemaleSexualForm.value.rightOvaryHigh,
  (newVal, oldVal) => {
    rightOvaryCommon()
  },
  { deep: true }
)

const rightOvaryCommon = () => {
  let { rightOvaryLong, rightOvaryWidth, rightOvaryHigh } = FemaleSexualForm.value
  if (!rightOvaryLong || !rightOvaryWidth || !rightOvaryHigh) {
    return
  }
  if (rightOvaryLong == 0 || rightOvaryWidth == 0 || rightOvaryHigh == 0) {
    return
  }
  FemaleSexualForm.value.rightOvaryVolume = countVolume(
    rightOvaryLong,
    rightOvaryWidth,
    rightOvaryHigh,
    customerObj.sex
  )
}

const _getBirthGenetics = () => {
  getBirthGenetics(customerUid).then((res) => {
    expectHeight.value = res.datas.expectHeight
    geneticsHeight.value = res.datas.geneticsHeight
  })
}

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

// 详情
const _historyHeightDetail = (uid, copyFlag) => {
  historyHeightDetail(uid).then((res) => {
    const {
      addTime,
      lifeAge,
      currentHeight,
      heightPercent,
      currentWeight,
      weightPercent,
      boneAge,
      bmi,
      abdominal,
      bmiPercent,
      bodyCheck,
      sexual,
      appendix,
      conclusion,
      dietaryEnergyRequirement,
      uid
    } = res.datas

    dialogForm.addTime = addTime
    dialogForm.lifeAge = lifeAge
    dialogForm.currentHeight = currentHeight
    dialogForm.heightPercent = heightPercent
    dialogForm.currentWeight = currentWeight
    dialogForm.weightPercent = weightPercent
    dialogForm.boneAge = boneAge
    dialogForm.bmi = bmi
    dialogForm.abdominal = abdominal
    dialogForm.bmiPercent = bmiPercent
    dialogForm.bodyCheck = bodyCheck
    dialogForm.sexual = sexual
    dialogForm.conclusion = conclusion
    dialogForm.dietaryEnergyRequirement = dietaryEnergyRequirement
    dialogForm.uid = copyFlag ? '' : uid // 如果是复制，uid就清空
    if (appendix && appendix.length) {
      dialogForm.urls = appendix.map((item) => {
        return {
          url: item
        }
      })
    }
    // 是否检查身体
    if (bodyCheck) {
      if (customerObj.sex === '0') {
        let maleDetailRes = res.datas.historyHeightSexualMale
        maleSexulForm.value = changesSameFn(maleDetailRes)
      }
      if (customerObj.sex === '1') {
        let femaleDetailRes = res.datas.historyHeightSexualFemale
        FemaleSexualForm.value = changesSameFn(femaleDetailRes)
      }
    }
  })
}

const changesSameFn = (obj) => {
  let data = obj
  if (data.changesSamePeriod == null) {
    data.changesSamePeriod = []
  } else {
    data.changesSamePeriod = data.changesSamePeriod.split(',')
  }
  return data
}

// 计算生活年龄
const changeDate = (val) => {
  if (!val) {
    dialogForm.lifeAge = '0'
    return
  }
  _calculateLifeAge()
}

const _calculateLifeAge = () => {
  lifeAgeShowFinish.value = false
  const data = {
    addTime: dialogForm.addTime,
    birthday: customerObj.birthday
  }
  calculateLifeAge(data).then((res) => {
    lifeAgeShowFinish.value = true
    dialogForm.lifeAge = res.msg
    conResult() // 放到计算出生活年龄之后，如果在onMounted里，数据会是0
  })
}

// 数据清零
const clearZero = () => {
  dialogForm.heightPercent = '0'
  dialogForm.weightPercent = '0'
  dialogForm.bmi = '0'
  dialogForm.bmiPercent = '0'
  conResult()
}

// 身高，体重公共代码提取
const hwCommon = () => {
  if (!dialogForm.currentHeight || !dialogForm.currentWeight) {
    clearZero()
    return
  }
  if (dialogForm.currentHeight.length < 2 || dialogForm.currentWeight == 0) {
    clearZero()
    return
  }
  let reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
  if (!reg.test(dialogForm.currentHeight) || !reg.test(dialogForm.currentWeight)) {
    clearZero()
    return
  }
  _getHeightCustomization()
}

// 计算百分比---监听身高
watch(
  () => dialogForm.currentHeight,
  (newVal, oldVal) => {
    hwCommon()
  },
  { deep: true }
)

watch(
  () => dialogForm.currentWeight,
  (newVal, oldVal) => {
    hwCommon()
  },
  { deep: true }
)

// 监听骨龄
watch(
  () => dialogForm.boneAge,
  (newVal, oldVal) => {
    let reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
    if (dialogForm.boneAge && !reg.test(dialogForm.boneAge)) {
      return
    }
    //只要身高和体重有数据，就请求接口，骨龄只对下面结论有影响
    if (dialogForm.currentHeight && dialogForm.currentWeight) {
      _getHeightCustomization()
    }
    conResult()
  },
  { deep: true }
)

watch(
  () => dialogForm.sexual,
  (newVal, oldVal) => {
    conResult()
  }
)

// 算法定制接口,计算百分位
const _getHeightCustomization = () => {
  const data = {
    birth: customerObj.birthday,
    sex: customerObj.sex,
    height: dialogForm.currentHeight,
    weight: dialogForm.currentWeight,
    diagnosisTime: dialogForm.addTime, // 传添加日期
    boneAge: dialogForm.boneAge ? dialogForm.boneAge : dialogForm.lifeAge,
    geneticHeight: geneticsHeight.value, // 遗传身高
    expectedHeight: expectHeight.value
  }
  getHeightCustomization(data).then((res) => {
    const { heightPer, weightPer, bmi, bmiPer, dietaryEnergyRequirement } = res.datas
    dialogForm.heightPercent = heightPer
    dialogForm.weightPercent = weightPer
    dialogForm.bmi = bmi
    dialogForm.bmiPercent = bmiPer
    dialogForm.dietaryEnergyRequirement = dietaryEnergyRequirement

    if (res.datas.forecastHeight == null) {
      forecastHeight.value = 0
      forecastHeightPer.value = 0
    } else {
      forecastHeight.value = res.datas.forecastHeight
      forecastHeightPer.value = res.datas.forecastHeightPer
    }
    currHeightOfTargetHeight.value = res.datas.currHeightOfTargetHeight
    conResult()
  })
}

const conResult = () => {
  let boneAgeRes = ''
  if (!!dialogForm.boneAge) {
    boneAgeRes = boneAgeFilter(dialogForm.boneAge, dialogForm.lifeAge)
  }
  let adultHeight = ''
  let heightRisk = ''
  // 骨龄存在时对应的成年身高
  if (dialogForm.boneAge && forecastHeight.value && forecastHeight.value != 0) {
    adultHeight = `骨龄对应成年身高：${forecastHeight.value}cm <br>`
    heightRisk = heightRiskFilter(forecastHeight.value, customerObj.sex)
  }
  let twoHeightCompare = ''
  if (dialogForm.boneAge && !!forecastHeight.value && !!expectHeight.value) {
    twoHeightCompare = `骨龄对应的成年身高与期望身高比较 ${heightShortFilter(
      forecastHeight.value,
      expectHeight.value
    )} <br>`
  }
  // 没骨龄，按生活年龄对应的成年身高
  let noBoneAgeHeight = ''
  if (dialogForm.currentHeight && dialogForm.currentWeight && !dialogForm.boneAge) {
    noBoneAgeHeight = `按生活年龄对应的成年身高：${forecastHeight.value}cm <br>`
  }
  let sexualPrecocity = ''
  if (dialogForm.sexual) {
    sexualPrecocity = sexualFilter(dialogForm.lifeAge, customerObj.sex) || ''
  }

  dialogForm.conclusion = `身高百分位数：${dialogForm.heightPercent}，体重百分位数：${dialogForm.weightPercent}，BMI：${
    dialogForm.bmi
  }，身材：${statureFilter(dialogForm.bmiPercent, dialogForm.heightPercent, dialogForm.weightPercent)} <br> 
  <div>${boneAgeRes}</div>
  ${adultHeight}
  ${noBoneAgeHeight}
  ${twoHeightCompare}
  <div>${heightRisk}</div>
  ${sexualPrecocity}`
}

const changeCheck = (value) => {
  FemaleSexualForm.changesSamePeriod = value
}

const countSameFn = (typesArr, sameChange) => {
  let beginArr = []
  typesArr.forEach((item) => {
    beginArr.push(item.value)
  })
  let filterArr = filterSameArr(beginArr, sameChange)

  filterArr.map((ele) => {
    if (customerObj.sex === '0') {
      maleSexulForm.value[ele] = null
    }
    if (customerObj.sex === '1') {
      FemaleSexualForm.value[ele] = null
    }
  })
}

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  let subData
  if (dialogForm.bodyCheck) {
    if (customerObj.sex === '0') {
      // 同期变化勾选去掉时，提交的时候把下面输入框中的内容重置
      let sameChange = maleSexulForm.value.changesSamePeriod
      countSameFn(boySameTermTypes, sameChange)

      maleSexulForm.value.changesSamePeriod = maleSexulForm.value.changesSamePeriod.join(',')
      subData = {
        ...dialogForm,
        historyHeightSexualMale: maleSexulForm.value
      }
    }
    if (customerObj.sex === '1') {
      let sameChange = FemaleSexualForm.value.changesSamePeriod
      countSameFn(girlSameTermTypes, sameChange)

      FemaleSexualForm.value.changesSamePeriod = FemaleSexualForm.value.changesSamePeriod.join(',')
      subData = {
        ...dialogForm,
        historyHeightSexualFemale: FemaleSexualForm.value
      }
    }
  } else {
    subData = dialogForm
  }
  subData.customerUid = customerUid
  subData.forecastHeight = forecastHeight.value // 预测成年身高加进去
  subData.forecastHeightPer = forecastHeightPer.value
  subData.currHeightOfTargetHeight = currHeightOfTargetHeight.value

  await formEl.validate((valid) => {
    if (valid) {
      let imgArr = subData.urls.map((item) => {
        if (item.name) {
          return import.meta.env.VITE_UPLOAD_API + 'file.bdxetyy.com/group1/' + item.response.datas[0].relativePath
        } else {
          return item.url
        }
      })
      subData.appendix = imgArr

      if (subData.uid) {
        syncApi = updateHistoryHeight(subData)
        implement(syncApi, '编辑')
      } else {
        syncApi = addHistoryHeight(subData)
        implement(syncApi, '新增')
      }
    }
  })
}

const implement = (fn, msg) => {
  fn.then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: msg + '成功！'
    })
    dialogFormVisible.value = false
    dialogForm.uid = ''
    emit('refreshList')
    ruleFormRef.value.resetFields()
    Object.assign(maleSexulForm.value, createmaleData())
    Object.assign(FemaleSexualForm.value, createFemaleData())
    clearZero()
    forecastHeight.value = 0
    forecastHeightPer.value = 0
  })
}

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  dialogFormVisible.value = false
  dialogForm.uid = ''
  formEl.resetFields()
  Object.assign(maleSexulForm.value, createmaleData())
  Object.assign(FemaleSexualForm.value, createFemaleData())
  clearZero()
  conResult()
  forecastHeight.value = 0
  forecastHeightPer.value = 0
}

onMounted(() => {
  _calculateLifeAge()
  _getBirthGenetics()
})

defineExpose({
  dialogFormVisible,
  _historyHeightDetail
})
</script>

<style lang="scss" scoped>
.end-unit {
  padding: 0 5px;
}

.develop-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .line {
    width: 4px;
    height: 20px;
    background: $panGreen;
  }
  .title {
    padding-left: 5px;
  }
}
.all-reslut {
  margin-left: 70px;
  label {
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>
