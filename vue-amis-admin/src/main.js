import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// global css
import './styles/index.scss'
// 引入字体图标样式
import '@/assets/iconfont/iconfont.css'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directive'

import './permission' // permission control
import { DateFormat } from '@/utils/util'

const app = createApp(App)
app.config.warnHandler = () => null
// 使用中文
app.use(ElementPlus, {
  locale: zhCn
})
app.use(Directives)
app.component('QuillEditor', QuillEditor)
app.use(router).use(store).mount('#app')

app.provide('$DateFormat', DateFormat)

export default app
