<script setup lang="ts">
import { type Component, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const compRef = ref<any>(null)

const $t = window['$t']
const props = defineProps<{
  title?: string
  confirmText?: string
  cancelText?: string
  showBtn?: boolean
  content?: string | Component
  draggable?: boolean
  className?: string
}>()

const emit = defineEmits(['close', 'confirm'])

const handleClose = () => {
  emit('close', { compRef })
}

const handleConfirm = () => {
  emit('confirm', { compRef })
}

const modalContainer = ref<HTMLElement>()
const dragState = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
})

// 初始化居中位置
const initPosition = async () => {
  await nextTick()
  if (!modalContainer.value) return
  const rect = modalContainer.value.getBoundingClientRect()

  // const modalWidth = modalContainer.value.offsetWidth
  // const modalHeight = modalContainer.value.offsetHeight

  dragState.value.currentX = (window.innerWidth - rect.width) / 2
  dragState.value.currentY = (window.innerHeight - rect.height) / 2
  updatePosition()
}

// 更新CSS变量
const updatePosition = () => {
  if (modalContainer.value) {
    modalContainer.value.style.transform = `translate(
      ${dragState.value.currentX}px,
      ${dragState.value.currentY}px
    )`
  }
}

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  if (!props.draggable) return
  e.preventDefault()
  const touch = e.touches[0]
  startDrag(touch.clientX, touch.clientY)
}

// 鼠标事件处理
const handleMouseDown = (e: MouseEvent) => {
  if (!props.draggable) return
  startDrag(e.clientX, e.clientY)
}

const startDrag = (clientX: number, clientY: number) => {
  if (!modalContainer.value) return

  dragState.value.isDragging = true
  dragState.value.startX = clientX - dragState.value.currentX
  dragState.value.startY = clientY - dragState.value.currentY

  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('touchmove', handleTouchDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
}

const handleDrag = (e: MouseEvent) => {
  if (!dragState.value.isDragging) return
  updateDragPosition(e.clientX, e.clientY)
}

const handleTouchDrag = (e: TouchEvent) => {
  if (!dragState.value.isDragging) return
  const touch = e.touches[0]
  e.preventDefault()
  updateDragPosition(touch.clientX, touch.clientY)
}

const updateDragPosition = (clientX: number, clientY: number) => {
  if (!modalContainer.value) return

  const rect = modalContainer.value.getBoundingClientRect()
  const newX = clientX - dragState.value.startX
  const newY = clientY - dragState.value.startY

  // 边界限制
  const maxX = window.innerWidth - rect.width
  const maxY = window.innerHeight - rect.height

  dragState.value.currentX = Math.max(0, Math.min(newX, maxX))
  dragState.value.currentY = Math.max(0, Math.min(newY, maxY))

  updatePosition()
}

const stopDrag = () => {
  dragState.value.isDragging = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('touchmove', handleTouchDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
}

// 窗口大小变化时重置位置
const handleResize = () => {
  setTimeout(() => {
    initPosition()
  }, 100)
}

onMounted(() => {
  if (props.draggable) {
    initPosition()
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  stopDrag()
})
</script>

<template>
  <div :class="`modal-overlay ${props.draggable ? '' : 'fixed'}`">
    <div
      :class="`modal-container ${props.className} ${dragState.isDragging ? 'is-dragging' : ''}`"
      ref="modalContainer"
    >
      <div
        class="modal-header"
        @mousedown="handleMouseDown"
        @touchstart.passive="handleTouchStart"
      >
        <div class="title">{{ props.title || $t('提示') }}</div>
        <span class="icon iconfont icon-cha" @click="handleClose"></span>
      </div>
      <div class="modal-content">
        <component
          v-if="typeof content !== 'string'"
          :is="props.content"
          ref="compRef"
        />
        <slot v-else>
          <span class="text">{{ props.content }}</span>
        </slot>
      </div>
      <div class="modal-footer" v-if="props.showBtn">
        <el-button @click="handleClose">{{
          props.cancelText || $t('取消')
        }}</el-button>
        <el-button @click="handleConfirm">{{
          props.confirmText || $t('确认')
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 999;
}

.fixed {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  position: fixed;
  background: white;
  border-radius: 8px;
  min-width: 400px;
  max-width: 80%;
  height: auto;
  transition: transform 0.5s ease-in-out;
  &.is-dragging {
    transition: none;
    cursor: grabbing;
    user-select: none;

    .modal-header {
      cursor: grabbing;
    }
  }
}

.modal-content {
  padding: 20px;
  .text {
    font-size: 14px;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .title {
    font-size: 16px;
    color: var(--dark-color);
  }
  .icon {
    font-size: 22px;
    color: var(--gray-color);
    cursor: pointer;
  }
  border-bottom: 1px solid var(--light-border);
  cursor: grab;
  user-select: none;
  &:active {
    cursor: grabbing;
  }
}
.modal-footer {
  text-align: right;
  height: auto;
  padding: 10px 20px;
  border-top: 1px solid var(--light-border);
}

.no-scroll {
  overflow: hidden;
}
.mobile {
  .modal-container {
    margin: 0 auto;
    min-width: unset;
    max-width: 94%;
    width: 94%;
  }
}
</style>
