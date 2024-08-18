<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode';
import { showToast } from 'vant';

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
const emit = defineEmits(['scanSuccess'])
const scanSuccessHandler = (decodedText: string, decodedResult: any) => {
  scanner.value.stop();
  emit('scanSuccess', decodedText, decodedResult);
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
  <div class="scan-qr-two">
    <div id="reader"></div>
  </div>
</template>

<style scoped lang='scss'>
.scan-qr-two {
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, .7);
  overflow: hidden;

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
