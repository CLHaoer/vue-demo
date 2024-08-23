import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [VantResolver()],
    // }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // 配置别名
  resolve: {
    alias:{
      '@': '/src',
      '@views': '/src/views',
      '@components': '/src/components'
    }
  },
  server: {
    open: false,
    // 热更新
    hmr:true,
    // https:true
    // https: {
    //   // key: cert.key,
    //   // cert: cert.cert
    //   key:'./src/ssl/cert.key',
    //   cert:'./src/ssl/cert.crt'
    // }
  }
})
