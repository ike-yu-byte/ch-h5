import { defineStore } from 'pinia'
import router from '@/router'
import { Modal, NeedLogin } from 'common-components'
import { h, ref } from 'vue'

export const useMemberStore = defineStore(
  'memberStore',
  () => {
    // composition Api方式
    const profile = ref()

    const setProfile = (val: any) => {
      profile.value = val
    }

    const clearProfile = () => {
      profile.value = null
    }

    const handleLoginExpired = () => {
      Modal.open({
        showHeader: false,
        showBtn: false,
        draggable: false,
        content: h(NeedLogin, {
          onClick: () => {
            clearProfile()
            router.push({ name: 'login' })
          },
        }),
      })
    }
    return {
      profile,
      setProfile,
      clearProfile,
      handleLoginExpired,
    }
  },
  {
    // persist: true, // 网页端
    persist: {
      key: 'memberStore',
      storage: localStorage,
      paths: ['profile'], // 指定state中哪些数据需要持久化
    },
  },
)
