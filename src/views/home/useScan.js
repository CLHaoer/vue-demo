import { h, render } from "vue";
import Scanner from "./scan-qr-two.vue";
import { Html5QrcodeSupportedFormats } from 'html5-qrcode'
const useScan = (cb = ()=>{},Format = [0]) => {
  // alert(Format)
  const Destroy = () => {
    // 从 body 上移除组件
    render(null, document.body)
  }
  const vnode = h(Scanner,{
    formats: Format?Format:undefined,
    onSuccess: cb,
    onRemove: Destroy
  })

  render(vnode, document.body)
};

export default useScan