export {}

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

declare module 'lodash'
declare module 'mockjs'

declare const process: NodeJS.Process
