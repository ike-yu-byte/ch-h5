import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore(
  'member',
  () => {
    // composition Api方式
    const profile = ref()

    const setProfile = (val: any) => {
      profile.value = val
    }

    const clearProfile = () => {
      profile.value = {}
    }
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    // persist: true, // 网页端
    persist: {
      key: 'memberStore',
      storage: localStorage,
      paths: ['profile'], // 指定state中哪些数据需要持久化
    },
    // persist: { // 小程序端
    //     storage: {
    //         getItem(key) {
    //             return uni.getStorageSync(key)
    //         },
    //         setItem(key, value) {
    //             uni.setStorageSync(key, value)
    //         }
    //     }
    // }
  },
)
