<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode';
import { showToast } from 'vant';

const emit = defineEmits(['scanSuccess', 'close'])

const showPop = ref(true)
const scanner = ref(null)
// 获取相机
const cameras = ref([])
const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      cameras.value = devices;
      if (devices && devices.length) {
        scanner.value = new Html5Qrcode("reader");
        startScan();
      }
    })
    .catch((err) => {
      showToast({
        message: "摄像头无访问权限！",
        type: "warning",
      });
    });
}
// 开始扫描
const startScan = () => {
  scanner.value
    .start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      scanSuccessHandler
    )
    .catch((err) => {
      console.log("扫码失败", err);
    });
};
// 扫描成功

const scanSuccessHandler = (decodedText: string, decodedResult: any) => {
  scanner.value.stop();
  showPop.value = false
  emit('scanSuccess', decodedText, decodedResult);
}

const close = () => {
  scanner.value.stop();
  emit('colse')
}


onMounted(() => {
  getCameras()
})
onBeforeUnmount(() => {
  if (scanner.value) {
    scanner.value.stop();
  }
})
</script>

<template>
  <!-- <van-popup v-model:show="showPop" position="bottom" :duration="0.3" closeable style="height: 100%;"> -->
  <div class="scan-qr-two">
    <van-icon name="arrow-left" class="back" @click="close" />
    <div id="reader"></div>
  </div>
  <!-- </van-popup> -->
</template>

<style scoped lang='scss'>
.scan-qr-two {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, .7);
  overflow: hidden;
  z-index: 99;

  .back {
    position: absolute;
    padding: 10px;
    font-size: 26px;
    color: #fff;
    z-index: 1;
  }

  :deep(#reader) {
    width: 100%;
    height: 100%;

    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    #qr-shaded-region {
      >div {
        background-color: rgb(54, 244, 54, .6) !important;
      }
    }
  }
}
</style>
