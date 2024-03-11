# heath-admin

基于 Vite 2.0 + Vue3.0 + Vue-Router 4.0 + Vuex 4.0 + element-plus 的后台管理系统

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue3](https://v3.cn.vuejs.org/)、[vuex](https://next.vuex.vuejs.org/)、[vue-router](https://next.router.vuejs.org/) 、[vite](https://cn.vitejs.dev/) 、[axios](https://github.com/axios/axios) 和 [element-plus](https://element-plus.gitee.io/#/zh-CN)，提前了解和学习这些知识会对使用本项目有很大的帮助。


## 开发

```bash
# 克隆项目
git clone git@gitlab.bdxetyy.com:height/bdx-web-height.git

# 进入项目目录
cd bdx-web-height

# 安装依赖
# 如果安装依赖报错：unable to resolve dependency tree，可使用 npm i --legacy-peer-deps 解决
npm install

# 建议修改为 taobao 源解决下载速度慢的问题
npm config set registry https://registry.npm.taobao.org/

# 启动服务
npm run dev
```

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# eslint代码格式检查
npm run lint:js

# stylelint代码样式检查
npm run lint:css
```