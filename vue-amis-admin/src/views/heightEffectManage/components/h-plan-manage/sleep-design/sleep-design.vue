<template>
  <div class="sleep">
    <el-form :model="dialogForm" label-width="120px" :rules="rules">
      <el-form-item label="选择方案模板：">
        <el-select v-model="dialogForm.templateId" @change="selectChange" clearable style="width: 100%">
          <el-option
            v-for="item in templateList"
            :key="item.tenantUid"
            :label="item.templateName"
            :value="item.templateId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="睡眠节律：">
        <QuillEditor class="my-editor" v-model="dialogForm.sleepRhythm" height="400px" />
      </el-form-item>
      <el-form-item label="睡前准备建议：">
        <QuillEditor class="my-editor" v-model="dialogForm.beforeSleepAdvice" height="400px" />
      </el-form-item>
      <el-form-item label="夜间睡眠建议：">
        <QuillEditor class="my-editor" v-model="dialogForm.nightSleepAdvice" height="400px" />
      </el-form-item>
      <el-form-item label="午睡建议：">
        <QuillEditor class="my-editor" v-model="dialogForm.napAdvice" height="400px" />
      </el-form-item>
      <el-form-item label="其他建议：">
        <QuillEditor class="my-editor" v-model="dialogForm.otherAdvice" height="400px" />
      </el-form-item>
      <el-form-item label="阶段性目标：" prop="price">
        <QuillEditor class="my-editor" v-model="dialogForm.stagedGoals" height="400px" />
      </el-form-item>
    </el-form>
    <div class="ta-center mt-10">
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
  <BackTop />
</template>

<script setup>
import { guidanceTemplateById, sleepGuidance } from '@/api/heightManageCom/h-plan-manage'
import { reactive, ref, inject, onMounted, nextTick } from 'vue'
import MyEditor from '@/components/UE/MyEditor.vue'
import useTemplateData from '@/hooks/useTemplateData'
import { ElMessage } from 'element-plus'
import BackTop from '@/components/BackTop/index.vue'
import QuillEditor from '@/components/QuillEditor/index.vue';

const emit = defineEmits(['updateGuidance'])
const customerUid = inject('customerUid')

const props = defineProps({
  sleepData: {
    type: Object
  },
  planDesignUid: {
    type: String
  }
})

let options = {
  modules: {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
      ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ align: [] }], // 对齐方式
      [{ indent: '-1' }, { indent: '+1' }], // 缩进
      [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
      [{ script: 'sub' }, { script: 'super' }], // 上标/下标
      ['blockquote', 'code-block'], // 引用  代码块
      ['clean'], // 清除文本格式
      ['link'], // 链接、图片、视频
    ],
  }
};

const receiveJsonStr = ref('')

const dialogFormFn = () => ({
  templateId: '',
  sleepRhythm: '',
  beforeSleepAdvice: '',
  nightSleepAdvice: '',
  napAdvice: '',
  otherAdvice: '',
  stagedGoals: ''
})
const dialogForm = ref(dialogFormFn())

const { templateList } = useTemplateData('SLEEP')

const selectChange = (value) => {
  changeClear()
  receiveJsonStr.value = ''
  if (!value) return
  guidanceTemplateById(value).then((res) => {
    let resData = res.datas
    if (resData.jsonString) {
      receiveJsonStr.value = resData.jsonString
      dialogForm.value = JSON.parse(receiveJsonStr.value)
    }
  })
}

const changeClear = () => {
  dialogForm.value = dialogFormFn()
}

const handleSave = () => {
  saveSubData()
}

const saveSubData = () => {
  let subData = {
    customerUid,
    planDesignUid: props.planDesignUid,
    uid: props.sleepData.uid,
    ...dialogForm.value
  }
  sleepGuidance(subData).then((res) => {
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
    if (props.sleepData.uid) {
      dialogForm.value = props.sleepData
    }
  })
})
</script>

<style lang="scss" scoped>
.sleep {
  width: 1100px;
  .el-form-item {
    :deep(.el-form-item__content) {
      display: block;
    }
  }
}

</style>
