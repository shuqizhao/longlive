<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      :style="{
        height: height,
        'overflow-y': 'hidden'
      }"
      v-model="editVal"
      v-loading="upLoading"
      element-loading-text="上传中..."
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, computed, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getToken } from '@/utils/auth'
import { upAction } from '@/utils/config'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String,
  height: {
    type: String,
    default: '400px'
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref('default')
const upLoading = ref(false)

// 虽然你可以拿到后端的数据，并且可以在网络请求函数作用域打印，但是你发现，如果你将获取到后端的值，在mounted（）中网络请求函数之外打印，结果是空的，这就造成了无法在wangEditor中直接赋值，或者添加数据
// 赋值空标签


const editVal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: upAction,
      fieldName: 'file',
      headers: {
        Authorization: getToken()
      },
      customInsert(res, insertFn) {
        let path = res.datas[0].relativePath
        let url = import.meta.env.VITE_UPLOAD_API + 'file.bdxetyy.com/group1/' + path
        insertFn(url)
      }
    },
    uploadVideo: {
      server: upAction,
      fieldName: 'file',
      maxFileSize: 100 * 1024 * 1024,
      headers: {
        Authorization: getToken()
      },
      onProgress(progress) {
        upLoading.value = true
      },
      customInsert(res, insertFn) {
        let path = res.datas[0].relativePath
        let url = import.meta.env.VITE_UPLOAD_API + 'file.bdxetyy.com/group1/' + path
        upLoading.value = false
        insertFn(url)
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor) => {
  emit('update:modelValue', editor.getHtml())
}
</script>
