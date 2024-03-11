<template>
  <div>
    <table border="1" v-if="customerObj.sex === '0'">
      <tr>
        <th colspan="4" style="background: #e7f7f4; color: #000">阶段情况</th>
      </tr>
      <tr>
        <td width="50%">期望身高</td>
        <td width="50%">{{ overInfo.expectHeight }}cm</td>
      </tr>
      <tr>
        <td>
          到期望身高还需增长
          <div style="color: rgb(215, 124, 75)">（期望身高-当前身高）</div>
        </td>
        <td>{{ diffHeight }}cm</td>
      </tr>
      <tr>
        <td>
          <span v-if="Number(boneAgeInfo.boneAge) &gt; 6.5 ">假设骨龄14岁至身高长完平均生长潜能</span>
          <span v-if="Number(boneAgeInfo.boneAge) == 6.5">假设青春期至身高长完平均生长潜能</span>
          <span v-if="Number(boneAgeInfo.boneAge) &lt; 6.5 ">假设骨龄11.5岁进入青春期至身高长完平均生长潜能</span>
          <div style="color: rgb(215, 124, 75)">（青春期平均生长潜能）</div>
        </td>
        <td>
          <span v-if="Number(boneAgeInfo.boneAge) &gt; 6.5 ">5cm</span>
          <span v-else>23cm</span>
        </td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 6.5 ">
          <span>至骨龄14岁还需增长</span>
          <div style="color: rgb(215, 124, 75)">（期望身高-当前身高-骨龄14岁平均生长潜能）</div>
        </td>
        <td v-else>
          <span>至青春期还需增长</span>
          <div style="color: rgb(215, 124, 75)">（期望身高-当前身高-青春期平均生长潜能）</div>
        </td>
        <td>{{ diffstillNeedHeight }}cm</td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 6.5 ">
          至骨龄14岁剩余骨龄为
          <div style="color: rgb(215, 124, 75)">进入青春期骨龄(女=12岁，男=14岁)-当前骨龄</div>
        </td>
        <td v-if="Number(boneAgeInfo.boneAge) == 6.5">
          至青春期剩余骨龄为
          <div style="color: rgb(215, 124, 75)">进入青春期骨龄(女=12岁，男=14岁)-当前骨龄</div>
        </td>
        <td v-if="Number(boneAgeInfo.boneAge) &lt; 6.5 ">
          至青春期剩余骨龄为
          <div style="color: rgb(215, 124, 75)">进入青春期骨龄(女=9.5岁，男=11.5岁)-当前骨龄</div>
        </td>
        <td>{{ residueBoneAge }}岁骨龄</td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 6.5 ">
          至骨龄14岁平均每岁骨龄需要增长身高
          <div style="color: rgb(215, 124, 75)">至骨龄14岁还需增长/ 至骨龄14岁剩余骨龄</div>
        </td>
        <td v-else>
          至青春期平均每岁骨龄需要增长身高
          <div style="color: rgb(215, 124, 75)">至青春期还需增长/ 至青春期剩余骨龄</div>
        </td>
        <td>{{ yearNeedHeight }}cm/岁骨龄</td>
      </tr>
    </table>
    <table border="1" v-if="customerObj.sex === '1'">
      <tr>
        <th colspan="4" style="background: #e7f7f4; color: #000">阶段情况</th>
      </tr>
      <tr>
        <td width="50%">期望身高</td>
        <td width="50%">{{ overInfo.expectHeight }}cm</td>
      </tr>
      <tr>
        <td>
          到期望身高还需增长
          <div style="color: rgb(215, 124, 75)">（期望身高-当前身高）</div>
        </td>
        <td>{{ diffHeight }}cm</td>
      </tr>
      <tr>
        <td>
          <span v-if="Number(boneAgeInfo.boneAge) &gt; 4.5 ">假设骨龄12岁至身高长完平均生长潜能</span>
          <span v-else>假设骨龄9.5岁进入青春期至身高长完平均生长潜能</span>
          <div style="color: rgb(215, 124, 75)">（青春期平均生长潜能）</div>
        </td>
        <td>
          <span v-if="Number(boneAgeInfo.boneAge) &gt; 4.5 ">5cm</span>
          <span v-else>20cm</span>
        </td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 4.5 ">
          <span>至骨龄12岁还需增长</span>
          <div style="color: rgb(215, 124, 75)">（期望身高-当前身高-骨龄12岁平均生长潜能）</div>
        </td>
        <td v-else>
          <span>至青春期还需增长</span>
          <div style="color: rgb(215, 124, 75)">（期望身高-当前身高-青春期平均生长潜能）</div>
        </td>
        <td>{{ diffstillNeedHeight }}cm</td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 4.5 ">
          至骨龄12岁剩余骨龄为
          <div style="color: rgb(215, 124, 75)">进入青春期骨龄(女=12岁，男=14岁)-当前骨龄</div>
        </td>
        <td v-else>
          至青春期剩余骨龄为
          <div style="color: rgb(215, 124, 75)">进入青春期骨龄(女=9.5岁，男=11.5岁)-当前骨龄</div>
        </td>
        <td>{{ residueBoneAge }}岁骨龄</td>
      </tr>
      <tr>
        <td v-if="Number(boneAgeInfo.boneAge) &gt; 4.5 ">
          至骨龄12岁平均每岁骨龄需要增长身高
          <div style="color: rgb(215, 124, 75)">至骨龄12岁还需增长/ 至骨龄12岁剩余骨龄</div>
        </td>
        <td v-else>
          至青春期平均每岁骨龄需要增长身高
          <div style="color: rgb(215, 124, 75)">至青春期还需增长/ 至青春期剩余骨龄</div>
        </td>
        <td>{{ yearNeedHeight }}cm/岁骨龄</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import useTableTarget from '@/hooks/useTableTarget'

const customerObj = inject('customerObj')

const props = defineProps({
  overInfo: {
    type: Object
  },
  currentInfo: {
    type: Object
  },
  boneAgeInfo: {
    type: Object
  }
})

const {
  diffHeight,
  diffstillNeedHeight,
  residueBoneAge,
  yearNeedHeight
} = useTableTarget(props)
</script>

<style lang="scss" scoped>
@import '@/styles/overall-table.scss';
</style>
