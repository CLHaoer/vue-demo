<script setup lang='ts'>
import { getRegionInfo } from './utils/region';
import { ref } from 'vue'
import Layout from '@components/Layout.vue';

getRegionInfo()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <Layout :route>
      <keep-alive>
        <component v-if="route.meta.keepalive" :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component v-if="!route.meta.keepalive" :is="Component" :key="route.fullPath" />
    </Layout>
  </router-view>
</template>

<style lang='scss'>
#app {
  // min-height: 100dvh;
  height: 100%;
}
</style>
