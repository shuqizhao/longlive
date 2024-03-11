<template>
  <el-upload
    :class="{ 'hide-upload-btn': hideUploadBtn }"
    :file-list="coversList"
    :action="upAction"
    :headers="{
      Authorization: getToken()
    }"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-success="handleAvatarSuccess"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
    :limit="3"
    multiple
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog custom-class="Preview-dialog" v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth'
import { upAction } from '@/utils/config'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const coversList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const hideUploadBtn = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    coversList.value = val
    hideUploadBtn.value = val.length >= 3
  }
)

const handleAvatarSuccess = (response, file, fileList) => {
  emit('update:modelValue', coversList.value)
}

const handleRemove = (file, fileList) => {
  hideUploadBtn.value = fileList.length >= 3
  emit('update:modelValue', coversList.value)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/png') {
    ElMessage.error('请上传jpg/png格式的图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleChange = (file, fileList) => {
  hideUploadBtn.value = fileList.length >= 3
}
</script>

<style scoped>
.el-upload {
  width: 120px;
  height: 120px;
}
.el-upload-list__item {
  width: 120px !important;
  height: 120px !important;
}
.el-dialog__body {
  padding: 10px 20px;
}
.el-dialog__body img {
  width: 100%;
  height: 100%;
}
</style>

<style>
.Preview-dialog .el-dialog__header {
  padding-bottom: 30px;
}
.hide-upload-btn .el-upload--picture-card {
  display: none;
}
</style>
