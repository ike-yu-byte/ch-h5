<template>
  <div class="code-wrap" ref="wrap">
    <canvas ref="qrcodeCanvas" :title="props.text"></canvas>
    <div class="overray" v-if="isExpired" @click="handleRefresh">
      <el-icon class="the-icon"><Refresh /></el-icon>
      <div class="text">{{ $t('刷新二维码') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import QRCode from 'qrcode'
import router from '@/router'
import { useMemberStore } from '@/store'

const { setProfile } = useMemberStore()

console.log('setProfile', setProfile, router)

const qrcodeCanvas = ref(null)

const wrap = ref()
const isExpired = ref(false)
const timer = ref<any>(null)
const emits = defineEmits(['refresh'])

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 30000,
  },
})

watch(
  () => props.text,
  (val: string) => {
    generateQRCode(val)
  },
  {
    immediate: false,
  },
)

onMounted(() => {
  generateQRCode(props.text)
})

const generateQRCode = (text: string) => {
  nextTick(() => {
    QRCode.toCanvas(qrcodeCanvas.value, text, {
      width: wrap.value.offsetWidth,
      margin: 2,
      color: {
        dark: '#000000', // 二维码颜色
        light: '#ffffff', // 背景色
      },
    }).then(() => {
      isExpired.value = false
      // 定时轮询当前hash值是否被扫码登录使用过
      timer.value = setInterval(() => {
        // 将props.text传给后端，后端返回当前登录用户的数据，前端pinia存用户数据后，跳转首页
        // setProfile({
        //   phone: '',
        //   email: '',
        //   token: ''
        // })
        // localStorage.setItem('token', '')
        // router.push({
        //   path: '/',
        // })
      }, 1000)

      setTimeout(() => {
        // 二维码n秒后过期
        isExpired.value = true
      }, props.timeout)
    })
  })
}

const handleRefresh = () => {
  emits('refresh')
}
</script>

<style scoped lang="scss">
.code-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  .overray {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: hsla(0, 0%, 100%, 0.8);
    color: var(--text-color);
    font-size: 14px;
    cursor: pointer;
    .the-icon {
      width: 40px;
      height: 40px;
      background-color: var(--dark-color);
      border-radius: 50%;
      svg {
        width: 80%;
        height: 80%;
        color: var(--white-color);
      }
    }
    .text {
      margin-top: 10px;
    }
  }
}
</style>
