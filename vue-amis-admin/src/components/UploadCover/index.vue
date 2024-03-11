<template>
  <el-upload
    class="avatar-uploader"
    :action="upAction"
    :show-file-list="false"
    :headers="{
      Authorization: getToken()
    }"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
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
    type: String,
    default: ''
  }
})

const imageUrl = ref('')

watch(
  () => props.modelValue,
  (val) => {
    imageUrl.value = val
  }
)

const handleAvatarSuccess = (response, uploadFile) => {
  let path = response.datas[0].relativePath
  imageUrl.value = import.meta.env.VITE_UPLOAD_API + 'file.xxx.com/group1/' + path
  emit('update:modelValue', imageUrl.value)
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
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 160px;
  height: 160px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}

.avatar-uploader .el-upload:hover {
  border-color: #3bae9e;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  text-align: center;
}
</style>
