import { h, ref, render } from "vue";
import scanQrTwo from "./scan-qr-two.vue";


const useScan = (cb) => {
  const handleDestroy = () => {
    // 从 body 上移除组件
    render(null, document.body,'mathml')
  }

  const vnode = h(scanQrTwo,{
    onScanSuccess:cb,
    onClose:handleDestroy
  })

  render(vnode, document.body,'mathml')
};

export default useScan