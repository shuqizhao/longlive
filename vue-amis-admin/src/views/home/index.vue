<template>
  <div class="home-view">
    <div class="box-row">
      <div class="box-col ta-right">
        <el-button class="btn" type="primary" @click="handleRegister">
          <i class="iconfont icon-yingyongliebiao" />登记用户
        </el-button>
      </div>
      <div class="box-col">
        <el-button class="btn btn2" type="primary" @click="handleSetMeal">
          <i class="iconfont icon-taocanjilu" />去开套餐
        </el-button>
        <el-button class="btn btn2" type="primary" @click="handleTool">
          <i class="iconfont icon-taocanjilu" />工具
        </el-button>
      </div>
    </div>
    <div class="box-row">
      <div class="box-col">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="icon-box box-color1"><i class="iconfont icon-yuyue" /></span>
              <span>工作提醒</span>
            </div>
          </template>
          <WorkReminder />
        </el-card>
      </div>
      <div class="box-col">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="icon-box box-color2"><i class="iconfont icon-person-hezuo" /></span>
              <span>最近三个月接诊用户</span>
            </div>
          </template>
          <RecentlyUser />
        </el-card>
      </div>
    </div>
    <div class="box-row">
      <div class="box-col">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="icon-box box-color3"><i class="iconfont icon-renwuliebiao" /></span>
              <span>我接诊过的用户</span>
            </div>
          </template>
          <MyAdmissionUsers />
        </el-card>
      </div>
      <div class="box-col">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="icon-box box-color4"><i class="iconfont icon-fmomey" /></span>
              <span>我开的套餐</span>
            </div>
          </template>
          <MyOpenSetMeal />
        </el-card>
      </div>
    </div>

    <!-- dialog对话框 -->
    <UserDialog ref="userDialogRef" title="登记用户" />
    <!-- 开套餐 -->
    <OpenSetMeal ref="openSetMealRef" />
    <!-- 工具 -->
    <CalculatorDialog ref="calculatorRef" />
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'

import * as echarts from 'echarts'
import UserDialog from '@/components/UserDialog/userDialog.vue'
import OpenSetMeal from '@/components/OpenSetMeal/openSetMeal.vue'
import CalculatorDialog from './calculatorDialog.vue';

import WorkReminder from './workReminder.vue'
import RecentlyUser from './recentlyUser.vue'
import MyAdmissionUsers from './myAdmissionUsers.vue'
import MyOpenSetMeal from './myOpenSetMeal.vue'

const userDialogRef = ref(null)
const openSetMealRef = ref(null)
const calculatorRef = ref(null)

const handleRegister = () => {
  userDialogRef.value.dialogFormVisible = true
}

const handleSetMeal = () => {
  openSetMealRef.value.dialogFormVisible = true
}

const handleTool = () => {
  calculatorRef.value.dialogFormVisible = true
}

</script>

<style lang="scss" scoped>
.box-top {
  text-align: center;
  .btn {
    padding: 5px !important;
  }
  .btn2 {
    margin-left: 10px;
  }
}
.box-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.box-col {
  width: 49%;
}
.card-header {
  text-align: center;
  span {
    font-weight: 700;
  }
}

.box-card {
  :deep(.el-card__body) {
    padding: 10px !important;
  }
}

.icon-box {
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  .iconfont {
    margin-right: 0 !important;
    color: #fff;
    font-weight: normal;
  }
  &.box-color1 {
    background: #17c393;
  }
  &.box-color2 {
    background: #f58a33;
  }
  &.box-color3 {
    background: #44b6e5;
  }
  &.box-color4 {
    background: #fe8271;
  }
}
</style>
