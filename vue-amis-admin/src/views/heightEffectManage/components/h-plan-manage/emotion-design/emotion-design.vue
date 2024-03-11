<template>
  <div style="width: 1100px">
    <QuillEditor class="my-editor" v-model="dialogForm.remark" height="400px" />
    <div class="ta-center mt-10">
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
</template>

<script setup>
import { emotionGuidance } from '@/api/heightManageCom/h-plan-manage'
import { reactive, inject, onMounted, nextTick } from 'vue'
import MyEditor from '@/components/UE/MyEditor.vue'
import { ElMessage } from 'element-plus'
import QuillEditor from '@/components/QuillEditor/index.vue';

const emit = defineEmits(['updateGuidance'])
const customerUid = inject('customerUid')

const props = defineProps({
  emotionData: {
    type: Object
  },
  planDesignUid: {
    type: String
  }
})

const dialogForm = reactive({
  remark: `<p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保持好心情，长高没烦恼</p><p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情绪在孩子的长高过程中，是最容易被忽视的因素。比如对孩子对素质教育的焦虑、学业的焦虑等等，这些情绪都可能会传染给孩子的，从而影响孩子生长激素分泌。</p><p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;平静的和正面的情绪会刺激孩子的生长激素分泌，而负面的情绪会压制孩子生长激素分泌。</p><p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其中的原理本质上是来源于生物体千万年来的进化，不仅发生在人身上，而是发生在所有生物身上。生物体在自然进化中为了能够存活下去，会将自身的能量优先供给给那些能够解决当下严重问题的身体机制、器官或者功能。</p><p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当一个生物体处于危险经历的时候，它全身的能量都会被调动起来，用来逃离或者对抗危险，而不是分泌生长激素，促进增殖细胞的生长与分裂。先生存，再发展，这是一个很朴素的生物学规律。&nbsp;所以如果孩子一直处于焦虑、害怕、恐惧的环境中，孩子体内的精力就会用来优先对抗这些负面情绪，生长激素分泌就会得到压制。</p><p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在日常生活习惯中，确实家长会有一些不好的处理方式，会给孩子带来巨大的压力。比如说管教过于严厉，给孩子布置了过多的作业，过多的课外补习班，或者其他孩子不喜欢做的事情。采取打骂教育、冷落嘲讽，都会对孩子的心理健康造成不好的影响。</p><p style="text-indent: 0px; text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从今天起，我们家长要从自己做起，让自己变得乐观积极、宽容，用正面的情绪去引导孩子，是最好的情绪良药。</p><p style="text-indent: 0px; text-align: left;"><span style="color: rgb(230, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;推荐一本好书给家长和孩子---《DK—儿童情绪管理》</span></p><p style="text-indent: 0px; text-align: left;"><span style="color: rgb(230, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情绪管理≠消灭情绪</span></p><p style="text-indent: 0px; text-align: left;"><span style="color: rgb(230, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情绪管理=认识情绪+接纳情绪+疏导不良情绪</span></p><p style="text-indent: 0px; text-align: left;"><span style="color: rgb(230, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鹿鹿高正向教养，助力亲子沟通，拥有健康好情绪</span></p>`
})

const handleSave = () => {
  saveSubData()
}

const saveSubData = () => {
  let subData = {
    customerUid,
    planDesignUid: props.planDesignUid,
    uid: props.emotionData.uid,
    remark: dialogForm.remark
  }
  emotionGuidance(subData).then((res) => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: '保存成功！'
    })
    emit('updateGuidance')
  })
}

onMounted(() => {
  nextTick(() => {
    if (props.emotionData.uid) {
      dialogForm.remark = props.emotionData.remark
    }
  })
})
</script>

<style lang="scss" scoped></style>
