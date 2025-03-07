import type { App, Plugin } from 'vue'
import PanelBox from './panelbox/index.vue'

const plugin: Plugin = {
  install(app: App, options?: { $t: Function }) {
    window['$t'] = options.$t
  },
}

export default plugin

export * from './Modal'
export * from './needLogin'
export { PanelBox }
