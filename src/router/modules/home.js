export default [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: () => import('@views/home/index.vue')
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      title: '我的',
    },
    component: () => import('@views/home/my.vue')
  },
  {
    path: '/scan',
    name: 'scan',
    meta: {
      title: '扫二维码',
      navbar: false,
      tabbar: false,
      keepalive: false
    },
    component: () => import('@views/home/scan-qr.vue')
  },
  {
    path: '/scan-two',
    name: 'scan-two',
    meta: {
      title: '扫二维码',
      navbar: false,
      tabbar: false,
      keepalive: false
    },
    component: () => import('@views/home/scan-qr-two.vue')
  }
]