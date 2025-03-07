import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDeviceStore = defineStore(
  'deviceStore',
  () => {
    // 是否PC端
    const isPC = ref(true)

    const setIsPC = (val: boolean) => {
      isPC.value = val
    }

    return {
      isPC,
      setIsPC,
    }
  },
  {
    // persist: true,
    persist: {
      key: 'deviceStore',
      storage: localStorage,
      paths: ['isPC'], // 指定state中哪些数据需要持久化
    },
  },
)
