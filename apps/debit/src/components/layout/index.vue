<template>
  <div class="layout-box" @scroll="handleScroll" ref="layout">
    <Header style="position: fixed; left: 0; right: 0; top: 0; z-index: 99" />
    <slot></slot>
    <Footer />
    <div
      class="back-box iconfont icon-backtop"
      @click="handleBack"
      v-if="show"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  // toRefs
} from 'vue'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
// import { useDeviceStore } from '@/store'

const show = ref(false)
const layout = ref()
// const { isPC } = toRefs(useDeviceStore())

const handleScroll = (event: any) => {
  const scrollTop = event.target?.scrollTop
  // const scrollHeight = event.target?.scrollHeight
  if (scrollTop > 100) {
    show.value = true
  } else {
    show.value = false
  }
}

const handleBack = () => {
  layout.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

defineOptions({
  name: 'Layout',
})
</script>

<style scoped lang="scss">
.layout-box {
  padding-top: 60px;
  height: 100vh;
  overflow: scroll;
  .back-box {
    width: 40px;
    height: 40px;
    // background-color: #8c8c8c;
    position: fixed;
    bottom: 80px;
    right: 20px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 40px;
    color: #8c8c8c;
    &:hover {
      // background-color: #687492;
      color: #687492;
    }
  }
}
</style>
