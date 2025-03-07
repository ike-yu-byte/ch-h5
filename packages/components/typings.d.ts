export {}
declare module '*'
declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

declare module 'vue' {
  // 提供全局属性 `$t`
  interface ComponentCustomProperties {
    $t: (message: string) => string
    $format: (time: any, str?: string) => string
  }
}
declare interface Window {
  $: any
  getNativeData: any
  eventFromAndroid: any
  __APP_VERSION__: any
  $format: (time: any, str?: string) => string
  $t: (message: string) => string
}

declare interface globalThis {
  $t: (message: string) => string
}
declare module 'jquery'
declare module 'vue'
