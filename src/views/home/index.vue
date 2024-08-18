<script setup lang='ts'>
import { onActivated, onMounted, ref } from 'vue'
import useScan from './useScan'
import { showToast } from 'vant';
const value = ref('')
const active = ref(0)
onMounted(() => {
  console.log('home-index onMounted');
})
onActivated(() => {
  console.log('home-index onActivated');
})
const onScan = () => {
  useScan((value) => {
    showToast(value)
  })
}
</script>

<template>
  <div class="index">
    <van-search v-model="value" class="sticky" placeholder="请输入搜索关键词" />
    <van-tabs v-model:active="active" class="sticky tab">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <van-button @click="onScan">扫一扫</van-button>
  </div>
</template>

<style scoped lang='scss'>
.index {
  width: 100%;
  height: 2000px;

  .serach-box {
    width: 100%;
    height: 50px;
    background-color: red;
  }

  .tab {
    position: sticky;
    top: calc(var(--van-nav-bar-height) + 54px);
  }
}
</style>
