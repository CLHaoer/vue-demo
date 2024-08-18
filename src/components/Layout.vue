<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps(['route'])
const router = useRouter()
const onClickLeft = () => router.back()
const active = ref(0)

</script>

<template>
  <van-col class="app-layout">
    <van-nav-bar v-if="route.meta?.navbar" :title="route.meta?.title" left-text="返回" left-arrow
      @click-left="onClickLeft" fixed placeholder class="app-navbar" />
    <div class="app-main">
      <!-- <div class="app-container"> -->
      <slot></slot>
      <!-- </div> -->
    </div>
    <van-tabbar v-if="route.meta?.tabbar" v-model="active" placeholder class="app-tabbar">
      <van-tabbar-item icon="home-o" @click="router.push('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="qr" @click="router.push('/scan')">扫二维码</van-tabbar-item>
      <van-tabbar-item icon="qr" @click="router.push('/scan-two')">扫二维码(2)</van-tabbar-item>
      <van-tabbar-item icon="user-o" @click="router.push('/my')">我的</van-tabbar-item>
    </van-tabbar>
  </van-col>
</template>

<style lang='scss'>
.app-layout {
  position: relative;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  // app-navbar高度
  --van-nav-bar-height: 0px;

  &:has(.app-navbar) {
    --van-nav-bar-height: 46px;
  }

  .app-main {
    position: relative;
    display: flex;
    flex: 1;
    width: 100%;

    // .app-container {
    //   // position: absolute;
    //   width: 100%;
    //   min-height: 100%;
    // }
  }

  .van-nav-bar__placeholder,
  .van-tabbar__placeholder {
    flex-shrink: 0;
  }

  .sticky {
    position: sticky;
    top: var(--van-nav-bar-height);
  }
}
</style>
