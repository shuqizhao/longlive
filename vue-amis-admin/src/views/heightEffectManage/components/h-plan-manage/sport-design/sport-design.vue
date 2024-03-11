<template>
  <div class="sport">
    <el-form :model="dialogForm" label-width="120px" ref="ruleFormRef">
      <el-form-item label="方案模板：" prop="templateId">
        <el-select v-model="dialogForm.templateId" @change="selectChange" clearable style="width: 100%">
          <el-option
            v-for="item in templateList"
            :key="item.tenantUid"
            :label="item.templateName"
            :value="item.templateId"
          />
        </el-select>
      </el-form-item>
      <div v-if="templateType === '1'">
        <div v-for="(ele, index) in sportsList" :key="index">
          <el-row>
            <el-col :span="8">
              <el-form-item label="运动类型：">
                <el-select v-model="ele.sportType" style="width: 110px; margin-right: 10px">
                  <el-option v-for="item in sportsTypes" :key="item.label" :label="item.label" :value="item.label" />
                </el-select>
                <el-input
                  class="input-item"
                  v-model="ele.otherSport"
                  style="width: 110px"
                  v-if="ele.sportType === '其他'"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运动频次：">
                <el-input v-model="ele.sportQuantity" style="width: 110px; margin-right: 10px" />
                <el-select v-model="ele.sportFrequency" style="width: 110px">
                  <el-option
                    v-for="item in sportsFrequencyTypes"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="sports-icon">
                <el-icon :size="20" @click="handleDeleteSports(index)"><Remove /></el-icon>
                <el-icon :size="20" @click="handleAddTerm"><CirclePlus /></el-icon>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="运动建议：">
            <el-input v-model="ele.sportAdvice" type="textarea" :rows="5" placeholder="限2000字符" maxlength="2000" />
          </el-form-item>
        </div>
        <el-form-item label="备注：">
          <QuillEditor class="my-editor" v-model="dialogForm.remark" />
          <div class="color-orange">
            小贴士:以膝关节为主的上下跳跃运动，有效刺激生长板，活化生长激素，强化骨骼，增加下肢长度
          </div>
        </el-form-item>
      </div>
      <div v-if="templateType === '2'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="运动难度：">
              <el-input v-model="videoForm.sportDifficulty" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运动时长：">
              <el-input v-model="videoForm.sportDuration" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="适用阶段：">
          <el-input v-model="videoForm.sportStage" />
        </el-form-item>
        <el-form-item label="器械：">
          <el-input v-model="videoForm.instrument" />
        </el-form-item>
        <el-form-item label="注意事项：">
          <el-input v-model="videoForm.precautions" type="textarea" :rows="3" placeholder="限500字符" maxlength="500" />
        </el-form-item>
        <el-form-item label="主要功能：">
          <el-input
            v-model="videoForm.mainFunction"
            type="textarea"
            :rows="3"
            placeholder="限500字符"
            maxlength="500"
          />
        </el-form-item>
        <el-form-item label="视频地址：">
          <el-input v-model="videoForm.videoUrl" />
        </el-form-item>
        <el-form-item label="封面：">
          <el-input v-model="videoForm.coverUrl" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="运动频次：">
              <el-input v-model="videoForm.sportQuantity" style="width: 200px; margin-right: 10px" />
              <el-input v-model="videoForm.sportFrequency" style="width: 200px" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="ta-center mt-10">
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
</template>

<script setup>
import { sportsGuidance, guidanceTemplateByType, guidanceTemplateById } from '@/api/heightManageCom/h-plan-manage'
import { onMounted, reactive, ref, watch, inject, nextTick } from 'vue'
import MyEditor from '@/components/UE/MyEditor.vue'
import { CirclePlus, Remove } from '@element-plus/icons-vue'
import { sportsTypes, sportsFrequencyTypes } from '@/utils/config'
import { ElMessage } from 'element-plus'
import useTemplateData from '@/hooks/useTemplateData'
import QuillEditor from '@/components/QuillEditor/index.vue';

const emit = defineEmits(['updateGuidance'])
const customerUid = inject('customerUid')
const { templateList } = useTemplateData('SPORTS')

const props = defineProps({
  sportsData: {
    type: Object
  },
  planDesignUid: {
    type: String
  }
})

const ruleFormRef = ref(null)
const templateType = ref('1')
const sportsTemplate = ref([]) // 运动方案模板
const jsonString = ref(null)

const dialogForm = reactive({
  templateName: '',
  templateId: '',
  remark: ''
})

const sportsList = ref([
  {
    sportType: '',
    sportQuantity: 0,
    sportFrequency: '次/周',
    sportsStyleOther: '',
    sportAdvice: ''
  }
])

const videoFormFn = () => ({
  sportDifficulty: '',
  sportDuration: '',
  sportStage: '',
  instrument: '',
  precautions: '',
  mainFunction: '',
  videoUrl: '',
  coverUrl: '',
  sportQuantity: '',
  sportFrequency: ''
})

const videoForm = ref(videoFormFn())

const handleAddTerm = () => {
  let newVal = {
    sportType: '',
    sportQuantity: 0,
    sportFrequency: '次/周',
    sportsStyleOther: ''
  }
  sportsList.value.push(newVal)
}

const selectChange = (value) => {
  changeClear()
  if (!value) return
  guidanceTemplateById(value).then((res) => {
    let resData = res.datas
    jsonString.value = JSON.parse(resData.jsonString)
    dialogForm.templateName = jsonString.value.templateName
    console.log('jjjj', jsonString.value)

    templateType.value = jsonString.value.templateType
    if (templateType.value === '1') {
      dialogForm.remark = jsonString.value.remark
      sportsList.value = jsonString.value.sports
    }
    if (templateType.value === '2') {
      videoForm.value = jsonString.value
    }
  })
}

const handleDeleteSports = (index) => {
  if (sportsList.value.length <= 1) return
  sportsList.value.splice(index, 1)
}

const changeClear = () => {
  sportsList.value = [
    {
      sportType: '',
      sportQuantity: 0,
      sportFrequency: '次/周',
      sportsStyleOther: '',
      sportAdvice: ''
    }
  ]
  dialogForm.remark = '<p></p>'
  dialogForm.templateName = ''
  videoForm.value = videoFormFn()
}

const handleSave = () => {
  _sportsGuidance()
}

const _sportsGuidance = () => {
  let subData = {
    customerUid,
    planDesignUid: props.planDesignUid,
    uid: props.sportsData.uid,
    templateType: templateType.value,
    ...dialogForm
  }
  if (templateType.value === '1') {
    subData.sportsGuidanceTemplate1 = sportsList.value
  }
  if (templateType.value === '2') {
    subData.sportsGuidanceTemplate2 = videoForm.value
    delete subData.remark
  }
  sportsGuidance(subData).then((res) => {
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
    if (props.sportsData.uid) {
      templateType.value = props.sportsData.templateType
      const { templateId, templateName, sportsGuidanceTemplate1, sportsGuidanceTemplate2, remark } = props.sportsData
      dialogForm.templateId = templateId
      dialogForm.templateName = templateName

      if (templateType.value === '1') {
        sportsList.value = sportsGuidanceTemplate1
        dialogForm.remark = remark
      }
      if (templateType.value === '2') {
        videoForm.value = sportsGuidanceTemplate2
      }
    }
  })
})
</script>

<style lang="scss" scoped>
@import '@/styles/quill-editor.scss';
.sport {
  width: 1100px;
  .sports-icon {
    margin-top: 5px;
    cursor: pointer;
    i {
      margin-right: 10px;
    }
  }
}
</style>
