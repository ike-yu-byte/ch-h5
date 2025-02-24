declare module '*'
declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}
// 扩展window上面的属性
declare interface Window {
  $: any
  getNativeData: any
  eventFromAndroid: any
  __APP_VERSION__: any
  $format: (time: any, str?: string) => string
}

declare const __APP_VERSION__: string
declare const __API_URL__: string
