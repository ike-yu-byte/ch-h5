import { createApp, version } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { callAppMethod } from '@/utils/JSBridge'
import 'element-plus/dist/index.css'
import 'common-assets/style/index.scss'
import '@/assets/style/index.scss'
import pinia from '@/store'
import i18n from '@/i18n'
import '@/utils/window.ts'
import VueLuckyCanvas from '@lucky-canvas/vue'
import ElementPlus from 'element-plus'
import WujieVue from 'wujie-vue3' // Vue 3项目请使用 import WujieVue from 'wujie-vue3';
import { subApps } from '@/config'
// iconfont的svg精灵图
// import 'common-assets/fonts/iconfont.js'
import SvgIcon from 'common-components/SvgIcon/index.vue'
// 引入vant
import vant from 'vant'
import 'vant/lib/index.css'
import { format } from 'common-assets/utils'
// 引入vite插件里面的虚拟模块
import 'virtual:svg-icons-register'

console.log('version', version)

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

if (import.meta.env.DEV) {
  // 动态导入vconsole
  import('vconsole').then((module) => {
    const VConsole = module.default
    new VConsole()
  })
}
function helloCallback(payload: any) {
  console.log('native回调', payload)
}
// js bridge(用于和flutter交互)
callAppMethod({
  method: 'hello',
  params: {
    name: 'vite',
  },
  callback: helloCallback,
})

const app = createApp(App)
// 全局属性
app.config.globalProperties.$format = format
window.$format = format

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(ElementPlus)
app.use(VueLuckyCanvas)
app.use(WujieVue)
app.use(vant)
// app.use(ConfigProvider)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
