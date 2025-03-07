<template>
  <div class="qrcode-box">
    <canvas
      ref="dom"
      :style="{ width: props.width + 'px', height: props.width + 'px' }"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import qrcode from 'qrcode'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 100,
  },
})

const drawCode = () => {
  nextTick(() => {
    const width = document.documentElement.clientWidth
    let size = 0
    if (width > 1200) {
      size = (width / 1920) * props.width
    } else {
      size = (width / 375) * props.width
    }
    qrcode.toCanvas(dom.value, props.text, {
      width: size,
      height: size,
      padding: 0,
      margin: 0,
    })
  })
}

watch(
  () => props.text,
  () => {
    drawCode()
  },
  {
    immediate: true,
  },
)
const dom = ref()
</script>

<style scoped lang="scss"></style>
