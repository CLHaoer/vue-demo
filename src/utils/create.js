// 创建指定的组件实例并挂载body上
import { createApp } from 'vue';

export default function create(Component, props) {
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  const app = createApp(Component, {
    name: 'create',
    ...props,
    remove() {
      // 创建完后要进行销毁
      app.unmount();
      document.body.removeChild(mountNode);
    }
  });

  // 返回组件实例
  return app.mount(mountNode);
}
