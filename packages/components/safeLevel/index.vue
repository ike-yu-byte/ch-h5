<template>
  <span class="safe-level">
    <span
      v-for="(item, index) of props.max"
      :key="index"
      :class="`item ${props.value === item ? 'active' : ''}`"
    >
    </span>
    <span class="text">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const $t = (window as any).$t

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 3,
  },
})
const text = computed(() => {
  const map = {
    1: $t('低'),
    2: $t('中'),
    3: $t('高'),
  }
  return map[props.value] || ''
})
</script>

<style scoped lang="scss">
.safe-level {
  display: flex;
  column-gap: 4px;
  align-items: center;
  .item {
    width: 40px;
    height: 4px;
    background-color: rgb(130, 139, 161);
    border-radius: 4px;
  }
  .active {
    background-color: rgb(252, 213, 67);
  }
  .text {
    color: var(--white-color);
  }
}
</style>
