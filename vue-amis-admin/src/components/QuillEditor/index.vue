<template>
  <QuillEditor 
    theme="snow" 
    contentType="html" 
    v-model:content="editVal"
    :options="options"  
    :style="{
      height: height,
      'overflow-y': 'hidden'
    }"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

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
    ]
  },
  styles: {
    fontSize: '14px' // 字体大小
  }
};

const props = defineProps({
  modelValue: String,
  height: {
    type: String,
    default: '350px'
  }
})

const editVal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

</script>

<style lang="scss" scoped>

</style>
