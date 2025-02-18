import {
  createRouter,
  createWebHistory,
  // createMemoryHistory,
  // createWebHashHistory,
} from 'vue-router'
import i18n from '@/i18n'
import webview from '@/pages/webview/index.vue'

export const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/subapp',
    name: 'SubApp',
    component: webview,
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index/index.vue'),
    meta: {
      title: i18n.global.t('header.choujiang'),
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/pages/feedback/index.vue'),
    meta: {
      title: i18n.global.t('header.choujiang'),
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404/404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    // 没找到的重定向到/404
    // 或者:catchAll(.*)
    path: '/:pathMach(.*)',
    redirect: '/404',
  },
]
const router = createRouter({
  // history: import.meta.env.SSR ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
})
router.beforeEach((_to, _from, next) => {
  // 校验权限
  next()
})
router.afterEach((to: any) => {
  document.title = to.meta.title || ''
  const description: any = document.querySelector('meta[name=description]')
  description.content = i18n.global.t('rules.content')
})

export default router
