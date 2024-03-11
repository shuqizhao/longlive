<template>
  <!-- 要把target改成 target=".app-main"，因为真正产生滚动事件的是app-main -->
  <el-backtop :right="100" :bottom="100" :visibility-height="100" target=".app-main"></el-backtop>
</template>

<script setup></script>

<style lang="scss" scoped></style>
