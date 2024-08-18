import { h, ref, render } from "vue";
import scanQrTwo from "./scan-qr-two.vue";
import { Popup } from 'vant';




const showPopup = ref(true);
const useScan = (cb) => {
  const onScanSuccess = (decodedText, decodedResult) => {
    showPopup.value = false
    cb(decodedText, decodedResult)
  }

  const vnode = h(Popup,{
    show:showPopup.value,
    'onUpdate:show':val => showPopup.value = val,
    position: 'bottom',
    duration: 0.1,
    closeable: true,
    style:{
      height:'30%' 
    }
  },
  // {
  //   default: () => h(scanQrTwo,{
  //     'onScanSuccess':onScanSuccess
  //   })
  // }
  )


  render(vnode, document.body)
};
  
export default useScan