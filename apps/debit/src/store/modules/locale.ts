import { defineStore } from 'pinia'
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'
import plusEn from 'plus-pro-components/es/locale/lang/en'
import store from '@/store'

const obj: any = {
  zh: { ...zhCn, ...plusZhCn },
  en: { ...en, ...plusEn },
}

export const useLocaleStore = defineStore(
  'localeStore',
  () => {
    const currentLocale = ref('zh')
    const elLocale = ref(obj.zh)

    const setLocale = (val: string) => {
      // 这个是存储json字符串的
      elLocale.value = obj[val]
      currentLocale.value = val
    }

    const clearLocale = () => {
      elLocale.value = obj.zh
      currentLocale.value = 'zh'
    }

    const getCurrentLocale = () => {
      return currentLocale.value
    }

    return {
      elLocale,
      setLocale,
      clearLocale,
      getCurrentLocale,
    }
  },
  {
    persist: {
      key: 'localeStore',
      storage: localStorage,
      paths: ['elLocale', 'currentLocale'], // 指定state中哪些数据需要持久化
    },
  },
)

export function useLocaleStoreHook() {
  return useLocaleStore(store)
}
