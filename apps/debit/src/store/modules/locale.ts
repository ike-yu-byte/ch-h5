import { defineStore } from 'pinia'
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'
import plusEn from 'plus-pro-components/es/locale/lang/en'
import store from '@/store'
const zhLang = { ...zhCn, ...plusZhCn }
const enLang = { ...en, ...plusEn }
export const useLocaleStore = defineStore(
  'localeStore',
  () => {
    const elLocale = ref(zhLang)

    const setLocale = (val: any) => {
      elLocale.value = val.includes('zh') ? zhLang : enLang
    }

    return {
      elLocale,
      setLocale,
    }
  },
  {
    persist: {
      key: 'localeStore',
      storage: localStorage,
      paths: ['elLocale'], // 指定state中哪些数据需要持久化
    },
  },
)

export function useLocaleStoreHook() {
  return useLocaleStore(store)
}
