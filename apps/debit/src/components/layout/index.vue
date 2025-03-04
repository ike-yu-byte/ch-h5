<template>
  <div
    :class="`layout-box ${currentRoute.value.meta?.noHeader ? 'no-header' : ''}`"
    @scroll="handleScroll"
    ref="layout"
  >
    <Header class="header-fixed" v-if="!currentRoute.value.meta?.noHeader" />
    <slot></slot>
    <Footer v-if="!currentRoute.value.meta?.noFooter" />
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
  computed,
  watch,
  nextTick,
  // toRefs
} from 'vue'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import { useRoute, useRouter } from 'vue-router'
// import { useDeviceStore } from '@/store'

const route = computed(() => {
  return useRoute()
})
const router = useRouter()

const currentRoute: any = computed(() => {
  return router.currentRoute
})

watch(
  route,
  () => {
    handleBack()
  },
  {
    deep: true,
  },
)

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

const handleBack = async () => {
  await nextTick()
  setTimeout(() => {
    layout.value?.scrollTo({
      top: -100,
      behavior: 'smooth',
    })
  }, 100)
  // layout.value.scrollTop = -100
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
  .header-fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
  }
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
.no-header {
  padding: 0px;
}
</style>
