<template>
  <div class="panel-box">
    <grid-layout
      v-model:layout="layout"
      :col-num="24"
      :row-height="20"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[0, 0]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :static="item.static"
      >
        <Header v-if="item.name === 'header'" />
        <Line v-else-if="item.name === 'line'" />
        <Order v-else-if="item.name === 'order'" />
        <Realtime v-else-if="item.name === 'realtime'" />
        <action v-else-if="item.name === 'action'" />
        <detail v-else-if="item.name === 'detail'" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Line from './components/line.vue'
import Order from './components/detail.vue'
import Realtime from './components/realtime.vue'
import action from './components/action.vue'
import detail from './components/detail.vue'

const layout = [
  { x: 0, y: 0, w: 24, h: 4, i: 0, name: 'header', static: false },
  { x: 0, y: 4, w: 16, h: 24, i: 1, name: 'line', static: false },
  { x: 16, y: 4, w: 4, h: 24, i: 2, name: 'order', static: false },
  { x: 20, y: 4, w: 4, h: 24, i: 3, name: 'realtime', static: false },
  { x: 0, y: 28, w: 16, h: 22, i: 4, name: 'detail', static: false },
  { x: 16, y: 28, w: 8, h: 22, i: 5, name: 'action', static: false },
]
</script>

<style lang="scss" scoped>
.panel-box {
  background-color: var(--dark-bg);
}
</style>
