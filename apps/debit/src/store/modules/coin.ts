import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCoinStore = defineStore(
  'coinStore',
  () => {
    // 当前折算货币
    const currentCoin = ref('USD')

    const setCurrentCoin = (val: string) => {
      currentCoin.value = val
    }

    return {
      currentCoin,
      setCurrentCoin,
    }
  },
  {
    // persist: true,
    persist: {
      key: 'coinStore',
      storage: localStorage,
      paths: ['currentCoin'], // 指定state中哪些数据需要持久化
    },
  },
)
