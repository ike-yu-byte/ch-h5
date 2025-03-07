<template>
  <div>
    <Collapse v-model="activeName">
      <CollapseItem
        v-for="(item, index) of props.data"
        :key="index"
        :title="item.label"
        :name="item.value"
      >
        <div class="innner-item">
          <div
            class="item"
            v-for="child of item.children"
            :key="child.label"
            @click="handleNavigateTo(child)"
          >
            {{ child.label }}
          </div>
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup>
import { Collapse, CollapseItem } from 'vant'
import { ref } from 'vue'
import { menu } from '@/components/lists/config'
const props = defineProps({
  data: {
    type: Array,
    default: () => menu,
  },
})
const activeName = ref([])

function handleNavigateTo(item) {
  // 链接跳转
  if (item.value.includes('http')) {
    window.open(item.value)
  }
}
</script>

<style lang="scss" scoped>
.innner-item {
  .item {
    height: 34px;
    display: flex;
    align-items: center;
  }
}
:deep(.van-cell) {
  height: 64px;
  display: flex;
  align-items: center;
  background-color: #232528;
  // border-color: #333;
}
:deep(.van-cell__title span) {
  color: #ddd;
  font-size: 16px;
  font-weight: bold;
}
:deep(.van-collapse-item::after) {
  border-color: rgba(211, 211, 211, 0.2);
  left: 0;
  right: 0;
}
:deep(.van-collapse-item__content) {
  background-color: #232528;
}
:deep(.van-cell::after) {
  display: none;
}
:deep(.van-icon-arrow::before) {
  font-size: 20px;
  font-weight: bold;
  color: #ddd;
}
:deep(.van-collapse::after) {
  display: none;
  // background-color: rgba(211, 211, 211, 0.2);
}
</style>
