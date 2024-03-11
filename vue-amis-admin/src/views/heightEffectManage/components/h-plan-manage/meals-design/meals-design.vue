<template>
  <div class="meals">
    <TableMealsEnergy :currentInfo="userData.currentInfo" />
    <div class="section">
      <h4>一、保证摄入（饮食：均衡食物，巧妙搭配）</h4>
      <div>
        <div class="ptb-20">1、奶</div>
        <div class="mb-10">
          <el-checkbox-group v-model="dialogForm.drinkMilk" style="padding-left: 20px">
            <el-checkbox v-for="(item, index) in plan_allMilkTypes" :key="index" :label="item.value">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
          <div class="type-item" v-for="(item, index) in plan_allMilkTypes" :key="index" :label="item.value">
            <template v-if="dialogForm.drinkMilk && dialogForm.drinkMilk.includes(item.value)">
              <span class="item-label">{{ item.label }}</span>
              <el-input class="item-input" v-model="dialogForm[item.Numkey]" style="width: 100px" maxlength="20" />
              <el-select v-model="dialogForm[item.typeKey]" style="width: 100px">
                <el-option v-for="item in milkTypes" :key="item.label" :label="item.label" :value="item.label" />
              </el-select>
            </template>
          </div>
        </div>
        <QuillEditor class="my-editor" height="250px" v-model="dialogForm.milkRemark" />
      </div>
      <div>
        <div class="ptb-20">2、蛋类 (1个鸡蛋大约40-50g)</div>
        <div class="mb-10">
          <div class="type-item">
            <span class="item-label">鸡蛋</span>
            <el-input class="item-input" v-model="dialogForm.eggQuantity" style="width: 100px" maxlength="20" />
            <el-select v-model="dialogForm.eggFrequency" style="width: 100px">
              <el-option v-for="item in eggTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
        <QuillEditor class="my-editor" height="250px" v-model="dialogForm.eggRemark" />
      </div>
      <div>
        <div class="ptb-20">3、肉类（红肉、白肉）</div>
        <div class="mb-10">
          <div class="type-item">
            <span class="item-label">红肉</span>
            <el-input class="item-input" v-model="dialogForm.redMeatQuantity" style="width: 100px" maxlength="20" />
            <el-select v-model="dialogForm.redMeatFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
          <div class="type-item">
            <span class="item-label">白肉</span>
            <el-input class="item-input" v-model="dialogForm.whiteMeatQuantity" style="width: 100px" maxlength="20" />
            <el-select v-model="dialogForm.whiteMeatFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
        <div class="editor-img">
          <div>
            <QuillEditor class="my-editor" height="250px" v-model="dialogForm.meatRemark" />
          </div>
          <img src="/src/assets/img/plan/eat1.jpg" alt="" />
        </div>
      </div>
      <div>
        <div class="ptb-20">4、碳水类</div>
        <div class="mb-10">
          <div class="type-item">
            <span class="item-label">面食、米、其他：</span>
            <el-input class="item-input" v-model="dialogForm.pastaRiceQuantity" style="width: 100px" maxlength="20" />
            <el-select v-model="dialogForm.pastaRiceFrequency" style="width: 100px">
              <el-option v-for="item in carbonWaterTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
        <div class="editor-img">
          <div>
            <QuillEditor class="my-editor" height="250px" v-model="dialogForm.pastaRiceRemark" />
          </div>
          <img src="/src/assets/img/plan/eat2.jpg" alt="" />
        </div>
      </div>
      <div>
        <div class="ptb-20">5、蔬菜类</div>
        <div class="mb-10">
          <div class="type-item">
            <span class="item-label">蔬菜总量：</span>
            <el-input class="item-input" v-model="dialogForm.vegetableQuantity" style="width: 100px" maxlength="20" />
            <el-select v-model="dialogForm.vegetableFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
        <div class="editor-img">
          <div>
            <QuillEditor class="my-editor" height="250px" v-model="dialogForm.vegetableRemark" />
          </div>
          <img src="/src/assets/img/plan/eat3.jpg" alt="" />
        </div>
      </div>
      <div>
        <div class="ptb-20">6、水果类</div>
        <div class="mb-10">
          <div class="type-item">
            <span class="item-label">水果总量：</span>
            <el-input class="item-input" v-model="dialogForm.fruitQuantity" style="width: 100px" maxlength="20" />
            <el-select v-model="dialogForm.fruitFrequency" style="width: 100px">
              <el-option v-for="item in controlTypes" :key="item.label" :label="item.label" :value="item.label" />
            </el-select>
          </div>
        </div>
        <div class="editor-img">
          <div>
            <QuillEditor class="my-editor" height="250px" v-model="dialogForm.fruitRemark" />
          </div>
          <img src="/src/assets/img/plan/eat4.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="section">
      <h4>二、减少摄入（建议少吃）</h4>
      <div class="mt-10">
        <QuillEditor class="my-editor" height="250px" v-model="dialogForm.reduceIntake" />
      </div>
    </div>
    <div class="section">
      <h4>三、不建议摄入（最好不吃）</h4>
      <div class="mt-10">
        <QuillEditor class="my-editor" height="250px" v-model="dialogForm.notRecommended" />
      </div>
    </div>
    <div class="section">
      <h4>四、时间调整（餐饮时间管理）</h4>
      <div class="mt-10">
        <QuillEditor class="my-editor" height="250px" v-model="dialogForm.timeAdjustment" />
      </div>
    </div>
    <div class="section">
      <h4>五、其他建议</h4>
      <div class="mt-10">
        <QuillEditor class="my-editor" height="250px" v-model="dialogForm.otherSuggestion" />
      </div>
    </div>
    <div class="bottom-save mt-10">
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
  <BackTop />
</template>

<script setup>
import { dietaryGuidance } from '@/api/heightManageCom/h-plan-manage'
import { calculateLifeAge } from '@/api/heightManageCom/h-history-height'
import { ref, reactive, inject, onMounted, nextTick, computed, watch } from 'vue'
import { plan_allMilkTypes, milkTypes, controlTypes, eggTypes, carbonWaterTypes } from '@/utils/config'
import QuillEditor from '@/components/QuillEditor/index.vue';
import TableMealsEnergy from './table-meals-energy.vue'
import { ElMessage } from 'element-plus'
import BackTop from '@/components/BackTop/index.vue'
import { toDay } from '@/utils/util';

const emit = defineEmits(['updateGuidance'])
const customerUid = inject('customerUid')
const customerObj = inject('customerObj')
const userLifeAge = inject('userLifeAge')

const props = defineProps({
  userData: {
    type: Object
  },
  dietaryData: {
    type: Object
  },
  planDesignUid: {
    type: String
  }
})

// 蔬菜的
const defaultVegetableAmount = () => {
  let t = userLifeAge.value;
  return t > 3 && t <= 6 ? 200 : t > 6 && t <= 10 ? 300 : t > 10 && t <= 14 ? 400 : t > 14 && t <= 17 ? 450 : ""
}

// 水果的
const defaultFruitAmount = () => {
  let t = userLifeAge.value;
  return t > 3 && t <= 6 ? 100 : t > 6 && t <= 10 ? 150 : t > 10 && t <= 13 ? 200 : t > 14 && t <= 17 ? 250 : ""
}

//碳水类
const defaultRiceAmount = () => {
  let recordAge = Math.floor(userLifeAge.value);
  let kcal=[],kcald=0

  if(customerObj.sex =='1'){
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
  return parseInt(55 * kcald * 0.5 / 116)
}

const dialogFormFn = () => ({
  drinkMilk: [],
  milkType: '', // 奶种类
  milkQuantity: '', // 牛奶
  milkFrequency: '',
  formulaMilkQuantity: '', // 配方奶
  formulaMilkFrequency: '',
  cheeseQuantity: '', // 奶酪
  cheeseFrequency: '',
  hydrolyzedQuantity: '', // 水解配方奶
  hydrolyzedFrequency: '',
  lactoseFreeQuantity: '', //无乳糖配方奶
  lactoseFreeFrequency: '',
  shuhuaQuantity: '', // 舒化奶
  shuhuaFrequency: '',
  eggQuantity: '', // 蛋数量
  eggFrequency: '',
  redMeatQuantity: '', // 红肉数量
  redMeatFrequency: '',
  whiteMeatQuantity: '', // 白肉数量
  whiteMeatFrequency: '',
  pastaRiceQuantity: defaultRiceAmount(), // 面食、米饭数量
  pastaRiceFrequency: 'g/日',
  vegetableQuantity: defaultVegetableAmount(), // 蔬菜数量
  vegetableFrequency: 'g/日',
  fruitQuantity: defaultFruitAmount(), // 水果数量
  fruitFrequency: 'g/日',
  milkRemark: '', //奶备注
  eggRemark: '',
  meatRemark:
    '<p style="text-align: justify;"><span style="color: rgb(51, 51, 51);">常见的红肉主要有猪肉、牛肉、羊肉等，猪肉的脂肪含量最高，红肉中建议多吃牛肉。白肉主要有鸡、鸭、鱼、虾等。生长周期较短的肉制品易导致骨龄加速，建议白肉每1-2周吃一次。</span></p>',
  pastaRiceRemark:
    '<p style="text-align: justify;"><span style="color: rgb(38, 38, 38);">家长在一日三餐的摄入上可将每日摄入量合理分配到一日三餐中，我们建议可按照早、中、晚餐碳水类摄入比例按照3：4：3的方式进行分配。&nbsp;</span><span style="color: rgb(225, 60, 57);">面包和馒头及带馅面食（包子，水饺）</span><span style="color: rgb(38, 38, 38);">的热量是米饭的2倍，</span><span style="color: rgb(225, 60, 57);">食用面包和馒头及带馅面食</span><span style="color: rgb(38, 38, 38);">（包子，水饺）时请酌情减半。&nbsp;家庭常用饭碗，&nbsp;满满一碗米饭重量为250g,&nbsp;半碗米饭为100g。</span></p>', // 碳水类备注
  vegetableRemark:
    '<p style="text-align: justify;"><span style="color: rgb(51, 51, 51);">高淀粉类蔬菜有芋头，土豆，莲藕，红薯，山药等，如果菜式里包括了这些高淀粉蔬菜应相应减少米面等主食的摄入量。</span></p>', // 蔬菜类备注
  fruitRemark:
    '<p style="text-align: justify;"><span style="color: rgb(225, 60, 57);">虽说水果富含维生素和膳食纤维，但也是不能当饭吃的，&nbsp;一次也不能吃得太多。每天1-2种，以一个中等大小苹果计量，每日半个苹果的量即可</span><span style="color: rgb(38, 38, 38);">，在睡觉前尽量别让孩子吃水果，&nbsp;在睡觉前吃水果会让孩子的肠胃负担加重，影响孩子的睡眠，从而影响孩子身高。</span></p>', // 水果备注
  reduceIntake:
    '<p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">生长周期较短的肉制品易致骨龄加速，鱼、虾、鸡等白肉，建议每1-2周1次；</span></p>', // 减少摄入
  notRecommended:
    '<p style="text-indent: 0px; text-align: left;">1、豆制品（豆浆、豆腐）；</p><p style="text-indent: 0px; text-align: left;">2、碳酸饮料（可乐、汽水、冰镇饮料等）；</p><p style="text-indent: 0px; text-align: left;">3、油炸、烧烤类食品；</p><p style="text-indent: 0px; text-align: left;">4、巧克力、甜品等；</p><p style="text-indent: 0px; text-align: left;">5、高糖分饮品、瓶装水、罐头及饮料；</p>', // 不建议摄入
  timeAdjustment:
    '<p style="text-indent: 0px; text-align: left;">早餐：&nbsp;7:30-8:00&nbsp;点</p><p style="text-indent: 0px; text-align: left;">午餐：&nbsp;11:30-12:30&nbsp;点</p><p style="text-indent: 0px; text-align: left;">晚餐：&nbsp;17:30-18:00&nbsp;点</p><p style="text-indent: 0px; text-align: left;">调整进餐时长：30分钟/顿；</p>', // 时间调整
  otherSuggestion:
    '<p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">进食顺序：第一顺位：奶蛋肉；第二顺位：蔬菜、粗粮、米饭；第三顺位：水果、面条、零食</span></p>' // 其他建议
})

const dialogForm = ref(dialogFormFn())


const handleSave = () => {
  _dietaryGuidance()
}

// 膳食指导方案新增修改
const _dietaryGuidance = () => {
  let subData = {
    customerUid,
    planDesignUid: props.planDesignUid,
    uid: props.dietaryData.uid,
    ...dialogForm.value
  }

  if (subData.drinkMilk.length) {
    subData.milkType = subData.drinkMilk.join(',')
  }

  dietaryGuidance(subData).then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: '保存成功！'
    })
    emit('updateGuidance')
  })
}

onMounted(() => {
  nextTick(() => {
    if (props.dietaryData.uid) {
      dialogForm.value = props.dietaryData
      if (props.dietaryData.milkType) {
        dialogForm.value.drinkMilk = props.dietaryData.milkType.split(',')
      } else {
        dialogForm.value.drinkMilk = []
      }
    }
  })
})
</script>

<style lang="scss" scoped>
.meals {
  width: 1100px;
  height: 100%;
  .section {
    margin-top: 20px;
    .my-editor {
      width: 800px;
    }
    .editor-img {
      display: flex;
      img {
        width: 300px;
        height: 100%;
      }
    }
  }
}
.type-item {
  margin: 7px 0;
  .item-label {
    display: inline-block;
    color: #606266;
    font-size: 14px;
    min-width: 120px;
    text-align: right;
  }
  .item-input {
    margin: 0 10px;
  }
}
</style>
