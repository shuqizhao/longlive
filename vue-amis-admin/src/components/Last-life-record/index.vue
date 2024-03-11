<template>
  <div class="last-life-record" v-if="isShow">
    <div class="lifeHeader">
      <div class="text">
        <div class="fw-blod">生活方式记录（最近）</div>
        <div>{{ lifeStyleData.createDate }}</div>
      </div>
      <el-icon :size="20" @click="clickClose"><CircleCloseFilled /></el-icon>
    </div>
    <div class="tablist">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="是否喝奶" name="name1" v-show="activeName === '2' || activeName === '3'">
          <div>
            <span>{{ liftWayTypesFilter(drinkMilkTypes, lifeStyleData.drinkMilk) }}</span>
          </div>
        </el-collapse-item>
        <el-collapse-item title="鸡蛋" name="name2" v-show="activeName === '3'">
          <div>
            <span>{{ liftWayTypesFilter(allEggTypes, lifeStyleData.egg) }}</span>
            <span v-if="lifeStyleData.egg == 'EAT_EGG'">{{ lifeStyleData.eggQuantity }}个/日</span>
          </div>
        </el-collapse-item>
        <div v-show="activeName === '4'">
          <el-collapse-item title="是否运动" name="name3">
            <div v-if="lifeStyleData.lifeStyleSports">{{ lifeStyleData.lifeStyleSports.length ? '是' : '否' }}</div>
          </el-collapse-item>
          <el-collapse-item
            v-for="item in lifeStyleData.lifeStyleSports"
            :key="item.uid"
            :title="sportsNameShow(item)"
            name="name4"
          >
            <div>{{ item.sportsFrequency }} {{ item.sportsQuantity }}</div>
          </el-collapse-item>
          <el-collapse-item title="运动备注" name="name5">
            <div>{{ lifeStyleData.sportsRemark || '--' }}</div>
          </el-collapse-item>
        </div>
        <div v-show="activeName === '5'">
          <el-collapse-item title="入睡困难超过30分钟" name="name6">
            <div>{{ lifeStyleData.sleepMoreThan30 ? '是' : '否' }}</div>
          </el-collapse-item>
          <el-collapse-item title="午睡" name="name7">
            <div>{{ lifeStyleData.nap ? '是' : '否' }}</div>
          </el-collapse-item>
        </div>
        <el-collapse-item title="执行力" name="name8">
          <div>{{ liftWayTypesFilter(executionTypes, lifeStyleData.execution) }}</div>
        </el-collapse-item>
        <el-collapse-item title="执行备注" name="name9">
          <div>{{ lifeStyleData.executionDifficulty || '--' }}</div>
        </el-collapse-item>
        <el-collapse-item title="疾病情况" name="name10">
          <div>{{ lifeStyleData.diseaseRemark || '--' }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { drinkMilkTypes, nutrientsTypes, executionTypes, allEggTypes, sportsTypes } from '@/utils/config'
import { liftWayTypesFilter } from '@/utils/filters'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const props = defineProps({
  lifeStyleData: {
    type: Object,
    default: () => {}
  },
  activeName: {
    type: String
  }
})

const isShow = ref(true)
const activeNames = ref(['name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7', 'name8', 'name9', 'name10'])

watch(
  () => props.activeName,
  (newVal) => {
    if (newVal) {
      isShow.value = true
    }
  }
)

const clickClose = () => {
  isShow.value = false
}

const sportsNameShow = (item) => {
  if (item.sportsStyle === 'other') {
    return item.sportsStyleOther
  } else {
    return liftWayTypesFilter(sportsTypes, item.sportsStyle)
  }
}
</script>

<style lang="scss" scoped>
.last-life-record {
  position: fixed;
  width: 300px;
  top: 27%;
  right: 110px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 #ebeef5;
  z-index: 1000;
  max-height: calc(100vh - 30%);
  overflow-y: auto;
  .lifeHeader {
    background: #e8f8f5;
    color: #1abc9c;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px;
    font-size: 15px;
    .text {
      line-height: 20px;
    }
    i {
      width: 30px;
      height: 30px;
      color: #f56c6c;
      cursor: pointer;
    }
  }
  .tablist {
    width: 100%;
    background: #fff;
    padding: 14px 26px 14px 13px;
    :deep(.el-collapse-item__content) {
      padding-bottom: 15px;
    }
  }
}
</style>
