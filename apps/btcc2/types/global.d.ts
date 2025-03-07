declare module '*'
declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}
declare interface Window {
  $: any
  getNativeData: any
  eventFromAndroid: any
  __APP_VERSION__: any
  __WUJIE_MOUNT: any
  __WUJIE_UNMOUNT: any
  $wujie: any
  __POWERED_BY_WUJIE__: any
}

declare const __APP_VERSION__: string
declare const __API_URL__: string
