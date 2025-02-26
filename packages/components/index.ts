import type { App, Plugin } from 'vue'

const plugin: Plugin = {
  install(app: App, options?: { $t: Function }) {
    window['$t'] = options.$t
  },
}

export default plugin

export * from './Modal'
