<template>
  <table id="divh8" border="1" cellpadding="3">
    <tr>
      <th colspan="3">膳食指导方案</th>
    </tr>
    <tr>
      <td colspan="3">一.保证摄入（饮食：均衡食物，巧妙搭配）</td>
    </tr>
    <tr>
      <td style="width: 110px">1、奶</td>
      <td>
        <span class="mr-20" v-for="(item, index) in plan_allMilkTypes" :key="index">
          <span v-if="list.includes(item.value)">
            {{ item.label }}：{{ tabPlanInfo.dietaryGuidanceDto[item.Numkey]
            }}{{ tabPlanInfo.dietaryGuidanceDto[item.typeKey] }}
          </span>
        </span>
      </td>
      <td style="width: 180px"></td>
    </tr>
    <tr>
      <td class="ta-right">备注：</td>
      <td>
        <div v-html="tabPlanInfo.dietaryGuidanceDto.milkRemark"></div>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>2、蛋类</td>
      <td>{{ tabPlanInfo.dietaryGuidanceDto.eggQuantity }} {{ tabPlanInfo.dietaryGuidanceDto.eggFrequency }}</td>
      <td></td>
    </tr>
    <tr>
      <td class="ta-right">备注：</td>
      <td>
        <div v-html="tabPlanInfo.dietaryGuidanceDto.eggRemark"></div>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>3、肉类</td>
      <td>
        <span>
          红肉类：{{ tabPlanInfo.dietaryGuidanceDto.redMeatQuantity }}
          {{ tabPlanInfo.dietaryGuidanceDto.redMeatFrequency }} </span
        >；
        <span>
          白肉类：{{ tabPlanInfo.dietaryGuidanceDto.whiteMeatQuantity }}
          {{ tabPlanInfo.dietaryGuidanceDto.whiteMeatFrequency }}
        </span>
      </td>
      <td rowspan="2"><img src="/src/assets/img/plan/eat1.jpg" style="width: 180px" /></td>
    </tr>
    <tr>
      <td class="ta-right">备注：</td>
      <td>
        <div v-html="tabPlanInfo.dietaryGuidanceDto.meatRemark"></div>
      </td>
    </tr>
    <tr>
      <td>4、碳水类</td>
      <td>
        面食、米、其他合计：
        {{ tabPlanInfo.dietaryGuidanceDto.pastaRiceQuantity }} {{ tabPlanInfo.dietaryGuidanceDto.pastaRiceFrequency }}
      </td>
      <td rowspan="2"><img src="/src/assets/img/plan/eat2.jpg" style="width: 180px" /></td>
    </tr>
    <tr>
      <td class="ta-right">备注：</td>
      <td>
        <div v-html="tabPlanInfo.dietaryGuidanceDto.pastaRiceRemark"></div>
      </td>
    </tr>
    <tr>
      <td>5、蔬菜类</td>
      <td>
        蔬菜总量：{{ tabPlanInfo.dietaryGuidanceDto.vegetableQuantity }}
        {{ tabPlanInfo.dietaryGuidanceDto.vegetableFrequency }}
      </td>
      <td rowspan="2"><img src="/src/assets/img/plan/eat3.jpg" style="width: 180px" /></td>
    </tr>
    <tr>
      <td class="ta-right">备注：</td>
      <td>
        <div v-html="tabPlanInfo.dietaryGuidanceDto.vegetableRemark"></div>
      </td>
    </tr>
    <tr>
      <td>6、水果类</td>
      <td>
        水果总量：{{ tabPlanInfo.dietaryGuidanceDto.fruitQuantity }} {{ tabPlanInfo.dietaryGuidanceDto.fruitFrequency }}
      </td>
      <td rowspan="2"><img src="/src/assets/img/plan/eat4.jpg" style="width: 180px" /></td>
    </tr>
    <tr>
      <td class="ta-right">备注：</td>
      <td>
        <div v-html="tabPlanInfo.dietaryGuidanceDto.fruitRemark"></div>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { plan_allMilkTypes } from '@/utils/config'
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  tabPlanInfo: {
    type: Object
  }
})

const list = computed(() => {
  if (props.tabPlanInfo.dietaryGuidanceDto.milkType) {
    return props.tabPlanInfo.dietaryGuidanceDto.milkType.split(',')
  } else {
    return []
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
