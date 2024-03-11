<template>
  <div class="container">
    <el-form :model="dialogForm" label-width="120px" style="width: 70%">
      <el-form-item label="备注：">
        <QuillEditor class="my-editor" v-model="dialogForm.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSaveNutrient">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { nutrientGuidance } from '@/api/heightManageCom/h-plan-manage'
import { reactive, ref, inject, onMounted, nextTick } from 'vue'
import MyEditor from '@/components/UE/MyEditor.vue'
import { ElMessage } from 'element-plus'
import QuillEditor from '@/components/QuillEditor/index.vue';

const emit = defineEmits(['updateGuidance'])
const customerUid = inject('customerUid')

const props = defineProps({
  nutrientData: {
    type: Object
  },
  planDesignUid: {
    type: String
  }
})

const dialogForm = reactive({
  remark: ''
})

const handleSaveNutrient = () => {
  saveSubData()
}

const saveSubData = () => {
  let subData = {
    customerUid,
    planDesignUid: props.planDesignUid,
    uid: props.nutrientData.uid,
    remark: dialogForm.remark
  }
  nutrientGuidance(subData).then((res) => {
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
    if (props.nutrientData.uid) {
      dialogForm.remark = props.nutrientData.remark
    }
  })
})
</script>

<style lang="scss" scoped>
@import '@/styles/quill-editor.scss';
.container {
  padding: 20px;
}
</style>
