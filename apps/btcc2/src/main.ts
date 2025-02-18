import { createApp } from 'vue'
import vconsole from 'vconsole'
import App from './App.vue'
import router from '@/router/index'
import { callAppMethod } from '@/utils/JSBridge'
import vant from 'vant'
import 'vant/lib/index.css'
import 'element-plus/dist/index.css'
import '@packages/assets/style/index.scss'
import store from '@/store'
import i18n from '@/i18n'
import '@/utils/window.ts'
import VueLuckyCanvas from '@lucky-canvas/vue'
import ElementPlus from 'element-plus'

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

if (window.__POWERED_BY_WUJIE__) {
  // 子应用监听事件
  window.$wujie.bus.$on('msg', (args: any) => {
    console.log('子应用收到', args)
    window.$wujie.bus.$emit('email', '发给父应用的消息')
    console.log('父应用window上的数据', window.parent)
  })

  // 无界环境下初始化Vue实例
  let instance: any
  window.__WUJIE_MOUNT = () => {
    // 接收主应用传过来的props
    console.log('主应用传给子应用的props', window.$wujie.props)
    const app = createApp(App)
    app.use(router)
    app.use(store)
    app.use(i18n)
    app.use(vant)
    app.use(ElementPlus)
    app.use(VueLuckyCanvas)
    app.mount('#app')
    instance = app
  }

  window.__WUJIE_UNMOUNT = () => {
    instance.unmount()
    // vue2是$destroy, vue3是unmount
  }
} else {
  // 非wujie环境下初始化Vue实例
  const app = createApp(App)
  app.use(router)
  app.use(store)
  app.use(i18n)
  app.use(vant)
  app.use(ElementPlus)
  app.use(VueLuckyCanvas)
  app.mount('#app')
}
