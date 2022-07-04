import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/index',
    name: 'home',
    component: () => import( '@/components/HelloWorld')
  },
  {
    path: '/pc',
    name: 'pc',
    component: () => import('@/views/pc/PcView'),
    children: [
      {
        path: 'pdf',
        name: 'pcPdf',
        component: () => import('@/views/pc/views/PcPdf'),
      }
    ]
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: () => import('@/views/mobile/MobileView'),
    children: [
      {
        path: 'pdf',
        name: 'mobilePdf',
        component: () => import('@/views/mobile/views/MobilePdf'),
        props ($route) {
          return $route.query
        }
      },
      {
        path: 'image',
        name: 'mobileImage',
        component: () => import('@/views/mobile/views/MobileImage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
