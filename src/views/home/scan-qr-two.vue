<template>
  <van-popup v-model:show="show" :lazy-render="false" position="bottom" :overlay="false" :duration="0.1"
    @closed="closed" style="height: 100%;">
    <div class="scan-qr">
      <van-icon name="arrow-left" class="back" @click="show = false" />
      <div id="reader"></div>
      <span class="text">将二维码放入框内，可自动扫描</span>
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode';
import { showToast } from 'vant';
const props = defineProps<{
  formats: any[] | undefined
}>()
const emits = defineEmits(['success', 'remove'])
const show = ref(false)
const scanner = ref(null)
// 获取相机
const getCameras = () => {
  console.log(props);
  Html5Qrcode.getCameras()
    .then((devices) => {
      show.value = true;
      if (devices && devices.length) {
        const qrcode = new Html5Qrcode("reader", {
          verbose: false,
          formatsToSupport: props.formats,
        });
        window.qr = qrcode

        scanner.value = qrcode
        startScan(qrcode);
      }
    })
    .catch((err) => {
      showToast({
        message: "摄像头无访问权限！",
        type: "warning",
      });
      closed()
    });
}
// 开始扫描
const startScan = (qrcode) => {
  const rootNode = document.documentElement

  console.log(rootNode?.clientHeight, rootNode?.clientWidth);

  qrcode
    .start(
      { facingMode: "environment" },
      {
        // aspectRatio: Math.floor(rootNode?.clientHeight / rootNode?.clientWidth),
        // disableFlip: true,
        fps: 30,
        qrbox: 250,
        // videoConstraints: {
        //   facingMode: "environment",
        //   height: rootNode?.clientHeight,
        // }
      },
      // 扫描成功
      (decodedText, decodedResult) => {
        emits('success', decodedText, decodedResult)
        show.value = false;
      },
      (errorMessage) => {
        let state = scanner.value.getState()
        console.log(state);
      }
    )
    .catch((err) => {
      showToast({
        message: "扫码失败",
        type: "fail",
      });
      show.value = false;
    });
};
// 关闭
const closed = () => {
  if (scanner.value) scanner.value.stop()
  emits('remove')
}

onMounted(() => {
  getCameras()
})

</script>
<style scoped lang='scss'>
.scan-qr {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, .7);
  overflow: hidden;
  z-index: 9999;

  .back {
    position: absolute;
    padding: 40px;
    font-size: 36px;
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

  .text {
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #fff;
    z-index: 1;
  }
}
</style>
