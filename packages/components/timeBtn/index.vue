<template>
  <div class="btn-box" @click="handleClick">
    {{ timer >= 0 ? timer + 'S' + $t('重新获取') : $t('发送验证码') }}
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

const emits = defineEmits(['send'])
const timer = ref<number>(-1)
let intervaler = null
const $t = (window as any).$t
const handleClick = () => {
  // 开始倒计时
  if (timer.value >= 0) {
    return
  }
  // 通知父组件开始调用接口发送验证码
  emits('send', { start, close })
}

const start = () => {
  // 开始倒计时
  if (timer.value >= 0) {
    return
  }
  timer.value = 60
  clearInterval(intervaler)
  intervaler = setInterval(() => {
    timer.value--
  }, 1000)
}

const close = () => {
  // 停止倒计时
  timer.value = -1
  clearInterval(intervaler)
}

defineExpose({
  start,
  close,
})

onBeforeUnmount(() => {
  clearInterval(intervaler)
})
</script>

<style scoped lang="scss">
.btn-box {
  cursor: pointer;
  color: var(--dark-color);
  font-family: Figtree-Regular;
}
</style>
