<template>
  <div class="img__con">
    <el-upload
      class="avatar-uploader"
      :action="upAction"
      :headers="{
        Authorization: getToken()
      }"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-progress="uploadVideoProcess"
    >
      <video class="video" v-if="videoUrl" controls :key="menuKey">
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <div v-loading="upLoading" element-loading-text="上传中..." v-else>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <span class="el-upload__text">上传视频</span>
      </div>
      <!-- <el-progress
        v-if="videoFlag"
        type="line"
        :percentage="videoUploadPercent"
        style="margin-top: 30px"
      ></el-progress> -->
    </el-upload>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth'
import { upAction } from '@/utils/config'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const upLoading = ref(false)
const videoUrl = ref('')
const videoFlag = ref(false) // 是否显示进度条
const videoUploadPercent = ref(0) // 进度条的进度
const menuKey = ref(1) // 用来强制刷新

watch(
  () => props.modelValue,
  (val) => {
    if (val.endsWith('.mp4')) {
      videoUrl.value = val
    }
  },
  { immediate: true }
)

const uploadVideoProcess = (event, file, fileList) => {
  videoFlag.value = true
  upLoading.value = true
  videoUploadPercent.value = file.percentage.toFixed(0) * 1
}

const handleAvatarSuccess = (response, file) => {
  videoUrl.value = import.meta.env.VITE_UPLOAD_API + 'file.bdxetyy.com/group1/' + response.datas[0].relativePath
  videoUploadPercent.value = 0
  videoFlag.value = false
  ++menuKey.value
  upLoading.value = false
  emit('update:modelValue', videoUrl.value)
}
</script>

<style lang="scss">
.img__con {
  width: 280px;
  .avatar-uploader {
    .el-upload {
      width: 280px;
      height: 160px;
      border: 1px dashed #ccc;
      .video {
        width: 100%;
        height: 100%;
      }
    }
    .el-icon--upload {
      font-size: 17px;
      margin-right: 5px;
      vertical-align: middle;
    }
    .el-progress {
      position: absolute;
      text-align: center;
    }
  }
}
</style>
