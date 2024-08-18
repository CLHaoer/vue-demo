<script setup lang='ts'>
import { onMounted, ref } from 'vue'

onMounted(() => {
  console.log('home-my onMounted');
})
</script>

<template>
  <div class="my">
    我的
    <div class="son">

    </div>
  </div>
</template>

<style scoped lang='scss'>
.my {
  // position: absolute;
  height: 100%;
  width: 100%;
  background-color: aquamarine;

  .son {
    width: 100px;
    // height: 1000px;
    background-color: red;
  }

}
</style>
