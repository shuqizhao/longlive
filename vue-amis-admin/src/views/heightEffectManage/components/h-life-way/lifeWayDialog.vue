<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="diaTitle"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
    custom-class="life-way-dialog"
    @close="handleCancel(ruleFormRef)"
    top="50px"
    width="1200px"
  >
    <el-form ref="ruleFormRef" :model="dialogForm" label-width="130px">
      <div class="fw-blod title">一、膳食</div>
      <el-form-item label="是否喝奶：">
        <el-radio-group v-model="dialogForm.drinkMilk">
          <el-radio v-for="item in drinkMilkTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <template v-if="dialogForm.drinkMilk === 'EVERY_DAY'">
          <el-input class="input-item" v-model="dialogForm.drinkMilkQuantity" maxlength="10" />&nbsp; ml/日
        </template>
      </el-form-item>
      <el-form-item label="牛奶种类：">
        <el-radio-group v-model="dialogForm.milkType">
          <el-radio v-for="item in allMilkTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <el-input
          class="input-item"
          v-model="dialogForm.otherMilkType"
          maxlength="10"
          v-if="dialogForm.milkType === 'OTHER'"
        />
      </el-form-item>
      <el-form-item label="鸡蛋：">
        <el-radio-group v-model="dialogForm.egg">
          <el-radio v-for="item in allEggTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <template v-if="dialogForm.egg === 'EAT_EGG'">
          <el-input class="input-item" v-model="dialogForm.eggQuantity" maxlength="10" /> 个/日
        </template>
      </el-form-item>
      <!-- 白肉类 -->
      <el-form-item label="白肉类：" class="form-item-types">
        <div>
          <div class="meat-item">
            <lebel>鸡</lebel>
            <el-input class="input-item" v-model="dialogForm.chickenQuantity" />
            <el-select v-model="dialogForm.chickenFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="meat-item">
            <lebel>鸭</lebel>
            <el-input class="input-item" v-model="dialogForm.duckQuantity" />
            <el-select v-model="dialogForm.duckFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="meat-item">
            <lebel>鱼</lebel>
            <el-input class="input-item" v-model="dialogForm.fishQuantity" />
            <el-select v-model="dialogForm.fishFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="meat-item">
            <lebel>虾</lebel>
            <el-input class="input-item" v-model="dialogForm.shrimpQuantity" />
            <el-select v-model="dialogForm.shrimpFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
      </el-form-item>
      <!-- 红肉类 -->
      <el-form-item label="红肉类：" class="form-item-types">
        <div>
          <div class="meat-item">
            <lebel>猪</lebel>
            <el-input class="input-item" v-model="dialogForm.porkQuantity" />
            <el-select v-model="dialogForm.porkFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="meat-item">
            <lebel>牛</lebel>
            <el-input class="input-item" v-model="dialogForm.beefQuantity" />
            <el-select v-model="dialogForm.beefFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="meat-item">
            <lebel>羊</lebel>
            <el-input class="input-item" v-model="dialogForm.muttonQuantity" />
            <el-select v-model="dialogForm.muttonFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="蔬菜类：" class="form-item-types">
        <div>
          <div class="meat-item">
            <lebel>绿色蔬菜</lebel>
            <el-input class="input-item" v-model="dialogForm.vegetableQuantity" />
            <el-select v-model="dialogForm.vegetableFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="meat-item">
            <lebel>淀粉类</lebel>
            <el-input class="input-item" v-model="dialogForm.starchQuantity" />
            <el-select v-model="dialogForm.starchFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="水果类：">
        <el-input class="input-item" v-model="dialogForm.fruitQuantity" style="width: 100px" />
        <el-select v-model="dialogForm.fruitFrequency" style="width: 100px">
          <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="蔬菜水果比例：">
        <el-input class="input-item" v-model="dialogForm.vegetableFruitRate" style="width: 100px" />
      </el-form-item>
      <el-form-item label="碳水类：">
        <div class="carbon-water">
          <label>面食</label>
          <el-input class="input-item" v-model="dialogForm.pasta" style="width: 100px" />
          <span>g/日</span>
        </div>
        <div class="carbon-water">
          <label>米</label>
          <el-input class="input-item" v-model="dialogForm.rice" style="width: 100px" />
          <span>g/日</span>
        </div>
        <div class="carbon-water">
          <label>其他</label>
          <el-input class="input-item" v-model="dialogForm.carbohydratesOther" style="width: 100px" />
          <span>g/日</span>
        </div>
      </el-form-item>
      <el-form-item label="零食：">
        <el-radio-group v-model="dialogForm.snack">
          <el-radio label="NO">不吃</el-radio>
          <el-radio label="OCCASIONALLY">偶尔吃</el-radio>
          <el-radio label="OFTEN">经常吃</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="碳酸饮料：">
        <el-radio-group v-model="dialogForm.carbonatedDrinks">
          <el-radio v-for="item in allDrinkTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <template v-if="dialogForm.carbonatedDrinks === 'EVERY_DAY'">
          <el-input
            class="input-item"
            v-model="dialogForm.carbonatedDrinksCapacity"
            maxlength="10"
            style="width: 100px"
          />
          ml/日
        </template>
      </el-form-item>
      <el-form-item label="果汁：">
        <el-radio-group v-model="dialogForm.juice">
          <el-radio v-for="item in allDrinkTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <template v-if="dialogForm.juice === 'EVERY_DAY'">
          <el-input class="input-item" v-model="dialogForm.juiceCapacity" maxlength="10" style="width: 100px" /> ml/日
        </template>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="dialogForm.mealRemark" type="textarea" :rows="3" placeholder="限500字符" maxlength="500" />
      </el-form-item>
      <div class="fw-blod title">二、睡眠</div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="入睡时间：">
            <el-time-picker v-model="dialogForm.bedTime" format="HH:mm" value-format="HH:mm" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起床时间：">
            <el-time-picker v-model="dialogForm.wakeUpTime" format="HH:mm" value-format="HH:mm" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时长(h/d)：">
            <el-input v-model="dialogForm.sleepDuration" style="width: 200px" disabled />
            <span>&nbsp;小时</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="入睡困难超过30分钟 > 3次/周：" label-width="250px">
        <el-radio-group v-model="dialogForm.sleepMoreThan30">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="午睡：">
            <el-radio-group v-model="dialogForm.nap">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="午睡时长(h)：" v-if="dialogForm.nap">
            <el-input v-model="dialogForm.napDuration" style="width: 200px" />
            <span>&nbsp;小时</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注：">
        <el-input v-model="dialogForm.sleepRemark" type="textarea" :rows="3" placeholder="限500字符" maxlength="500" />
      </el-form-item>
      <div class="fw-blod title">三、固定运动</div>
      <el-form-item label="固定运动：">
        <el-radio-group v-model="dialogForm.fixedMotion">
          <el-radio :label="false">无</el-radio>
          <el-radio :label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="dialogForm.fixedMotion">
        <div class="sports-item" v-for="(ele, index) in sportsList" :key="index">
          <div class="sports-box">
            <div class="sports-type">
              <span class="type-label">运动类型</span>
              <el-select v-model="ele.sportsStyle" style="width: 100px; margin-right: 10px">
                <el-option v-for="item in sportsTypes" :key="item.label" :label="item.label" :value="item.value" />
              </el-select>
              <el-input class="input-item" v-model="ele.sportsStyleOther" v-if="ele.sportsStyle === 'other'" />
            </div>
            <div class="sports-frequency">
              <span>运动频次</span>
              <el-input class="input-item" v-model="ele.sportsFrequency" />
              <el-select v-model="ele.sportsQuantity" style="width: 100px; margin-right: 10px">
                <el-option
                  v-for="item in sportsFrequencyTypes"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </div>
          </div>
          <div class="sports-icon">
            <el-icon :size="20" @click="handleDeleteSports(index)"><Remove /></el-icon>
            <el-icon :size="20" @click="handleAddTerm"><CirclePlus /></el-icon>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="dialogForm.sportsRemark" type="textarea" :rows="3" placeholder="限500字符" maxlength="500" />
      </el-form-item>
      <div class="fw-blod title">四、营养素</div>
      <el-form-item label="是否补充营养素：">
        <el-radio-group v-model="dialogForm.supplyNutrients">
          <el-radio v-for="item in nutrientsTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="dialogForm.supplyNutrients === 'SUPPLY_YOURSELF'">
        <div class="sports-item" v-for="(ele, index) in nutrientsList" :key="index">
          <div class="sports-box">
            <el-input class="input-item" v-model="ele.nutrientsName" placeholder="营养品名称" />
            <el-input class="input-item" v-model="ele.nutrientsQuantity" placeholder="营养品数量" />
            <el-select v-model="ele.nutrientsUnit" style="width: 100px; margin-right: 10px">
              <el-option
                v-for="item in nutrientsFrequencyTypes"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </div>
          <div class="sports-icon">
            <el-icon :size="20" @click="handleDeleteNutrients(index)"><Remove /></el-icon>
            <el-icon :size="20" @click="handleAddNutrients"><CirclePlus /></el-icon>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          v-model="dialogForm.nutrientsRemark"
          type="textarea"
          :rows="3"
          placeholder="限500字符"
          maxlength="500"
        />
      </el-form-item>
      <div class="fw-blod title">五、情绪</div>
      <el-form-item label="">
        <el-input v-model="dialogForm.mood" type="textarea" :rows="3" placeholder="限500字符" maxlength="500" />
      </el-form-item>
      <div class="fw-blod title">六、执行力</div>
      <el-form-item label="执行力：">
        <el-radio-group v-model="dialogForm.execution">
          <el-radio v-for="item in executionTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="执行难度：">
        <el-input
          v-model="dialogForm.executionDifficulty"
          type="textarea"
          :rows="3"
          placeholder="限500字符"
          maxlength="500"
        />
      </el-form-item>
      <div class="fw-blod title">七、疾病历史</div>
      <div class="situation">
        <div class="situation-item">
          <div class="situation-item-title">1、孩子个人史</div>
          <el-checkbox-group v-model="dialogForm.childPersonalHistory">
            <el-checkbox
              v-for="(item, index) in childPersonHistory"
              :key="index"
              :label="item.value"
              @change="personHistoryChange(item)"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="situation-item">
          <div class="situation-item-title">2、孩子形体上有没以下情况</div>
          <el-checkbox-group v-model="dialogForm.childShape">
            <el-checkbox
              v-for="(item, index) in childBodyTypes"
              :key="index"
              :label="item.value"
              @change="childBodyTypesChange(item)"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="situation-item">
          <div class="situation-item-title">
            3、家庭成员(近亲三代)中是否存在矮身材?（矮身材：男性身高低于160cm,女性身高低于150cm）
          </div>
          <el-radio-group v-model="dialogForm.familyShortStature">
            <el-radio v-for="item in shortStatureTypes" :key="item.value" :label="item.value">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </div>
        <div class="situation-item">
          <div class="situation-item-title">4、家庭成员(近亲三代)中是否存在以下疾病?</div>
          <el-checkbox-group v-model="dialogForm.familyDisease">
            <el-checkbox
              v-for="(item, index) in diseaseTypes"
              :key="index"
              :label="item.value"
              @change="diseaseChange(item.value)"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="situation-item">
          <div class="situation-item-title">5、其他疾病情况备注</div>
          <el-input v-model="dialogForm.diseaseRemark" type="textarea" placeholder="限500字符" maxlength="500" />
        </div>
      </div>
      <div class="fw-blod title">八、近期生长发育的总体情况分析（效果评估报告会显示此内容）</div>
      <el-form class="sit-form" :model="lifeStyleGrowthForm" label-width="130px">
        <div class="situation-item-title">1、近期总体情况分析问卷</div>
        <el-form-item label="总体评估：">
          <el-radio-group v-model="lifeStyleGrowthForm.overall" @change="changeOverall">
            <el-radio v-for="item in overallTypes" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="膳食：">
          <el-radio-group v-model="lifeStyleGrowthForm.meal" @change="changeMeal">
            <el-radio label="UNOPTIMIZED">未优化膳食</el-radio>
            <el-radio label="BALANCED">膳食营养均衡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="营养素：">
          <el-radio-group v-model="lifeStyleGrowthForm.nutrients" @change="changeNutrients">
            <el-radio label="ON_TIME">按时服用</el-radio>
            <el-radio label="OFTEN_MISSED">经常漏服</el-radio>
            <el-radio label="NO">不服用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运动：">
          <el-radio-group v-model="lifeStyleGrowthForm.sport" @change="changeSport">
            <el-radio v-for="item in overall_sportTypes" :key="item.value" :label="item.value">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="睡眠：">
          <el-checkbox-group v-model="lifeStyleGrowthForm.sleep">
            <el-checkbox
              v-for="(item, index) in overall_sleepTypes"
              :key="index"
              :label="item.value"
              @change="changeSleep(item)"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="体重：">
          <el-radio-group v-model="lifeStyleGrowthForm.weight" @change="changeWeight">
            <el-radio v-for="item in overall_weightTypes" :key="item.value" :label="item.value">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="打卡：">
          <el-radio-group v-model="lifeStyleGrowthForm.checkIn" @change="changeCheckIn">
            <el-radio label="ON_TIME">按时打卡</el-radio>
            <el-radio label="OCCASIONALLY">偶尔打卡</el-radio>
            <el-radio label="NEVER">从不打卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="situation-item-title">2、总体评估和建议（效果评估报告会显示此内容）</div>
        <el-input
          v-model="lifeStyleGrowthForm.totalEvaluate"
          type="textarea"
          :rows="8"
          placeholder="限500字符"
          maxlength="500"
        />
      </el-form>
      <div class="fw-blod title">九、其他情况备注</div>
      <el-input v-model="dialogForm.otherRemark" type="textarea" :rows="4" placeholder="限500字符" maxlength="500" />
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { addLifeStyle, updateLifeStyle, lifeStyleDetail } from '@/api/heightManageCom/h-life-way'
import { reactive, ref, inject, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  drinkMilkTypes,
  whiteMeatTypes,
  controlTypes,
  allMilkTypes,
  allEggTypes,
  redMeatTypes,
  vegetableTypes,
  allDrinkTypes,
  executionTypes,
  childPersonHistory,
  childBodyTypes,
  shortStatureTypes,
  diseaseTypes,
  overallTypes,
  overall_sportTypes,
  overall_sleepTypes,
  overall_weightTypes,
  sportsTypes,
  sportsFrequencyTypes,
  nutrientsTypes,
  nutrientsFrequencyTypes
} from '@/utils/config'
import { countDuration } from '@/utils/util'
import { Plus, Edit, CirclePlus, Remove } from '@element-plus/icons-vue'

const props = defineProps({
  diaTitle: {
    type: String,
    default: ''
  },
  copyStatus: {
    type: Boolean,
    default: false
  }
})
const customerUid = inject('customerUid')
const emit = defineEmits(['refreshList'])

const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)

let createFormData = () => ({
  drinkMilk: 'NO',
  drinkMilkQuantity: '',
  milkType: '',
  otherMilkType: '', // 其他牛奶种类
  egg: 'NO',
  eggQuantity: '',
  chickenQuantity: 0,
  duckQuantity: 0,
  fishQuantity: 0,
  shrimpQuantity: 0, // 虾数量
  porkQuantity: 0,
  beefQuantity: 0,
  muttonQuantity: 0, // 羊数量
  vegetableQuantity: 0,
  starchQuantity: 0,
  fruitQuantity: 0, // 水果类
  pasta: 0, // 碳水类面食
  rice: 0,
  carbohydratesOther: 0,
  chickenFrequency: '次/周',
  duckFrequency: '次/周',
  fishFrequency: '次/周',
  shrimpFrequency: '次/周',
  porkFrequency: 'g/日',
  beefFrequency: 'g/日',
  muttonFrequency: 'g/日',
  vegetableFrequency: 'g/日', // 绿色蔬菜单位
  starchFrequency: 'g/日',
  fruitFrequency: 'g/日',
  snack: 'NO',
  carbonatedDrinks: 'NO',
  juice: 'NO',
  carbonatedDrinksCapacity: '', // 碳酸饮料每天喝
  juiceCapacity: '', // 果汁每天喝
  sleepMoreThan30: false,
  nap: false,
  fixedMotion: false,
  sportsRemark: '',
  mood: '', // 情绪备注
  bedTime: '',
  wakeUpTime: '', // 起床时间
  sleepDuration: 0,
  supplyNutrients: 'NO', // 是否补充营养素
  nutrientsRemark: '', // 营养素备注
  execution: 'EXCELLENT', // 执行力
  executionDifficulty: '',
  childPersonalHistory: [],
  childShape: [],
  familyDisease: [],
  familyShortStature: '',
  diseaseRemark: '', // 其他疾病情况备注
  vegetableFruitRate: '', // 蔬菜水果比例
  mealRemark: '',
  sleepRemark: '',
  otherRemark: '',
  napDuration: '', // 午睡时长
  uid: '',
  customerUid: customerUid
})
const dialogForm = ref(createFormData())

// 近期生长发育的总体情况分析
let createLifeStyleGrowthForm = () => ({
  overall: '', // 总体评估
  meal: '',
  nutrients: '', // 营养素
  sport: '',
  sleep: [],
  weight: '',
  checkIn: '', // 打卡
  totalEvaluate: '' // 总体评估和建议
})
const lifeStyleGrowthForm = ref(createLifeStyleGrowthForm())

const sportsList = ref([
  {
    sportsStyle: 'swim',
    sportsFrequency: 0,
    sportsQuantity: '次/周',
    sportsStyleOther: ''
  }
])

const nutrientsList = ref([
  {
    nutrientsName: '',
    nutrientsQuantity: 0,
    nutrientsUnit: 'mg'
  }
])

const rules = reactive({
  content: [{ required: true, message: '请输入执行内容', trigger: 'blur' }],
  realityExecutionDate: [{ required: true, message: '请选择开始执行日期', trigger: 'change' }]
})

// 监听入睡时间
watch(
  () => dialogForm.value.bedTime,
  (newVal, oldVal) => {
    let { bedTime, wakeUpTime } = dialogForm.value
    if (!bedTime || !wakeUpTime) return
    dialogForm.value.sleepDuration = countDuration(bedTime, wakeUpTime)
  },
  { deep: true }
)

// 监听起床时间
watch(
  () => dialogForm.value.wakeUpTime,
  (newVal, oldVal) => {
    let { bedTime, wakeUpTime } = dialogForm.value
    if (!bedTime || !wakeUpTime) return
    dialogForm.value.sleepDuration = countDuration(bedTime, wakeUpTime)
  },
  { deep: true }
)

const _lifeStyleDetail = (uid) => {
  lifeStyleDetail(uid).then((res) => {
    let resData = res.datas
    if (resData.childPersonalHistory == null) {
      resData.childPersonalHistory = []
    } else {
      resData.childPersonalHistory = resData.childPersonalHistory.split(',')
    }
    if (resData.childShape == null) {
      resData.childShape = []
    } else {
      resData.childShape = resData.childShape.split(',')
    }
    if (resData.familyDisease == null) {
      resData.familyDisease = []
    } else {
      resData.familyDisease = resData.familyDisease.split(',')
    }

    dialogForm.value = resData
    dialogForm.value.uid = props.copyStatus ? '' : resData.uid

    let resGrowth = res.datas.lifeStyleGrowth
    if (resGrowth.sleep == null) {
      resGrowth.sleep = []
    } else {
      resGrowth.sleep = resGrowth.sleep.split(',')
    }
    lifeStyleGrowthForm.value = resGrowth

    // 固定运动相关
    if (res.datas.lifeStyleSports == null) {
      dialogForm.value.fixedMotion = false
    } else {
      sportsList.value = res.datas.lifeStyleSports
      dialogForm.value.fixedMotion = true
      delete dialogForm.value.lifeStyleSports
    }
    // 营养素相关
    let resNutrients = res.datas.lifeStyleNutrients
    if (resNutrients && resNutrients.length) {
      nutrientsList.value = resNutrients
      delete dialogForm.value.lifeStyleNutrients
    }
  })
}

const handleChangeActive = (value) => {
  dialogForm.active = value
}

// 添加固定运动
const handleAddTerm = () => {
  let newVal = {
    sportsStyle: 'swim',
    sportsFrequency: 0,
    sportsQuantity: '次/周',
    sportsStyleOther: ''
  }
  sportsList.value.push(newVal)
}

const handleDeleteSports = (index) => {
  if (sportsList.value.length <= 1) return
  sportsList.value.splice(index, 1)
}

// 补充维生素
const handleAddNutrients = () => {
  let newVal = {
    nutrientsName: '',
    nutrientsQuantity: 0,
    nutrientsUnit: 'mg'
  }
  nutrientsList.value.push(newVal)
}

const handleDeleteNutrients = (index) => {
  if (nutrientsList.value.length <= 1) return
  nutrientsList.value.splice(index, 1)
}

const personHistoryChange = (item) => {
  if (item.value == 'NONE') {
    dialogForm.value.childPersonalHistory = dialogForm.value.childPersonalHistory.filter((ele) => ele == 'NONE')
  } else {
    dialogForm.value.childPersonalHistory = dialogForm.value.childPersonalHistory.filter((ele) => ele != 'NONE')
  }
}

const childBodyTypesChange = (item) => {
  if (item.value == 'NONE') {
    dialogForm.value.childShape = dialogForm.value.childShape.filter((ele) => ele == 'NONE')
  } else {
    dialogForm.value.childShape = dialogForm.value.childShape.filter((ele) => ele != 'NONE')
  }
}

const diseaseChange = (val) => {
  if (val == 'NONE') {
    dialogForm.value.familyDisease = dialogForm.value.familyDisease.filter((ele) => ele == 'NONE')
  } else {
    dialogForm.value.familyDisease = dialogForm.value.familyDisease.filter((ele) => ele != 'NONE')
  }
}

// 膳食未优化：保证奶蛋肉的摄入，控制碳水零食和水果的摄入。
// 营养素：营养素是长高的原材料，在医生的指导下需按时服用，并在一定时间内根据孩子的复查结果进行个性化调整
// 运动：运动是促进长高生长速度的最佳方式，每周必须要有足够时长和强度的运动量，建议以多以纵向运动为主，例如跳绳、摸高跳、篮球等
// 睡眠：调整睡眠节律，养成早睡早起的好习惯
// 体重：体重增长过快会导致骨龄消耗增加，从而减少孩子身高的生长潜能，因此控制体重是促进长高最重要的手段之一
// 打卡：按时打卡的家庭，您对孩子身高的非常重视，离期望身高的目标越来越近！
const changeOverall = (val) => {
  if (val) context()
}

const changeMeal = (val) => {
  if (val) context()
}

const changeNutrients = (val) => {
  if (val) context()
}

const changeSport = (val) => {
  if (val) context()
}

// 第八----睡眠
const changeSleep = (item) => {
  if (item.value == 'GOOD_RHYTHM') {
    lifeStyleGrowthForm.value.sleep = lifeStyleGrowthForm.value.sleep.filter((ele) => ele == 'GOOD_RHYTHM')
  } else {
    lifeStyleGrowthForm.value.sleep = lifeStyleGrowthForm.value.sleep.filter((ele) => ele != 'GOOD_RHYTHM')
  }
  context()
}

const changeWeight = (val) => {
  if (val) context()
}

const changeCheckIn = (val) => {
  if (val) context()
}

const context = () => {
  let { overall, meal, nutrients, sport, weight, checkIn, sleep } = lifeStyleGrowthForm.value
  let overallTitle = ''
  overallTypes.map((item) => {
    if (item.value == overall) {
      overallTitle = `近期发育总体评估：${item.label}\n`
    }
  })
  let mealTitle = meal == 'UNOPTIMIZED' ? '膳食未优化：保证奶蛋肉的摄入，控制碳水零食和水果的摄入。\n' : ''
  let nutrientsTitle =
    nutrients != 'ON_TIME' && nutrients
      ? '营养素：营养素是长高的原材料，在医生的指导下需按时服用，并在一定时间内根据孩子的复查结果进行个性化调整\n'
      : ''
  let sportTitle =
    sport != 'EXCELLENT' && sport
      ? '运动：运动是促进长高生长速度的最佳方式，每周必须要有足够时长和强度的运动量，建议以多以纵向运动为主，例如跳绳、摸高跳、篮球等\n'
      : ''
  let weightTitle =
    weight != 'GOOD_CONTROL' && weight
      ? '体重：体重增长过快会导致骨龄消耗增加，从而减少孩子身高的生长潜能，因此控制体重是促进长高最重要的手段之一\n'
      : ''
  let checkInTitle
  if (checkIn == 'ON_TIME') {
    checkInTitle = '打卡：按时打卡的家庭，您对孩子身高的非常重视，离期望身高的目标越来越近！\n'
  } else if (checkIn == 'OCCASIONALLY' || checkIn == 'NEVER') {
    checkInTitle = '打卡：打卡是为了严格执行医生给的个性化长高促进方案，家长的执行力越强孩子长高的机会就越多。\n'
  } else {
    checkInTitle = ''
  }
  let sleepTitle
  if (sleep.includes('GOOD_RHYTHM')) {
    sleepTitle = ''
  } else if (sleep.includes('INTERRUPTED_SLEEP')) {
    sleepTitle = '睡眠：调整睡眠节律，寻找睡眠中断的原因积极改善，养成早睡早起的好习惯 \n'
  } else if (sleep.length && sleep.indexOf('INTERRUPTED_SLEEP') === -1) {
    sleepTitle = '睡眠：调整睡眠节律，养成早睡早起的好习惯 \n'
  } else {
    sleepTitle = ''
  }

  let listArr = [mealTitle, nutrientsTitle, sportTitle, sleepTitle, weightTitle, checkInTitle].filter(
    (item) => item != ''
  )
  let allTotalTitle = []

  listArr.forEach((ii, index) => {
    allTotalTitle.push(`${index + 1}、${ii}`)
  })
  lifeStyleGrowthForm.value.totalEvaluate = `${overallTitle}${allTotalTitle.join('')}`
  //   lifeStyleGrowthForm.value.totalEvaluate = `${overallTitle}
  // ${mealTitle}${nutrientsTitle}${sportTitle}${sleepTitle}${weightTitle}${checkInTitle}`
}

// 保存
const handleSubmit = async (formEl) => {
  if (!formEl) return
  let syncApi
  let subData = {
    ...dialogForm.value,
    lifeStyleGrowth: lifeStyleGrowthForm.value
  }
  // 固定运动有的时候，增加lifeStyleSports
  if (dialogForm.value.fixedMotion) {
    subData.lifeStyleSports = sportsList.value
  }
  // 是否补充营养素为自行补充时增加
  if (dialogForm.value.supplyNutrients === 'SUPPLY_YOURSELF') {
    subData.lifeStyleNutrients = nutrientsList.value
  }
  subData.childPersonalHistory = subData.childPersonalHistory.join(',')
  subData.childShape = subData.childShape.join(',')
  subData.familyDisease = subData.familyDisease.join(',')
  subData.lifeStyleGrowth.sleep = subData.lifeStyleGrowth.sleep.join(',')
  // console.log(subData)
  // return
  await formEl.validate((valid) => {
    if (valid) {
      if (subData.uid) {
        syncApi = updateLifeStyle(subData)
        implement(syncApi, '编辑')
      } else {
        syncApi = addLifeStyle(subData)
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
    emit('refreshList')
    ruleFormRef.value.resetFields()
    clearMsg()
  })
}

// 取消
const handleCancel = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  clearMsg()
}

const clearMsg = () => {
  dialogFormVisible.value = false
  dialogForm.value.uid = ''
  Object.assign(dialogForm.value, createFormData())
  Object.assign(lifeStyleGrowthForm.value, createLifeStyleGrowthForm())
  sportsList.value = [
    {
      sportsStyle: 'swim',
      sportsFrequency: 0,
      sportsQuantity: '次/周',
      sportsStyleOther: ''
    }
  ]
  nutrientsList.value = [
    {
      nutrientsName: '',
      nutrientsQuantity: 0,
      nutrientsUnit: 'mg'
    }
  ]
}

defineExpose({
  dialogFormVisible,
  _lifeStyleDetail
})
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  margin-bottom: 10px;
}
.form-item-types {
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
    .el-checkbox {
      margin-bottom: 10px;
    }
  }
  .el-form-item__content {
    display: flex;
    flex-direction: column;
  }
  .meat-item {
    margin-bottom: 10px;
  }
}
.input-item {
  width: 100px;
  margin: 0 10px;
}
.carbon-water {
  margin-right: 40px;
}
.situation {
  padding: 15px;
  .situation-item {
    margin-bottom: 20px;
  }
  .situation-item-title {
    line-height: 36px;
  }
}
.sit-form {
  padding: 0 15px 15px;
  .situation-item-title {
    line-height: 36px;
  }
}

.sports-item {
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin: 5px 0;
}
.sports-box {
  border: 1px solid #ccc;
  padding: 10px;
  .sports-type {
    padding-bottom: 10px;
    .type-label {
      margin-right: 10px;
    }
    .input-item {
      margin: 0;
    }
  }
}
.sports-icon {
  display: flex;
  cursor: pointer;
  i {
    margin-left: 10px;
  }
}
</style>

<style>
.life-way-dialog .el-dialog__body {
  height: 80vh;
  overflow-y: auto;
}
</style>
