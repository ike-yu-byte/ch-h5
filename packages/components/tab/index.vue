<template>
  <div class="tab-box" :style="{ backgroundColor: props.bg }">
    <div
      :class="`tab-item ${modelValue.value === item.value ? 'active' : ''}`"
      v-for="(item, index) of props.options"
      :key="index"
      :style="{ color: props.color }"
      @click="handleChange(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array as any,
    default: () => [],
  },
  bg: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const handleChange = (item: any) => {
  emits('update:modelValue', item)
  emits('change', item)
}
</script>

<style scoped lang="scss">
.tab-box {
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tab-item {
    padding: 5px 32px;
    font-size: 14px;
    color: var(--white-color);
    border-radius: 5px;
    cursor: pointer;
  }
  .active {
    background-color: var(--white-color);
    color: var(--dark-color) !important;
  }
}
</style>
