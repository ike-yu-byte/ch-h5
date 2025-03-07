<template>
  <div class="tag-box">
    <div
      :class="`item ${props.className} ${props.modelValue.label === item.label ? 'active' : ''}`"
      v-for="(item, index) of props.options"
      :key="index"
      @click="handleSelect(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Object as any,
    default: () => ({}),
  },
  options: {
    type: Array as any,
    default: () => [],
  },
  className: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const handleSelect = (item: any) => {
  emits('update:modelValue', item)
  emits('change', item)
}
</script>

<style scoped lang="scss">
.tag-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .item {
    border: 1px solid var(--light-border3);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 14px;
    color: var(--menu-color);
    cursor: pointer;
  }
  .active {
    border-color: var(--dark-color);
    color: var(--dark-color);
  }
}
</style>
