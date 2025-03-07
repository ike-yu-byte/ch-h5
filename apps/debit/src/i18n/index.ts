import { createI18n } from 'vue-i18n'

const appLocales = import.meta.glob('./locales/*.ts', { eager: true })
const messages: any = {}
for (const path in appLocales) {
  const langCode = (path.split('/') as any).pop().replace('.ts', '')
  messages[langCode] = Object.assign(
    {},
    messages[langCode],
    (appLocales[`./locales/${langCode}.ts`] as any).default,
  )
}

console.log('messages', messages)
const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zhHK',
  legacy: false, // 设为true或者不设置
  messages,
})

export const global: any = i18n.global
export default i18n
export const t = global.t
export const $t = global.t
