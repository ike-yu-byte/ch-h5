<template>
  <div class="ellipsis-container" ref="containerRef">
    <!-- 内容容器 -->
    <div
      class="ellipsis-content"
      :class="{ 'text-ellipsis': showEllipsis }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 默认插槽 -->
      <slot />
    </div>

    <!-- Tooltip 浮层 -->
    <div v-show="showTooltip" class="custom-tooltip" :style="tooltipStyle">
      {{ tooltipContent }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // 是否启用 Tooltip
  enableTooltip: {
    type: Boolean,
    default: true,
  },
  // 显示延迟（毫秒）
  delay: {
    type: Number,
    default: 200,
  },
})

const containerRef = ref<HTMLElement>()
const showTooltip = ref(false)
const showEllipsis = ref(false)
const tooltipContent = ref('')
const tooltipStyle = ref({
  left: '0px',
  top: '0px',
})

let timer: ReturnType<typeof setTimeout> | null = null

// 检测是否需要显示省略号
const checkOverflow = () => {
  if (!containerRef.value) return

  const el = containerRef.value.querySelector('.ellipsis-content')
  if (!el) return

  showEllipsis.value = el.scrollWidth > el.clientWidth
}

// 获取元素文本内容
const getTextContent = () => {
  const el = containerRef.value?.querySelector('.ellipsis-content')
  return el?.textContent?.trim() || ''
}

// 鼠标进入处理
const handleMouseEnter = (e: MouseEvent) => {
  if (!props.enableTooltip) return

  timer = setTimeout(() => {
    checkOverflow()
    if (showEllipsis.value) {
      tooltipContent.value = getTextContent()
      updateTooltipPosition(e)
      showTooltip.value = true
    }
  }, props.delay)
}

// 鼠标离开处理
const handleMouseLeave = () => {
  clearTimeout(timer)
  showTooltip.value = false
}

// 更新 Tooltip 位置
const updateTooltipPosition = (e: MouseEvent) => {
  const offset = 10 // 距离光标偏移量
  tooltipStyle.value = {
    left: `${e.pageX + offset}px`,
    top: `${e.pageY + offset}px`,
  }
}

// 自动检测内容变化
const observer = new MutationObserver(() => {
  checkOverflow()
})

onMounted(() => {
  nextTick(() => {
    checkOverflow()
    if (containerRef.value) {
      observer.observe(containerRef.value, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    }
  })
})

onUnmounted(() => {
  observer.disconnect()
})

// 窗口变化时重新检测
window.addEventListener('resize', checkOverflow)
</script>

<style scoped>
.ellipsis-container {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.ellipsis-content {
  display: block; /* 移除 flex 布局 */
  width: 100%; /* 确保宽度继承 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text-ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
}

.custom-tooltip {
  position: fixed;
  z-index: 9999;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
