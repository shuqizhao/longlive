import { createApp } from 'vue';  
// import Amis from 'amis';  
import App from './App.vue';  

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import router from '@/router/router.js'; 


const app = createApp(App);  

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(router)

// 在全局范围内注册 AMIS 组件（可选）  
// app.use(Amis.Vue);  

app.mount('#app');