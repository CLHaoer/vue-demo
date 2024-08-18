<script setup lang='ts'>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { BrowserMultiFormatReader } from '@zxing/library';

const codeReader = ref(new BrowserMultiFormatReader())

const scanText = ref('')
const tipShow = ref(false);
const tipMsg = ref('');
const decodeFromInputVideoFunc = (firstDeviceId) => {
  codeReader.value.reset(); // 重置
  scanText.value = '';
  codeReader.value.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result: any, err: string) => {
    tipMsg.value = '正在嘗試掃描...';
    scanText.value = '';
    if (result) {
      console.log('扫描结果', result);
      scanText.value = result.text;
      if (scanText.value) {
        tipShow.value = false;
        // 这部分接下去的代码根据需要，读者自行编写了
        // this.$store.commit('app/SET_SCANTEXT', result.text);
        // console.log('已扫描的小票列表', this.$store.getters.scanTextArr);
      }
    }
    if (err && !(err)) {
      tipMsg.value = '掃描識別失敗';
      setTimeout(() => {
        tipShow.value = false;
      }, 2000)
      console.error(err);
    }
  });
}


const openScan = async () => {
  console.log('codeReader', codeReader.value)
  codeReader.value.getVideoInputDevices().then((videoInputDevices: any) => {
    tipShow.value = true;
    tipMsg.value = "正在調用攝像頭...";
    // 默认获取第一个摄像头设备id
    let firstDeviceId = videoInputDevices[0].deviceId;
    // 获取第一个摄像头设备的名称
    const videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label);
    if (videoInputDevices.length > 1) {
      // 判断是否后置摄像头
      if (videoInputDeviceslablestr.indexOf('back') > -1) {
        firstDeviceId = videoInputDevices[0].deviceId;
      } else {
        firstDeviceId = videoInputDevices[1].deviceId;
      }
    }
    decodeFromInputVideoFunc(firstDeviceId);
  }).catch((err: string) => {
    tipShow.value = false;
    console.error(err);
  });
}

const openScanTwo = async () => {
  codeReader.value = await new BrowserMultiFormatReader();
  codeReader.value.getVideoInputDevices().then((videoInputDevices) => {
    tipShow.value = true;
    tipMsg.value = "正在調用攝像頭...";
    // 默认获取第一个摄像头设备id
    let firstDeviceId = videoInputDevices[0].deviceId;
    // 获取第一个摄像头设备的名称
    const videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label);
    if (videoInputDevices.length > 1) {
      // 判断是否后置摄像头
      if (videoInputDeviceslablestr.indexOf('back') > -1) {
        firstDeviceId = videoInputDevices[0].deviceId;
      } else {
        firstDeviceId = videoInputDevices[1].deviceId;
      }
    }
    decodeFromInputVideoFunc(firstDeviceId);
  }).catch((err: string) => {
    tipShow.value = false;
    console.error(err);
  });
}
onBeforeMount(() => {
  openScan();
})
onBeforeUnmount(() => {
  codeReader.value.reset();
  // codeReader.value.stopContinuousDecode()
  console.log('销毁');
})

</script>

<template>
  <div class="scan-Qrcode">
    <!-- 扫码区域 -->
    <video ref="video" id="video" class="scan-video" autoplay></video>
    <!-- 提示语 -->
    <div v-show="tipShow" class="scan-tip"> {{ tipMsg }} </div>
    <!-- 掃碼Text -->
    <div v-show="!tipShow" class="scan-tip"> {{ scanText }} </div>
  </div>
</template>

<style scoped lang='scss'>
.scan-Qrcode {
  width: 100%;
  height: 100%;
  background-color: red;
  overflow: hidden;

  .scan-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .scan-tip {
    margin: 10px 0;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 5vw;
  }
}
</style>
