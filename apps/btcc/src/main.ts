import { createApp } from 'vue'
import vconsole from 'vconsole'
import App from './App.vue'
import router from '@/router/index'
import { callAppMethod } from '@/utils/JSBridge'
import vant from 'vant'
import 'vant/lib/index.css'
import 'element-plus/dist/index.css'
import 'common-assets/style/index.scss'
import store from '@/store'
import i18n from '@/i18n'
import '@/utils/window.ts'
import VueLuckyCanvas from '@lucky-canvas/vue'
import ElementPlus from 'element-plus'
import WujieVue from 'wujie-vue3' // Vue 3项目请使用 import WujieVue from 'wujie-vue3';
import { subApps } from '@/config'

const {
  setupApp,
  // preloadApp
} = WujieVue

subApps.forEach((item: any) => {
  setupApp({
    name: item.name,
    url: item.url,
    exec: true, // 是否执行子应用
    alive: true, // 是否开启保活模式(子应用只渲染一次)
  })
  // preloadApp({ // 预加载
  //   name: item.name,
  //   url: item.url,
  // })
})

if (import.meta.env.MODE === 'development') {
  new vconsole()
}
function helloCallback(payload: any) {
  console.log('native回调', payload)
}
// js bridge
callAppMethod({
  method: 'hello',
  params: {
    name: 'vite',
  },
  callback: helloCallback,
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(vant)
app.use(ElementPlus)
app.use(VueLuckyCanvas)
app.use(WujieVue)
app.mount('#app')
