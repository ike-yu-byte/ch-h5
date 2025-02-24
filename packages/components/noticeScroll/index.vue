<template>
  <div
    class="scroll-container"
    ref="containerRef"
    @mouseenter="pauseScroll"
    @mouseleave="resumeScroll"
  >
    <div
      class="scroll-content"
      :style="{
        transform: `translateX(-${currentPosition}px)`,
        transition: isPaused ? 'none' : 'transform 0.6s linear',
      }"
    >
      <!-- 原始内容 -->
      <div class="content-wrapper">
        <slot />
      </div>
      <!-- 克隆内容用于无缝衔接 -->
      <div class="content-wrapper" v-if="needsClone">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    speed: number
  }>(),
  {
    // 滚动速度（像素/秒）
    speed: 40,
  },
)

const containerRef = ref<HTMLElement>()
const currentPosition = ref(0)
const isPaused = ref(false)
const needsClone = ref(false)
const containerWidth = ref(0)
const contentWidth = ref(0)

let animationFrameId: number
let lastTime: number

// 初始化尺寸测量
const initSizes = () => {
  if (!containerRef.value) return

  // 获取容器宽度
  containerWidth.value = containerRef.value.offsetWidth

  // 获取内容宽度
  const contentWrapper = containerRef.value.querySelector(
    '.content-wrapper',
  ) as HTMLElement
  if (contentWrapper) {
    contentWidth.value = contentWrapper.scrollWidth
    needsClone.value = contentWidth.value > containerWidth.value
  }
}

// 滚动动画
const animate = (timestamp: number) => {
  if (!lastTime) lastTime = timestamp
  const deltaTime = timestamp - lastTime
  lastTime = timestamp

  if (!isPaused.value) {
    currentPosition.value += (props.speed * deltaTime) / 1000

    // 当滚动到克隆内容时，重置位置
    if (currentPosition.value >= contentWidth.value) {
      currentPosition.value = 0
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

// 暂停滚动
const pauseScroll = () => {
  isPaused.value = true
}

// 恢复滚动
const resumeScroll = () => {
  isPaused.value = false
  lastTime = performance.now() // 重置时间基准
}

// 响应式处理
const resizeObserver = new ResizeObserver(() => {
  initSizes()
})

onMounted(() => {
  nextTick(() => {
    initSizes()
    if (containerRef.value) {
      resizeObserver.observe(containerRef.value)
    }
    animationFrameId = requestAnimationFrame(animate)
  })
})

onUnmounted(() => {
  resizeObserver.disconnect()
  cancelAnimationFrame(animationFrameId)
})

// 监听速度变化
watch(
  () => props.speed,
  () => {
    // 速度变化时重置动画
    cancelAnimationFrame(animationFrameId)
    animationFrameId = requestAnimationFrame(animate)
  },
)
</script>

<style scoped>
.scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

.scroll-content {
  display: flex;
  will-change: transform; /* 优化动画性能 */
}

.content-wrapper {
  display: flex;
  flex-shrink: 0;
  min-width: 100%;
}

/* 当不需要克隆时显示正常内容 */
.content-wrapper:only-child {
  min-width: auto;
  width: 100%;
}
</style>
