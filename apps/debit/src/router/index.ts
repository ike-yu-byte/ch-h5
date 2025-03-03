import {
  createRouter,
  createWebHistory,
  // createMemoryHistory,
  createWebHashHistory,
} from 'vue-router'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'

const global: any = i18n.global
const $t = global.t

export const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/subapp',
    name: 'SubApp',
    component: () => import('@/pages/webview/index.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index/index.vue'),
    meta: {
      title: $t('首页'),
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/account/login.vue'),
    meta: {
      title: $t('登录'),
      permission: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/account/register.vue'),
    meta: {
      title: $t('注册'),
      permission: true,
    },
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: () => import('@/pages/account/forgetPwd.vue'),
    meta: {
      title: $t('忘记密码'),
    },
  },
  {
    path: '/safe',
    name: 'safe',
    component: () => import('@/pages/account/safe.vue'),
    meta: {
      title: $t('安全选项申请'),
    },
  },
  {
    path: '/condition',
    name: 'condition',
    component: () => import('@/pages/condition/index.vue'),
    meta: {
      title: $t('行情'),
    },
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/pages/pay/index.vue'),
    meta: {
      title: $t('购买'),
    },
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('@/pages/panel/index.vue'),
    meta: {
      title: $t('交易'),
    },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/pages/news/index.vue'),
    meta: {
      title: $t('新闻'),
    },
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: () => import('@/pages/exchange/index.vue'),
    meta: {
      title: $t('兑换'),
    },
  },
  {
    path: '/ieo',
    name: 'ieo',
    component: () => import('@/pages/IEO/index.vue'),
    meta: {
      title: $t('兑换'),
    },
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('@/pages/card/index.vue'),
    meta: {
      title: $t('信用卡'),
    },
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/pages/order/index.vue'),
    meta: {
      title: $t('买币订单'),
    },
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/pages/notice/index.vue'),
    meta: {
      title: $t('公告中心'),
    },
  },
  {
    path: '/feerate',
    name: 'feerate',
    component: () => import('@/pages/feerate/index.vue'),
    meta: {
      title: $t('费率'),
    },
  },
  {
    path: '/degit',
    name: 'degit',
    component: () => import('@/pages/degit/index.vue'),
    meta: {
      title: $t('数字资产介绍'),
    },
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/pages/help/index.vue'),
    meta: {
      title: $t('帮助中心'),
    },
  },
  {
    path: '/invite',
    name: 'invite',
    component: () => import('@/pages/invite/index.vue'),
    meta: {
      title: $t('邀请好友'),
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
  // history: createWebHistory(),
  history: isLocal ? createWebHashHistory() : createWebHistory(),
  routes,
})
router.beforeEach((_to, _from, next) => {
  // 校验权限
  if (_to.meta.permission) {
    // 不需要登录的
    next()
  } else {
    // 需要登录的
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'login' })
      ElMessage({
        message: $t('请先登录'),
        type: 'warning',
        duration: 2000,
      } as any)
    }
  }
})
router.afterEach((to: any) => {
  // 全局路由守卫
  document.title = to.meta.title || ''
  // const description: any = document.querySelector('meta[name=description]')
  // description.content = i18n.global.t('rules.content')
})

export default router
