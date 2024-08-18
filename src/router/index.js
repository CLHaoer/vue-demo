// router-index.js
import { createRouter, createWebHistory, createMemoryHistory,createWebHashHistory } from 'vue-router'


const routes = []

const routeModules = import.meta.glob('./modules/*.js',{
  eager: true
})

const isWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1

Object.keys(routeModules).forEach(key => {
  routeModules[key].default.forEach(item => {
    routes.push({
      ...item,
      meta: {
        ...item.meta,
        // navbar: 如果isWechat为true，navbar为false,否则为根据meta中的navbar属性默认为true
        navbar: isWechat ? false : (item.meta?.navbar ?? true),
        tabbar: item.meta?.tabbar ?? true,
        keepalive: item.meta?.keepalive ?? true
      }
    })
  })
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
